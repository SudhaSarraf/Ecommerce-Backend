import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { v4 as uuidv4 } from 'uuid';
import { FilesService } from '../files/files.service';
import { UserService } from 'src/user/users.service';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { SignUpUserDto } from 'src/user/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly fileService: FilesService,
    private jwtService: jwt.JwtService,
  ) {}

  async login(@Req() request) {
    // Use Passport's authenticate method with the appropriate strategy
    return request.user;
  }

  async logout(userId: string) {
    return await this.userService.logout(userId);
  }

  /**
   * update refresh token hash in user table
   * @param userId
   * @param refreshToken
   */
  async updateHashedToken(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userService.updateHashedRt(userId, hash);
  }

  async validateRefresh(token: string) {
    const jwt = await this.jwtService.decode(token);
    console.log(jwt);
  }

  /**
   * JWT signIn
   * @param email
   * @param pass
   * @returns
   */
  async signIn(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new HttpException('User not found!', 400);

    const isPassValid = await bcrypt.compare(dto.password, user.password);

    if (!isPassValid)
      throw new UnauthorizedException('Email or password incorrect');
    const roleNames = user.roles.map((r) => r.name);
    const payload = { sub: user.userId, email: user.email, role: roleNames };

    const tokens = await this.getTokens(user.userId, user.email, roleNames);
    await this.updateHashedToken(user.userId, tokens.refreshToken);
    return { tokens, payload };
  }

  async validateUserAndRt(
    payload: any,
    rt: string,
  ): Promise<UserEntity | never> {
    const foundUser = await this.userService.findUserById(payload.sub); // sub has userId

    if (!foundUser) {
      throw new ForbiddenException(); // User not found
    }

    if (!(await bcrypt.compare(rt, foundUser.hashedRt))) {
      throw new ForbiddenException(); // Refresh token mismatch
    }

    return foundUser; // Valid user and refresh token
  }

  async signUp(userData: SignUpUserDto) {
    const fileName = await this.fileService.processFile(userData.image);

    //  check if a user with incoming email already exists in db, if so return
    const exists = await this.userService.findByEmail(userData.email);
    if (exists)
      throw new HttpException('User with this email already exists', 400);
    // check if the roles assigned to the userdto exist in the database,
    // we do this first, because user roles are related, if roles don't exist we can't fetch users,
    // and it will throw internal server error, but we want to throw a meaningful custom error.
    const foundRoles = await this.roleService.findAll();
    if (!foundRoles) throw new HttpException(`${userData.roles} roles not found in the database`, 400);

 // Ensure userData.roles is always an array
    const roles = Array.isArray(userData.roles) ? userData.roles : [userData.roles];

    // Match all dto roles from roles in database, dto has role names, but we have role objects,
    // so we need to perform this test. If the resulting array has undefined, we know that user
    // has sent a non-existent role name, so we can't process this request.
    const mapped: RoleEntity[] | undefined = roles.map(name => {
      return foundRoles.find(r => r.name === name);
    });

    // Check for undefined values in the mapped array to ensure all roles are valid
    if (mapped.includes(undefined)) {
      throw new Error("One or more roles are invalid");
    }
    // at this point we know user has given valid roles, the role objects are
    // saved in mapped variable.

    // if (!userData.userId) {
    //   userData.userId = uuidv4();
    // }

    // hash incoming password before saving in db.
    const hashPassword = await this.hashData(userData.password);
    const userEntity = {
      ...userData,
      password: hashPassword,
      roles: mapped,
      image: fileName,
    };
    const newUser = await this.userService.create(userEntity);
    const tokens = await this.getTokens(
      newUser.userId,
      newUser.email,
      userData.roles,
    );
    await this.updateHashedToken(newUser.userId, tokens.refreshToken);
    return tokens;
  }

  async generateRt(user: any) {
    const tokens = await this.getTokens(user.userId, user.email, user.role);
    await this.updateHashedToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  /**
   * This function generates access and refresh tokens, with the payload that we supply in params
   * @param userId
   * @param email
   * @param roles
   *
   */
  async getTokens(userId: string, email: string, roles: string[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          roles: roles,
        },
        {
          secret: 'at-secret',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          roles: roles,
        },
        {
          secret: 'rt-secret',
          expiresIn: '15d', // 1 day
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  /**
   * Util function to encrypt strings like password, tokens
   * @param data
   * @returns hashed string
   */
  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }
}

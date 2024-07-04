import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { CompnayInfoService } from './compnay-info.service';
import { CreateCompnayInfoDto, UpdateCompnayInfoDto} from './dto/compnay-info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';

@Controller('compnay-info')
export class CompnayInfoController {
  constructor(
    private readonly compnayInfoService: CompnayInfoService,
    private readonly fileService: FilesService,
  ) {}

  @UseInterceptors(FileInterceptor('logo'))
  @Post('create')
  async create(
    @Body() createCompnayInfoDto: CreateCompnayInfoDto,
    @UploadedFile() logo: Buffer,
  ) {
    if (logo) {
      const imageFileName = await this.fileService.processFile(logo);
      return await this.compnayInfoService.create(
        createCompnayInfoDto,
        imageFileName,
      );
    } else {
      return await this.compnayInfoService.create(createCompnayInfoDto);
    }
  }

  @Get()
  findAll() {
    return this.compnayInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.compnayInfoService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('logo'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompnayInfoDto: UpdateCompnayInfoDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    const findCompany = await this.compnayInfoService.findOne(+id);
    if (!findCompany) throw new HttpException('record not found', 400);

    if (logo && findCompany.logo) {
      //user is updating the existing image, we will overwrite existing file on the server, keeping same name.
      const imageFileName = await this.fileService.processFile(
        logo,
        findCompany.logo,
      );
      return await this.compnayInfoService.update(
        id,
        updateCompnayInfoDto,
        imageFileName,
      );
    } else if (logo) {
      //user is providing a new image file for the first time
      const imageFileName = await this.fileService.processFile(logo);
      return await this.compnayInfoService.update(
        id,
        updateCompnayInfoDto,
        imageFileName,
      );
    } else {
      return await this.compnayInfoService.update(id, updateCompnayInfoDto);
    }
  }
}

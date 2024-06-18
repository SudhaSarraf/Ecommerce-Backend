import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async processFile(file: any, oldName?: string): Promise<string> {
    try {
      const fileName = oldName ?? uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException('Something went wrong while uploading file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async processMultipleFiles(files: Express.Multer.File[], existing?: string) {
    const filePath = path.resolve(__dirname, 'static');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    let namesArr: string[];
    if (existing) {
      try {
        namesArr = existing.split(',');
      } catch (error) {
        throw new HttpException('Invalid value for existing parameter', HttpStatus.BAD_REQUEST);
      }
    }

    const filesInDir = fs.readdirSync(filePath);

    const newNames: string[] = [];
    if (namesArr) {
      files.forEach((file => {
        for (let fName of namesArr) {
          if (filesInDir.includes(fName)) {
            // a file already exists, we want to overwrite this file with new content
            fs.writeFileSync(path.join(filePath, fName), file.buffer);
            newNames.push(fName);
          }
          // // create new fileName because we are adding new file, not overwriting old one
          // const fileName = uuid.v4() + '.jpg';
          // fs.writeFileSync(path.join(filePath, fileName), file.buffer);
          // newNames.push(fileName);
        }
      }));
    } else {
      files.forEach(file => {
        const fileName = uuid.v4() + '.jpg';
        fs.writeFileSync(path.join(filePath, fileName), file.buffer);
        newNames.push(fileName);
      });
    }
    return newNames;
  }
}

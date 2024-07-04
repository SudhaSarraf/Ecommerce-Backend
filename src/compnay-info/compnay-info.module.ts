import { Module } from '@nestjs/common';
import { CompnayInfoService } from './compnay-info.service';
import { CompnayInfoController } from './compnay-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyInfoEntity } from './entities/compnay-info.entity';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyInfoEntity]), FilesModule],
  controllers: [CompnayInfoController],
  providers: [CompnayInfoService, FilesService],
})
export class CompnayInfoModule {}

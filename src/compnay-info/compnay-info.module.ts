import { Module } from '@nestjs/common';
import { CompnayInfoService } from './compnay-info.service';
import { CompnayInfoController } from './compnay-info.controller';

@Module({
  controllers: [CompnayInfoController],
  providers: [CompnayInfoService],
})
export class CompnayInfoModule {}

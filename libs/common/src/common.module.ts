import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from './database/database.module';
import { ConfigsModule } from './configs/configs.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [DatabaseModule, ConfigsModule, LoggerModule],
})
export class CommonModule {}

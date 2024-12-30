import { Module } from '@nestjs/common';
import { AcademiesController } from './controllers/app.controller';
import { AcademiesService } from './services/app.service';
import { DatabaseService } from './services/db/database.service';
import { EnvConfigService } from './services/env-config/env-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AcademiesController],
  providers: [EnvConfigService, AcademiesService, DatabaseService ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { BrandsModule } from './brands/brands.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './shared/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('appConfig.mongoUri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CampaignsModule,
    SubmissionsModule,
    BrandsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

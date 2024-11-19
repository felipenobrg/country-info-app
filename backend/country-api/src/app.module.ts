import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountryService } from './country/country.service';
import { CountryController } from './country/country.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CountryController],
  providers: [CountryService],
})
export class AppModule {}


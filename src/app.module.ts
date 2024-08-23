import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScryfallService } from './scryfall/scryfall.service';
import { ScryfallController } from './scryfall/scryfall.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [HttpModule, MongooseModule.forRoot('mongodb://localhost:27017'), UserModule,],
  controllers: [AppController, ScryfallController],
  providers: [AppService, ScryfallService],
})
export class AppModule { }

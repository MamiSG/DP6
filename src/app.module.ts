import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScryfallService } from './scryfall/scryfall.service';
import { ScryfallController } from './scryfall/scryfall.controller';

@Module({
  imports: [],
  controllers: [AppController, ScryfallController],
  providers: [AppService, ScryfallService],
})
export class AppModule { }

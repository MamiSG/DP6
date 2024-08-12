import { Controller, Get, Query } from '@nestjs/common';
import { ScryfallService } from './scryfall.service';

@Controller('scryfall')
export class ScryfallController {
    constructor(private readonly scryfallService: ScryfallService) { }

    @Get('card')
    getCardByName(@Query('name') name: string) {
        return this.scryfallService.getCardByName(name);
    }

    @Get('set')
    getCardsBySet(@Query('code') code: string) {
        return this.scryfallService.getCardsBySet(code);
    }
}
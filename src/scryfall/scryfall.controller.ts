import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ScryfallService } from './Scryfall.service';

@Controller('scryfall')
export class ScryfallController {
    constructor(private readonly scryfallService: ScryfallService) {}

    @Get('deck')
    async getDeck(@Query('commanderName') commanderName: string) {
        if (!commanderName) {
            throw new BadRequestException('Commander name is required');
        }

        try {
            // 1. Busca o comandante
            const commander = await this.scryfallService.findCommanderByName(commanderName);

            // 2. Busca as 99 cartas para o deck
            const deck = await this.scryfallService.findDeckCards(commander.color_identity);

            // 3. Salva o deck no MongoDB
            const savedDeck = await this.scryfallService.saveDeckToDatabase(commander, deck);

            // 4. Retorna o deck completo (comandante + 99 cartas salvas)
            return savedDeck;
        } catch (error) {
            throw new BadRequestException(`Error: ${error.message}`);
        }
    }
}

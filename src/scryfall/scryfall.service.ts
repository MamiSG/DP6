import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { DeckService } from 'src/deck/deck.service';  // Importando o serviço do deck

@Injectable()
export class ScryfallService {
    constructor(
        private httpService: HttpService,
        private readonly deckService: DeckService // Injetando o serviço do deck
    ) {}

    // Buscar o comandante pelo nome
    async findCommanderByName(name: string): Promise<any> {
        const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(name)}+type%3Alegendary+type%3Acreature&unique=prints`;
    
        try {
            const response = await lastValueFrom(this.httpService.get(url));
            const commanders = response.data.data;
    
            if (commanders.length === 0) {
                throw new Error('Commander not found');
            }
    
            return commanders[0];
        } catch (error) {
            throw new Error('Failed to fetch commander');
        }
    }

    // Buscar as 99 cartas para o deck com base nas cores do comandante
    async findDeckCards(commanderColors: string[]): Promise<any[]> {
        const colorQuery = commanderColors.length > 0 ? `id<=${commanderColors.join('')}` : 'id=';
        const url = `https://api.scryfall.com/cards/search?q=${colorQuery}&unique=prints`;

        const deck: any[] = [];
        const basicLands: any[] = [];
        const nonBasicCards: Set<string> = new Set();

        try {
            let page = 1;
            let hasMoreCards = true;

            while (deck.length < 99 && hasMoreCards) {
                const response = await lastValueFrom(this.httpService.get(`${url}&page=${page}`));
                const cards = response.data.data;

                if (!cards || cards.length === 0) {
                    hasMoreCards = false;
                    break;
                }

                // Processar as cartas retornadas
                for (const card of cards) {
                    if (deck.length >= 99) break;

                    const isBasicLand = card.type_line.includes('Basic Land');

                    if (isBasicLand) {
                        basicLands.push(card);
                    } else if (!nonBasicCards.has(card.name)) {
                        deck.push(card);
                        nonBasicCards.add(card.name);
                    }
                }
                page++;
            }

            // Preencher o deck com terrenos básicos, se necessário
            while (deck.length < 99 && basicLands.length > 0) {
                deck.push(basicLands[Math.floor(Math.random() * basicLands.length)]);
            }

            return deck;
        } catch (error) {
            throw new Error('Failed to fetch deck cards');
        }
    }

    // Função para salvar o deck no MongoDB
    async saveDeckToDatabase(commander: any, deck: any[]): Promise<any> {
        const commanderName = commander.name;
        const commanderColors = commander.color_identity;

        // Salvar o deck no MongoDB
        return await this.deckService.createDeck(commanderName, commanderColors, deck);
    }
}

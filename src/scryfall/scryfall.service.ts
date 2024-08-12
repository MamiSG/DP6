import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class ScryfallService {
    private readonly baseUrl = 'https://api.scryfall.com';

    constructor(private readonly httpService: HttpService) { }

    // Exemplo: Buscar carta pelo nome
    getCardByName(name: string) {
        return this.httpService
            .get(`${this.baseUrl}/cards/named`, {
                params: { fuzzy: name },
            })
            .pipe(
                map((response) => response.data)
            );
    }

    // Exemplo: Buscar todas as cartas de um set
    getCardsBySet(setCode: string) {
        return this.httpService
            .get(`${this.baseUrl}/cards/search`, {
                params: { q: `set:${setCode}` },
            })
            .pipe(
                map((response) => response.data)
            );
    }
}

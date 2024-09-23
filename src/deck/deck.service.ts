import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck } from './deck.schema';

@Injectable()
export class DeckService {
  constructor(
    @InjectModel(Deck.name) private readonly deckModel: Model<Deck>,
  ) {}

  // Função para criar e salvar um novo deck
  async createDeck(commander: string, commanderColors: string[], deckCards: any[]): Promise<Deck> {
    const newDeck = new this.deckModel({
      commander,
      commanderColors,
      deckCards,
    });

    return newDeck.save(); // Salva no MongoDB
  }

  // Função para buscar todos os decks (se precisar)
  async findAllDecks(): Promise<Deck[]> {
    return this.deckModel.find().exec();
  }

  // Função para buscar um deck específico (se precisar)
  async findDeckById(id: string): Promise<Deck> {
    return this.deckModel.findById(id).exec();
  }
}

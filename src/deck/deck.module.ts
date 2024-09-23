import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckService } from './deck.service';
import { Deck, DeckSchema } from './deck.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]), // Importa o schema do Deck
  ],
  providers: [DeckService],
  exports: [DeckService], // Exporta para ser usado em outros módulos
})
export class DeckModule {}

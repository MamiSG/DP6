import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Deck extends Document {
  @Prop({ required: true })
  commander: string;

  @Prop({ required: true })
  commanderColors: string[];

  @Prop({ type: Array, required: true })
  deckCards: any[]; // Array para as 99 cartas
}

export const DeckSchema = SchemaFactory.createForClass(Deck);

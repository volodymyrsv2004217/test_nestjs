export interface Game {
  id: string;
  name: string;
  description?: string;
  minBet: number;
  maxBet: number;
  category?: string;
}

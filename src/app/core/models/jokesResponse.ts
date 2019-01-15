import { Joke } from './joke';

export interface JokesResponse {
  type: string;
  value: Joke[];
}

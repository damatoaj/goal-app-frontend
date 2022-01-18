import { Outcome } from './outcomeGoals.model';

export interface User {
    _id: string;
    name: string;
    email: string;
    password:string;
    outcomeGoals: Outcome[];
}
import { Performance } from './performanceGoals.model';

export interface Outcome {
    _id: string;
    description: string;
    dateDue: Date;
    complete: boolean;
    reward: string;
    punishment: string;
    performanceGoals: Performance[];
    userId: string;
}

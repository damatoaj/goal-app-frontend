import { Process } from './processGoals.models'

export interface Performance {
    _id: string;
    dateDue: Date;
    description: string;
    improveBy: {
        number:number,
        unit:string,
    };
    reward: string;
    punishment: string;
    completed: boolean;
    processGoals: Process[];
}
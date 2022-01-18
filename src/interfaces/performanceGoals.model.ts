import { Process } from './processGoals.models'

export interface Performance {
    _id: string;
    dueDate: Date;
    description: string;
    improveBy: {
        number:number,
        unit:string,
    };
    reward: string;
    punishment: string;
    completed: Boolean;
    processGoals: Process[];
}
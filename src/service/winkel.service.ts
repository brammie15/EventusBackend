import { DI } from "../data/data-index";
import { Winkel } from "../entities/Winkel.entity";
import { databaseOperationResult, getRequest } from "../returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const winkels = await DI.winkelRepo.findAll();
    const outputWinkels : getRequest = {
        items: winkels,
        count: winkels.length
    }
    console.log(outputWinkels)
    return outputWinkels;
}

export const getByID = async (id: number) : Promise<Winkel> => {
    const winkel = await DI.winkelRepo.findOne({id});
    return winkel;
}

export const create = async (body: any) : Promise<databaseOperationResult> => {
    try {
        const newWinkel = await DI.winkelRepo.create(body);
        await DI.winkelRepo.persistAndFlush(newWinkel);
        return {
            result: newWinkel,
            errors: []
        };
    } catch (error) {
        return {
            result: null,
            errors: [error]
        };
    }
}

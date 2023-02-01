import { DI } from "../data/data-index";
import { Winkel } from "../entities/Winkel.entity";
import { getLogger } from "../logging";
import { databaseOperationResult, getRequest } from "../returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const winkels = await DI.winkelRepo.findAll();
    const outputWinkels : getRequest = {
        items: winkels,
        count: winkels.length
    }
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

export const updateByID = async (id: number, body: any) : Promise<databaseOperationResult> => {
    try{
        var winkel: Winkel = await DI.winkelRepo.findOne({id});
        if(winkel == null){
            return {
                result: null,
                errors: ["Winkel not found"]
            };
        }
        DI.winkelRepo.assign(winkel, body);
        await DI.winkelRepo.persistAndFlush(winkel);
        return {
            result: winkel,
            errors: []
        };
    }catch(error){
        return {
            result: null,
            errors: [error]
        };
    }
}

export const deleteByID = async (id: number) : Promise<databaseOperationResult> => {
    try{
        const deletedWinkel = await getByID(id);
        await DI.winkelRepo.removeAndFlush(deletedWinkel);
        if(deletedWinkel == null){
            return {
                result: null,
                errors: ["Winkel not found"]
            };
        }
        return {
            result: deletedWinkel,
            errors: []
        };
    }
    catch(error){
        return {
            result: null,
            errors: [error]
        };
    }
}

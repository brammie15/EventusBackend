import { DI } from "../data/data-index";
import { Dienst } from "../entities/Dienst.entity";
import { getLogger } from "../logging";
import { databaseOperationResult, getRequest } from "../returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const diensten = await DI.dienstenRepo.findAll();

    const outputDiensten : getRequest = {
        items: diensten,
        count: diensten.length
    }
    return outputDiensten;
}

export const getByID = async (id: number) : Promise<Dienst> => {
    const dienst = await DI.dienstenRepo.findOne({id});
    return dienst;
}

export const create = async (body: any) : Promise<databaseOperationResult> => {
    try{
        const newDienst = await DI.dienstenRepo.create(body);
        await DI.dienstenRepo.persistAndFlush(newDienst);
        return {
            result: newDienst,
            errors: []
        };
    }catch(error){
        return {
            result: null,
            errors: [error]
        };
    }
}

export const updateByID = async (id: number, body: any) : Promise<databaseOperationResult> => {
    try{
        var dienst: Dienst = await DI.dienstenRepo.findOne({id});
        if(dienst == null){
            return {
                result: null,
                errors: ["Dienst not found"]
            };
        }
        DI.dienstenRepo.assign(dienst, body);
        await DI.dienstenRepo.persistAndFlush(dienst);
        return {
            result: dienst,
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
        const deletedDienst = await getByID(id);
        if(deletedDienst == null){
            return {
                result: null,
                errors: ["Dienst not found"]
            };
        }
        await DI.dienstenRepo.removeAndFlush(deletedDienst);
        return {
            result: deletedDienst,
            errors: []
        };
    }catch(error){
        return {
            result: null,
            errors: [error]
        };
    }
}
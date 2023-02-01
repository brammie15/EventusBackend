import { DI } from "../data/data-index";
import { Pakket } from "../entities/Pakket.entity";
import { Product } from "../entities/Product.entity";
import { Winkel } from "../entities/Winkel.entity";
import { getLogger } from "../logging";
import { databaseOperationResult, getRequest } from "../returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const paketten = await DI.pakkettenRepo.findAll( { populate: ['diensten', 'producten']});


    const outputPaketten : getRequest = {
        items: paketten,
        count: paketten.length
    }
    return outputPaketten;
}

export const getByID = async (id: number) : Promise<Pakket> => {
    const pakket = await DI.pakkettenRepo.findOne({id}, {populate: ['diensten', 'producten']});
    return pakket;
}

export const create = async (body: any) : Promise<databaseOperationResult> => {
    try{
        const newPakket = await DI.pakkettenRepo.create(body);
        await DI.pakkettenRepo.persistAndFlush(newPakket);
        return {
            result: newPakket,
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

export const updateByID = async (id: number, body: any) : Promise<databaseOperationResult> => {
    try{
        var pakket: Pakket = await getByID(id);
        if(pakket == null){
            return {
                result: null,
                errors: ["Pakket not found"]
            };
        }
        DI.pakkettenRepo.assign(pakket, body);
        await DI.pakkettenRepo.persistAndFlush(pakket);
        return {
            result: pakket,
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
        var pakket: Pakket = await getByID(id);
        if(pakket == null){
            return {
                result: null,
                errors: ["Pakket not found"]
            };
        }
        await DI.pakkettenRepo.removeAndFlush(pakket);
        return {
            result: pakket,
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

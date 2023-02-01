import { DI } from "../data/data-index";
import { Product } from "../entities/Product.entity";
import { Winkel } from "../entities/Winkel.entity";
import { getLogger } from "../logging";
import { databaseOperationResult, getRequest } from "../returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const producten = await DI.productenRepo.findAll( {populate: ['winkel'] });



    const outputProducten : getRequest = {
        items: producten,
        count: producten.length
    }
    return outputProducten;
}

export const getByID = async (id: number) : Promise<Product> => {
    const product = await DI.productenRepo.findOne({id});
    return product;
}

export const create = async (body: any) : Promise<databaseOperationResult> => {
    try{
        const newProduct = await DI.productenRepo.create(body);
        await DI.productenRepo.persistAndFlush(newProduct);
        return {
            result: newProduct,
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
        var product: Product = await getByID(id);
        if(product == null){
            return {
                result: null,
                errors: ["Product not found"]
            };
        }
        DI.productenRepo.assign(product, body);
        await DI.productenRepo.persistAndFlush(product);
        return {
            result: product,
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
        var product: Product = await getByID(id);
        if(product == null){
            return {
                result: null,
                errors: ["Product not found"]
            };
        }
        await DI.productenRepo.removeAndFlush(product);
        return {
            result: product,
            errors: []
        };
    }catch(error){
        return {
            result: null,
            errors: [error]
        };
    }
}

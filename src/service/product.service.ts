import { DI } from "../data/data-index";
import { Product } from "../entities/Product.entity";
import { Winkel } from "../entities/Winkel.entity";
import { getRequest } from "../returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const producten = await DI.productenRepo.findAll( {populate: ['winkel'] });



    const outputProducten : getRequest = {
        items: producten,
        count: producten.length
    }
    console.log(outputProducten)
    return outputProducten;
}

export const getByID = async (id: number) : Promise<Product> => {
    const product = await DI.productenRepo.findOne({id});
    return product;
}

export const create = async (body: any) : Promise<Product> => {
    console.log("create product")
    console.log(body)
    // const winkel = await DI.winkelRepo.findOne();
    
    var newProduct = new Product(body.naam, body.prijs, DI.em.getReference(Winkel, body.winkel_id));
    const newProductIn = await DI.productenRepo.create(newProduct);

    newProduct.id = newProductIn.id;



    await DI.productenRepo.persistAndFlush(newProductIn);
    return newProduct;
}

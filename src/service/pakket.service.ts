import { DI } from "../data/data-index";
import { Pakket } from "../entities/Pakket.entity";
import { Product } from "../entities/Product.entity";
import { Winkel } from "../entities/Winkel.entity";
import { getRequest } from "../returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const paketten = await DI.pakkettenRepo.findAll( { populate: ['diensten', 'producten']});


    const outputPaketten : getRequest = {
        items: paketten,
        count: paketten.length
    }
    console.log(outputPaketten)
    return outputPaketten;
}

export const getByID = async (id: number) : Promise<Pakket> => {
    const pakket = await DI.pakkettenRepo.findOne({id}, {populate: ['diensten', 'producten']});
    return pakket;
}

export const create = async (body: any) : Promise<Pakket> => {
    console.log("creating pakket")
    
    var diesnten = body.diensten.map((dienst) => DI.em.getReference(Winkel, dienst));
    var producten = body.producten.map((product) => DI.em.getReference(Winkel, product));

    try{
        var newPakket : Pakket = new Pakket(body.naam, body.prijs, diesnten, producten);
        const newPakketID = DI.pakkettenRepo.create(newPakket);
        await DI.pakkettenRepo.persistAndFlush(newPakketID);
        return newPakketID;
    }catch(e){
        console.log(e)
        return new Pakket("test", 1, [], []);
    }
    return new Pakket("test", 1, [], []);
}

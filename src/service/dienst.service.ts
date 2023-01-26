import { DI } from "../data/data-index";
import { Dienst } from "../entities/Dienst.entity";
import { getRequest } from "./returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const diensten = await DI.dienstenRepo.findAll();

    const outputDiensten : getRequest = {
        items: diensten,
        count: diensten.length
    }
    console.log(outputDiensten)
    return outputDiensten;
}

export const create = async (body: any) : Promise<Dienst> => {
    console.log("create Dienst")
    console.log(body)
    
    var newDienst = new Dienst(body.naam, body.prijs);

    const newDienstIn = DI.dienstenRepo.create(newDienst);

    newDienst.id = newDienstIn.id;

    await DI.dienstenRepo.persistAndFlush(newDienstIn);
    return newDienst;
}

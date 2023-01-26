import { DI } from "../data/data-index";
import { Winkel } from "../entities/Winkel.entity";
import { getRequest } from "./returnTypes";



export const getAll = async () : Promise<getRequest> => {
    const winkels = await DI.winkelRepo.findAll();
    const outputWinkels : getRequest = {
        items: winkels,
        count: winkels.length
    }
    console.log(outputWinkels)
    return outputWinkels;
}

export const create = async (body: any) : Promise<Winkel> => {
    const newWinkel = await DI.winkelRepo.create(body);
    await DI.winkelRepo.persistAndFlush(newWinkel);
    return newWinkel;
}

import { DI } from "../data/data-index";
import { Pakket } from "../entities/Pakket.entity";
import { Product } from "../entities/Product.entity";
import { Winkel } from "../entities/Winkel.entity";
import { databaseOperationResult, getRequest } from "../returnTypes";
import { Event } from "../entities/Event.entity";
import { getLogger } from "../logging";



export const getAll = async () : Promise<getRequest> => {
    const events = await DI.eventsRepo.findAll( { populate: ['diensten', 'producten', 'pakketten']});

    const outputEvents : getRequest = {
        items: events,
        count: events.length
    }
    return outputEvents;
}

export const getByID = async (id: number) : Promise<Event> => {
    const event = await DI.eventsRepo.findOne({id});
    return event;
}

export const create = async (body: any) : Promise<databaseOperationResult> => {
    var diensten = body.diensten.map((dienst) => DI.em.getReference(Winkel, dienst));
    var producten = body.producten.map((product) => DI.em.getReference(Winkel, product));
    var pakketten = body.pakketten.map((pakket) => DI.em.getReference(Pakket, pakket));
    
    try{
        const newEvent = await DI.eventsRepo.create(body);
        newEvent.diensten = diensten;
        newEvent.producten = producten;
        newEvent.pakketten = pakketten;
        await DI.eventsRepo.persistAndFlush(newEvent);
        return {
            result: newEvent,
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
        var event: Event = await DI.eventsRepo.findOne({id});
        if(event == null){
            return {
                result: null,
                errors: ["Event not found"]
            };
        }
        DI.eventsRepo.assign(event, body);
        await DI.eventsRepo.persistAndFlush(event);
        return {
            result: event,
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
        var deletedEvent: Event = await getByID(id);
        if(deletedEvent == null){
            return {
                result: null,
                errors: ["Event not found"]
            };
        }
        await DI.eventsRepo.removeAndFlush(deletedEvent);
        return {
            result: deletedEvent,
            errors: []
        };
    }catch(error){
        return {
            result: null,
            errors: [error]
        };
    }
}
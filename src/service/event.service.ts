import { DI } from "../data/data-index";
import { Pakket } from "../entities/Pakket.entity";
import { Product } from "../entities/Product.entity";
import { Winkel } from "../entities/Winkel.entity";
import { getRequest } from "../returnTypes";
import { Event } from "../entities/Event.entity";



export const getAll = async () : Promise<getRequest> => {
    const events = await DI.eventsRepo.findAll( { populate: ['diensten', 'producten', 'pakketten']});


    const outputEvents : getRequest = {
        items: events,
        count: events.length
    }
    console.log(outputEvents)
    return outputEvents;
}

export const getByID = async (id: number) : Promise<Event> => {
    const event = await DI.eventsRepo.findOne({id});
    return event;
}

export const create = async (body: any) : Promise<Event> => {
    console.log("creating event")

    var diensten = body.diensten.map((dienst) => DI.em.getReference(Winkel, dienst));
    var producten = body.producten.map((product) => DI.em.getReference(Winkel, product));
    var pakketten = body.pakketten.map((pakket) => DI.em.getReference(Pakket, pakket));
    
    try{
        const newEvent : Event = new Event(body.naam, body.prijs, diensten, producten, pakketten);

        const newEventID = DI.eventsRepo.create(newEvent);
        await DI.pakkettenRepo.persistAndFlush(newEventID);
        return newEventID;
    }catch(e){
        console.log(e)
        return new Event("test", 1, [], [], []);
    }
}

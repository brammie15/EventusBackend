import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { Dienst } from '../entities/Dienst.entity';
import { Event } from '../entities/Event.entity';
import { Pakket } from '../entities/Pakket.entity';
import { Product } from '../entities/Product.entity';
import { Winkel } from '../entities/Winkel.entity';
import config from '../mikro-orm.config';

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager
    winkelRepo: EntityRepository<Winkel>
    productenRepo: EntityRepository<Product>
    dienstenRepo: EntityRepository<Dienst>
    eventsRepo: EntityRepository<Event>
    pakkettenRepo: EntityRepository<Pakket>
}


export async function initData() {
    DI.orm = await MikroORM.init(config);
    DI.em = DI.orm.em;
    DI.winkelRepo = DI.em.getRepository(Winkel);
    DI.productenRepo = DI.em.getRepository(Product);
    DI.dienstenRepo = DI.em.getRepository(Dienst);
    DI.eventsRepo = DI.em.getRepository(Event);
    DI.pakkettenRepo = DI.em.getRepository(Pakket);
}

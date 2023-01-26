import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property, } from "@mikro-orm/core";
import { Dienst } from "./Dienst.entity";
import { Pakket } from "./Pakket.entity";
import { Product } from "./Product.entity";

@Entity()
export class Event {
    @PrimaryKey()
    id!: number;

    @Property()
    naam!: string;

    @Property()
    prijs!: number;

    // @ManyToMany(() => Dienst)
    // diesnten = new Collection<Dienst>(this);

    // @ManyToMany(() => Product)
    // producten = new Collection<Product>(this);

    // @ManyToMany(() => Pakket)
    // pakketten = new Collection<Pakket>(this);

}
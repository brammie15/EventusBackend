import { Entity, PrimaryKey, Property, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { Pakket } from "./Pakket.entity";
import { Event } from "./Event.entity";

@Entity()
export class Dienst {

    @PrimaryKey()
    id!: number;

    @Property()
    naam!: string;

    @Property()
    prijs!: number;

    @ManyToMany(() => Pakket, pakket => pakket.diensten, { cascade: [Cascade.PERSIST, Cascade.MERGE]})
    dienstPaketten: Collection<Pakket> = new Collection<Pakket>(this);

    @ManyToMany(() => Event, event => event.diensten, { cascade: [Cascade.PERSIST, Cascade.MERGE]})
    dienstEvents: Collection<Pakket> = new Collection<Pakket>(this);

    constructor(naam: string, prijs: number) {
        this.naam = naam;
        this.prijs = prijs;
    }
}

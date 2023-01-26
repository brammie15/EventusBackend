import { Cascade, Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Pakket } from "./Pakket.entity";
import { Winkel } from "./Winkel.entity";

@Entity()
export class Product {
    @PrimaryKey()
    id!: number;

    @Property()
    naam!: string;

    @Property()
    prijs!: number;

    @ManyToOne(() => Winkel, {cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: true})
    winkel!: Winkel;

    @ManyToMany(() => Pakket, pakket => pakket.producten, {cascade: [Cascade.PERSIST, Cascade.MERGE]})
    productPaketten : Collection<Pakket> = new Collection<Pakket>(this);

    constructor(naam: string, prijs: number, winkel: Winkel) {
        this.naam = naam;
        this.prijs = prijs;
        this.winkel = winkel;
    }

}



import { Cascade, Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property, } from "@mikro-orm/core";
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

    @ManyToMany(() => Dienst, 'dienstEvents', {owner: true, cascade: [Cascade.PERSIST, Cascade.MERGE]})
    diensten = new Collection<Dienst>(this);

    @ManyToMany(() => Product, 'productEvents', {owner: true, cascade: [Cascade.PERSIST, Cascade.MERGE]})
    producten = new Collection<Product>(this);

    @ManyToMany(() => Pakket)
    pakketten = new Collection<Pakket>(this);

    constructor(naam: string, prijs: number, diensten: Array<Dienst>, producten: Array<Product>, pakketten: Array<Pakket>) {
        this.naam = naam;
        this.prijs = prijs;
        diensten.forEach(dienst => {
            this.diensten.add(dienst);
        });
        producten.forEach(product => {
            this.producten.add(product);
        });
        pakketten.forEach(pakket => {
            this.pakketten.add(pakket);
        });
    }
}
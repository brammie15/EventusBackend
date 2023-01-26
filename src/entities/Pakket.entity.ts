import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Cascade } from "@mikro-orm/core";
import { Dienst } from "./Dienst.entity";
import { Product } from "./Product.entity";

@Entity()
export class Pakket {

    @PrimaryKey()
    id!: number;

    @Property()
    naam!: string;

    @Property()
    prijs!: number;

    @ManyToMany(() => Dienst, 'dienstPaketten', {owner: true, cascade: [Cascade.PERSIST, Cascade.MERGE]})
    diensten = new Collection<Dienst>(this);

    @ManyToMany(() => Product, 'productPaketten', {owner: true, cascade: [Cascade.PERSIST, Cascade.MERGE]})
    producten = new Collection<Product>(this);

    constructor(naam: string, prijs: number, diensten: Array<Dienst>, producten: Array<Product>) {
        this.naam = naam;
        this.prijs = prijs;
        diensten.forEach(dienst => {
            this.diensten.add(dienst);
        });
        producten.forEach(product => {
            this.producten.add(product);
        });
    }

}
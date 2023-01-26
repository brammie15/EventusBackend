import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Winkel {

    @PrimaryKey()
    id!: number;

    @Property()
    naam!: string;

    constructor(naam: string) {
        this.naam = naam;
    }

}
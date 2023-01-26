import { Collection, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Dienst } from '../entities/Dienst.entity';
import { Pakket } from '../entities/Pakket.entity';
import { Product } from '../entities/Product.entity';
import { Winkel } from '../entities/Winkel.entity';

export class DatabaseSeeder extends Seeder {

  winkels = [
    new Winkel("Carrefour"), //0
    new Winkel("Aldi"), //1
    new Winkel("Lidl"), //2
    new Winkel("Colruyt"), //3
    new Winkel("Delhaize"), //4
    new Winkel("Jumbo"),  //5
    new Winkel("Albert Heijn"), //6
    new Winkel("Eigen kweek") //7
  ]

  producten = [
    new Product("Cola", 2.5, this.winkels[0]),              //0
    new Product("Fanta", 1.25, this.winkels[0]),            //1
    new Product("Sprite", 2.5, this.winkels[1]),            //2
    new Product("Coca Cola", 2.5, this.winkels[2]),         //3
    new Product("Coca Cola Zero 1L", 2.99, this.winkels[3]),//4
    new Product("Coca Cola Light", 3.00, this.winkels[3]),  //5
    new Product("lijm", 2.5, this.winkels[4]),              //6
    new Product("Broodje met kaas", 1.00, this.winkels[8]), //7

    new Product("Frietjes", 2.5, this.winkels[7]),          //8
    new Product("Kip", 1.25, this.winkels[7]),              //9
    new Product("Biefstuk", 2.5, this.winkels[0]),          //10
    new Product("Pizza", 2.5, this.winkels[7]),             //11
    new Product("Hamburger", 2.5, this.winkels[5]),         //12
    new Product("Mini-Loempia", 0.75, this.winkels[7]),     //13
  ]

  diensten = [
    new Dienst("Lichten", 2.5),
    new Dienst("Dj en muziek", 1.25),
    new Dienst("Bar", 2.5),
    new Dienst("Food", 20),
  ]
  getIndexes(indexes: number[], array: any[]): Array<any> {
    let result: any[] = [];
    indexes.forEach(index => {
      result.push(array[index]);
    });
    return result;
  }
    

  drankPakket: Pakket = new Pakket(
    "Drankpakket",
    100,
    this.getIndexes([0], this.producten),
    this.getIndexes([0], this.diensten)
  );

  foodPakket: Pakket = new Pakket(
    "Foodpakket",
    150,
    this.getIndexes([8,9,10,11,12,13], this.producten),
    this.getIndexes([3], this.diensten)
  );


  async run(em: EntityManager): Promise<void> {
    this.winkels.forEach(winkel => {
      em.create(Winkel, winkel);
    });
    this.producten.forEach(product => {
      em.create(Product, product);
    });
    this.diensten.forEach(dienst => {
      em.create(Dienst, dienst);
    });
    // em.create(Pakket, this.drankPakket);
    // em.create(Pakket, this.foodPakket);
  }

}

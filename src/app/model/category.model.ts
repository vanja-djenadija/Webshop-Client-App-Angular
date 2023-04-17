import {Attribute} from "./attribute.model";


export class Category {
  id: number;
  name: string;
  attributes: Attribute[];

  subcategories: Category[];

  constructor(id: number,
              name: string,
              attributes: Attribute[],
              subcategories: Category[]) {
    this.id = id;
    this.name = name;
    this.attributes = attributes;
    this.subcategories = subcategories;
  }
}

import {ProductAttribute} from "./product-attribute.model";

export class SearchProduct {
  categoryName: string;
  categoryAttributes: ProductAttribute[] | null = null;
  priceFrom: number | null = null;
  priceTo: number | null = null;
  location: string;


  constructor(categoryName: string, categoryAttributes: ProductAttribute[], priceFrom: number, priceTo: number, location: string) {
    this.categoryName = categoryName;
    this.categoryAttributes = categoryAttributes;
    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
    this.location = location;
  }
}

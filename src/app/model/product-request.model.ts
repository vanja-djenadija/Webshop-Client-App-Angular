import {Image} from "./image.model";
import {User} from "./user.model";
import {Comment} from "./comment.model";
import {ProductAttribute} from "./product-attribute.model";
import {CategoryRequest} from "./category-request.model";

export class ProductRequest {
  name: string;
  description: string;
  price: number;
  isNew: boolean = true;
  location: string;
  createDate: Date;
  quantity: number = 1;
  attributes: ProductAttribute[] = [];
  images: Image[] = [];
  sellerId: number;
  categories: CategoryRequest[] = [];

  constructor(name: string, description: string, price: number, isNew: boolean, location: string, createDate: Date,
              quantity: number, attributes: ProductAttribute[], images: Image[], sellerId: number, categories: CategoryRequest[]) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.isNew = isNew;
    this.location = location;
    this.createDate = createDate;
    this.quantity = quantity;
    this.attributes = attributes;
    this.images = images;
    this.sellerId = sellerId;
    this.categories = categories;
  }
}

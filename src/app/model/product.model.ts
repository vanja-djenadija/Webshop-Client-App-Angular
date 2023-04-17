import { Image } from "./image.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { ProductAttribute } from "./product-attribute.model";

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    isNew: boolean;
    status: ProductStatus;
    location: string;
    createDate: Date;
    quantity: number;
    attributes: ProductAttribute[];
    comments: Comment[];
    images: Image[];
    seller: User;
    customer: User;

    constructor(id: number, name: string, description: string, price: number, isNew: boolean, status: ProductStatus, location: string, createDate: Date, quantity: number, attributes: ProductAttribute[], comments: Comment[], images: Image[], seller: User, customer: User) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.isNew = isNew;
        this.status = status;
        this.location = location;
        this.createDate = createDate;
        this.quantity = quantity;
        this.attributes = attributes;
        this.comments = comments;
        this.images = images;
        this.seller = seller;
        this.customer = customer;
    }

}

export enum ProductStatus {
    ACTIVE,
    SOLD,
    INACTIVE
}
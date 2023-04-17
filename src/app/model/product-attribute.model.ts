import { Attribute } from "./attribute.model";

export class ProductAttribute {
    attribute: Attribute;
    value: string;

    constructor(attribute: Attribute, value: string) {
        this.attribute = attribute;
        this.value = value;
    }
}
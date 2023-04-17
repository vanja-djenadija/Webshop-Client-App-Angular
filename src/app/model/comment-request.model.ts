export class CommentRequest {
    content: string;
    dateTime: Date;
    userId: number;
    productId: number;

    constructor(content: string,
        dateTime: Date,
        userId: number,
        productId: number) {
        this.content = content;
        this.dateTime = dateTime;
        this.userId = userId;
        this.productId = productId;
    }
}
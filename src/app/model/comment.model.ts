import { User } from "./user.model";

export class Comment {
    id: number;
    content: string;
    dateTime: Date;
    user: User;

    constructor(id: number,
        content: string,
        dateTime: Date,
        user: User) {
        this.id = id;
        this.content = content;
        this.dateTime = dateTime;
        this.user = user;
    }
}
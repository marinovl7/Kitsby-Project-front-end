
export class User {
    userId: string
    token: string


    constructor(userid: string, token: string) {
        this.userId = userid;
        this.token = token
    }
}
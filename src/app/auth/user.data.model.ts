export class UserData {
    _id: string
    balance: number
    passLevel: number
    referralLink: string


    constructor(_id: string, balance: number, passLevel: number, referralLink: string) {
        this.balance = balance
        this.passLevel = passLevel
        this.referralLink = referralLink
        this._id = _id
    }
} 
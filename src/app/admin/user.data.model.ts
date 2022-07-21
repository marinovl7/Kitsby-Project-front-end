
export class
    UserDataModel {
    balance: number
    email: string
    passLevel: number
    referralLink: string
    signedUpReferralLink?: string
    _id: string

    constructor(balance: number, email: string, passLevel: number, referralLink: string, signedUpReferralLink: string, id: string) {
        this.balance = balance
        this.email = email
        this.passLevel = passLevel
        this.referralLink = referralLink
        this.signedUpReferralLink = signedUpReferralLink
        this._id = id
    }
}
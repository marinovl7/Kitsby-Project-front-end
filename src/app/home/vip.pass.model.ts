export class VipPass {
    dailyTaskMin: number
    dailyTaskMax: number
    moneyEarnedMin: number
    moneyEarnedMax: number
    price: number
    taskDifficulty: string

    constructor(dailyTaskMin: number, dailyTaskMax: number, moneyEarnedMin: number, moneyEarnedMax: number, price: number, taskDifficulty: string) {
        this.dailyTaskMax = dailyTaskMax
        this.dailyTaskMin = dailyTaskMin
        this.moneyEarnedMax = moneyEarnedMax
        this.moneyEarnedMin = moneyEarnedMin
        this.price = price
        this.taskDifficulty = taskDifficulty
    }
}
export interface IPayment {
    id: string,
    name: string,
    amount: number,
    price: number,
    items: IPayment[]
}
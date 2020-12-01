export interface User {
    email: string,
    password: string,
    returnSecureToken: boolean
}
export interface Product {
    type: string,
    title: string,
    photo: any,
    info: string,
    price: number,
    date: Date
}

export interface FbResponce {
    name: string
}
export interface User {
    email: string,
    password: string,
    returnSecureToken: boolean
}
export interface Product {
    type?: string,
    id?:string | number,
    title?: string,
    photo?: any,
    info?: string,
    price?: number,
    date: Date
}

export interface FbResponce {
    name: string
}
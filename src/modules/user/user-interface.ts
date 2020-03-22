//Requisitos obrigatórios
export interface IUser{
    readonly id_user: number;
    name: string;
    email: string;
    password: string;
}

export interface IUserDetail extends IUser {
    id_user: number;
    name: string;
    email: string;
    password: string;
} 

export function createUser({id_user, name, email, password}: any): IUser{
    return { id_user, name, email, password }
}
export function createUsers(data: any[]): IUser[]{
    return data.map(createUser)
}
export function createUserById({id_user, name, email, password}: any): IUserDetail{
    return { id_user, name, email, password }
}
export function createUserByEmail({id_user, name, email, password}: any): IUserDetail{
    return { id_user, name, email, password }
}
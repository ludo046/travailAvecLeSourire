export interface registerModel{
    firstname: String;
    lastname: String;
    age: Number;
    email: String;
    password: String;
}

export interface loginModel{
    email: String;
    password: String;
}
export interface Users{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    age: number;
    picture: string,
    isAdmin: boolean
}

export interface SingleUser{
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    picture: string;
}
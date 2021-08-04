export interface postRessourseModel{
    content: string;
    project: string;
    attachment: File
    parcours: string;
    title:string;
}

export interface Ressources{
    id: number;
    userId: number;
    content: string;
    attachment: string;
    movie: string;
    project: string;
    parcour: string;
    User:{
        firstname: string,
        lastname: string
    }
}

export interface UpdateRessourseModel{
    content: string;
    project: string;
    attachment: File
    title:string;
}

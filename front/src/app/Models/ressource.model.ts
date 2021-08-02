export interface postRessourseModel{
    content: String;
    attachment: File;
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
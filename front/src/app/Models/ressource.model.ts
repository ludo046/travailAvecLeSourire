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
    title: string;
    content: string;
    image: string;
    movie: string;
    pdf: string;
    project: string;
    parcour: string;
    createdAt: Date;
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

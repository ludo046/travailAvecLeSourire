import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { postRessourseModel, Ressources, UpdateRessourseModel } from 'src/app/Models/ressource.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RessourseService {

private ressoucesUrl = environment.ressourceUrl;
public formData : any;
allRessourcesDevWeb$ = new Subject<any>();
allRessourcesDevFront$ = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  postRessource(content: string,project:string,attachment:File,parcours: string, title:string):Observable<{}>{
    const formData = new FormData();
    formData.append('content', content);
    formData.append('project', project);
    formData.append('image', attachment);
    formData.append('parcour', parcours);
    formData.append('title', title);
    return this.httpClient.post(`${this.ressoucesUrl}new`,formData);
  }

  getAllRessourcesDevWeb():void{
    this.httpClient.get(`${this.ressoucesUrl}devWeb`).subscribe(
      (ressources) => {
        this.allRessourcesDevWeb$.next(ressources);
      },
      (error) => {
        this.allRessourcesDevWeb$.next([]);
        console.error(error);
      }
    )
  }
  getAllRessourcesDevFront():void{
    this.httpClient.get(`${this.ressoucesUrl}devFront`).subscribe(
      (ressources) => {
        this.allRessourcesDevFront$.next(ressources);
      },
      (error) => {
        this.allRessourcesDevFront$.next([]);
        console.error(error);
      }
    )
  }
  deleteRessourceDevWeb(id: number){
    return this.httpClient.delete(`${this.ressoucesUrl}deleteDevWeb/`+id)
  }
  deleteRessourceDevFront(id: number){
    return this.httpClient.delete(`${this.ressoucesUrl}deleteDevFront/`+id)
  }
  updateDevRessource(title: string, content: string, attachment: File, ressourceId: string){
    let formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('image', attachment);

    return this.httpClient.put(`${this.ressoucesUrl}modifyDevWeb/`+ressourceId, formdata)
  }
}

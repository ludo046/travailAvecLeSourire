import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ressources } from 'src/app/Models/ressource.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RessourseService {

private ressoucesUrl = environment.ressourceUrl;
public formData : any;
allRessources$ = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  postRessource(content: string, project: string, attachment: File, parcour: string):Observable<any>{
    const formData = new FormData();
    formData.append('content', content);
    formData.append('project', project);
    formData.append('image', attachment);
    formData.append('parcour', parcour);
    return this.httpClient.post(`${this.ressoucesUrl}new`,formData)
  }

  getAllRessources():void{
    this.httpClient.get(`${this.ressoucesUrl}`).subscribe(
      (ressources) => {
        this.allRessources$.next(ressources);
      },
      (error) => {
        this.allRessources$.next([]);
        console.error(error);
      }
    )
  }

}

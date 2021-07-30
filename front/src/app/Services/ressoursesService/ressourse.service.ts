import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { postRessourseModel } from 'src/app/Models/ressource.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RessourseService {

private ressoucesUrl = environment.ressourceUrl;
public formData : any;

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

}

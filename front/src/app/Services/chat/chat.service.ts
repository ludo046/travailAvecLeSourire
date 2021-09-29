import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private socket: Socket;
  private chatUrl = environment.chatUrl;
  message$ = new Subject<any>();
  messages$ = new Subject<[any]>()
  chatMessage = []

  constructor(private httpClient: HttpClient) {}

  sendMessage(message: string,attachment:File):Observable<{}>{

    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', attachment);
    return this.httpClient.post(`${this.chatUrl}sendMessage`,formData);
  }

  getAllMessage(){
    this.httpClient.get(`${this.chatUrl}`).subscribe(
      (message) => {
        this.message$.next(message);
      },
      (error) => {
        this.message$.next([]);
      }
    )
  }

  sendRoomMessage(message: string, attachment:File, contactId: string, roomId: string):Observable<{}>{
    //this.socket.emit('my message', (message));

    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', attachment);
    formData.append('contactId', contactId)
    formData.append('roomId', roomId)

    return this.httpClient.post(`${this.chatUrl}room`,formData);
  }

}

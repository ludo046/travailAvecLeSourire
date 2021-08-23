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

  // setupSocketConnection(){
  //   this.socket = io('http://localhost:8080', {transports:['websocket']})
  //   this.socket.on('my broadcast', (message: string) => {
  //     this.chatMessage.push(message)
  //     console.log(this.chatMessage);
  //   })
  // }

  // disconnect(){
  //   if(this.socket){
  //     this.socket.disconnect();
  //   }
  // }

  sendMessage(message: string,attachment:File):Observable<{}>{
    //this.socket.emit('my message', (message));

    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', attachment);
    return this.httpClient.post(`${this.chatUrl}/sendMessage`,formData);
  }

  getAllMessage(){
    this.httpClient.get(`${this.chatUrl}`).subscribe(
      (message) => {
        this.message$.next(message);
      },
      (error) => {
        this.message$.next([]);
        console.error(error);
      }
    )
  }
}

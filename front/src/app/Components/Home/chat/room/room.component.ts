import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MessageModel } from 'src/app/Models/chat.model';
import { Users } from 'src/app/Models/user.model';
import { ChatService } from 'src/app/Services/chat/chat.service';
import { UserService } from 'src/app/Services/usersServise/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    private usersService: UserService,
    private formBuilder: FormBuilder
  ) { }

  usersSub: Subscription;
  users: Users[];
  errorMsg
  message: string;
  //messages: any[] = [];
  currentUser = JSON.parse(sessionStorage.getItem('session')).userId;
  public messageForm: FormGroup;
  public file: File;
  messageSub: Subscription;
  messages: MessageModel[];
  messageText;
  messagesSub: Subscription;
  socketMessage: [any];
  messageArray: Array<{message: string, currentUser: number}>;
  private socket: Socket;
  message$ = new Subject<any>();
  messages$ = new Subject<[any]>()
  chatRoomMessage = []
  chatId = window.location.href.split('room/')[1];
  contactId : string;
  contact : number;
  userId: string;
  roomMessages = []
  singleUser = []


  ngOnInit(): void {
    this.setupSocketConnection();

    this.usersSub = this.usersService.allUsers$.subscribe(
      (users) => {
        this.users = users
        console.log(this.users);
        this.singleUser = this.users.filter(function(user){
          const url = window.location.href.split('room/')[1]
          if(user){
            return user.id === parseInt(url)
          }
          
        })
        console.log(this.singleUser);
        
      },
      (error) => {
        console.log(error);
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.usersService.getAllUsers();



    this.messageForm = this.formBuilder.group({
      message: this.formBuilder.control('',Validators.required),
      attachment: this.formBuilder.control('',Validators.required),
    });


    this.messageSub = this.chatService.message$.subscribe(
      (messages) => {
        const url = window.location.href.split('room/')[1]
        let chatId = url.split('/')[0]
        const userId = url.split('/')[1]
        const contactId = url.split('/')[0]
        console.log(chatId);
        
        this.messages = messages.filter(function(messages){
          if(messages.roomId){
            return messages.roomId === userId + '-' + contactId || messages.roomId === contactId + '-' + userId
          }
        })
        console.log(this.messages);
        
      },
      (error) => {
        console.log(error);
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.chatService.getAllMessage();
  }

  onFileAdded(event: Event) {
    //recuperation de la photo ou de la video ci il ya
    this.file = (event.target as HTMLInputElement).files[0];
    console.log(this.file);
    
  }

  sendRoomMessage():void{

    const url = window.location.href.split('room/')[1]
    this.userId = url.split('/')[1]
    this.contactId = url.split('/')[0]
    const roomId = this.userId + '-' + this.contactId
    const content = this.messageForm.get('message').value;
    const attachment = this.file;
    const socket = {
      message : this.messageForm.get('message').value,
      userId: this.currentUser,
      roomId: roomId
    }
    this.chatService.sendRoomMessage(content,attachment,this.contactId, roomId).subscribe(() => {
      //this.getMessage()
      this.messageText = '';
    });

    this.socket.emit('room message', (socket));
  }

  setupSocketConnection(){
    const url = window.location.href.split('room/')[1]
        const userId = url.split('/')[1]
        const contactId = url.split('/')[0]
    this.socket = io('http://localhost:8080', {transports:['websocket']})
    this.socket.on('message room', (message: string) => {
      this.chatRoomMessage.push(message)
      //console.log(this.chatRoomMessage);
      this.roomMessages = this.chatRoomMessage.filter(function(roomMessage){
        if(roomMessage.msg.roomId){
          return roomMessage.msg.roomId === userId + '-' + contactId || roomMessage.msg.roomId === contactId + '-' + userId
        }
      })
      console.log(this.roomMessages);
      
    })
  }

  chatReload(){
    this.ngOnInit()
  }

  disconnect(){
    if(this.socket){
      this.socket.disconnect();
    }
  }

  ngOnDestroy(){
    this.disconnect();
  }

}








import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MessageModel } from 'src/app/Models/chat.model';
import { Users } from 'src/app/Models/user.model';
import { ChatService } from 'src/app/Services/chat/chat.service';
import { UserService } from 'src/app/Services/usersServise/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  usersSub: Subscription;
  users: Users[];
  errorMsg
  message: string;
  currentUser = JSON.parse(sessionStorage.getItem('session')).userId;
  public messageForm: FormGroup;
  public file: File;
  messageSub: Subscription;
  messages: MessageModel[];
  messageText;
  messagesSub: Subscription;
  socketMessage: [any];
  messageArray: Array<{message: string, currentUser: number}>;
  faPaperPlane = faPaperPlane;
  faPhotoVideo = faPhotoVideo;
  fullPathname ='assets/images/smiley.jpg'
  fullPath = 'assets/images/userPicture.png'




  private socket: Socket;
  private chatUrl = environment.chatUrl;
  message$ = new Subject<any>();
  messages$ = new Subject<[any]>()
  chatMessage = [];

  constructor(
    private chatService: ChatService,
    private usersService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.setupSocketConnection();

    this.usersSub = this.usersService.allUsers$.subscribe(
      (users) => {
        this.users = users
      },
      (error) => {
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
        this.messages = messages.filter(messages => messages.contactId === null);
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.chatService.getAllMessage();
      
  }

  onFileAdded(event: Event) {
    //recuperation de la photo ou de la video ci il ya
    this.file = (event.target as HTMLInputElement).files[0];
  }

  sendMessage():void{
    const socket = {
      message : this.messageForm.get('message').value,
      userId: this.currentUser
    }
    const content = this.messageForm.get('message').value;
    const attachment = this.file;
    this.chatService.sendMessage(content,attachment).subscribe(
      result => {
        console.log(result);
        this.errorMsg = result,
        this.messageText = '';
      },
      error => {
      this.errorMsg = error.error.message
      console.log(this.errorMsg);
      }
    );
    this.socket.emit('my message', (socket));
  }

  getMessage(){
    this.messageSub = this.chatService.message$.subscribe(
      (messages) => {
        this.messages = messages
        
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.chatService.getAllMessage()

  }

  setupSocketConnection(){
    this.socket = io('http://travailaveclesourire.fr:8080', {transports:['websocket']})
    this.socket.on('my broadcast', (message: string) => {
      this.chatMessage.push(message)
    })
  }

  // joinRoom(){
  //   this.chatService.joinRoom(this.currentUser, contactId)
  // }

  disconnect(){
    if(this.socket){
      this.socket.disconnect();
    }
  }

  ngOnDestroy(){
    this.disconnect();
  }
}


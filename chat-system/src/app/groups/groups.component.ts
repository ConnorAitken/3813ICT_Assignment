import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { SocketService } from '../services/socket.service';
import { ImgUploadService } from '../services/img-upload.service';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: any;
  selectedGroup: any;

  rooms: any;
  selectedRoom: any;

  users: any;
  groupInfo: any

  toggleGroups: boolean = false;
  toggleRooms: boolean = false;
  toggleRole: boolean = false;
  toggleChat: boolean = false;

  Header: any;

  userRole;
  userID;
  userName;

  messageData = {
    // groupName:"",
    // roomName:"",
    userName:"",
    message:"",
    dateTime:""
  }
  messagecontent:any;
  messages:any[] = [];
  ioConnection:any;

  imagePath:string="";
  selectedFile:any = null;

  left: boolean = false;
  lastRoom: string = "";
  lastGroup: string = "";


  constructor( private router:Router, private httpClient:HttpClient, private socketService:SocketService, private imgUploadService:ImgUploadService, private virtualScrollViewport:CdkVirtualScrollViewport ) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/');
    }
    this.userID = sessionStorage.getItem('id');
    this.userName = sessionStorage.getItem('uname')!;
    this.userRole = sessionStorage.getItem('role');
    if (this.userRole == "stdUser") {
      this.toggleRole = true;
    }
  }

  ngOnInit(): void {
    this.initIoConnection();
    if (this.userRole == "SuperAdmin") {
      this.loadSuper();
    }
    else {
      this.loadEveryoneElse();
    }
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage().subscribe((message:any) => {
      this.processMsg(message);
    });
  }

  processMsg(message:any) {
    console.log(message);
    console.log(this.selectedRoom.name);
    if (message.groupName == this.selectedGroup.name && message.roomName == this.selectedRoom.name) {
        // add new message to the messages array.
        this.messages.push(message.messageData);
        // console.log(this.selectedRoom);
        this.httpClient.post(BACKEND_URl + '/save_chat', {"groupName":this.selectedGroup.name, "roomName":this.selectedRoom.name, "messages":this.messages}, httpOptions).subscribe((data:any) => {});
      }
  }

  chat() {
    if(this.messagecontent && !this.toggleChat) {
      // check there is a message to send
      // this.messageData.groupName = this.selectedGroup.name;
      // this.messageData.roomName = this.selectedRoom.name;
      this.messageData.userName = this.userName;
      this.messageData.message = this.messagecontent;
      this.messageData.dateTime = formatDate(Date.now(),'h:mm a', 'en-US');
      this.socketService.send({"groupName":this.selectedGroup.name, "roomName":this.selectedRoom.name, "messageData":this.messageData});
      this.messagecontent = "";
    }
    else {
      console.log("no message");
    }
  }

  onFileSelected(event:any) {
    console.log("event: ", event)
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.imgUploadService.imgUpload(fd).subscribe((res:any)=>{
      this.imagePath = res.data.filename;
      console.log("retrun: " + res.data.filename + ' , ' + res.data.size);
    });
  }

  loadSuper() {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
      this.groups = data;
      this.onSelectGroup(data[0]);
    });
  }

  loadEveryoneElse() {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((groupData:any) => {
      let temp: any[] = [];
    var found = false;
    for (let i = 0; i < groupData.length; i++) {
      this.httpClient.post(BACKEND_URl + '/load_group_users', groupData[i], httpOptions).subscribe((userData:any) => {
        let x = userData.findIndex((user: { userID: any | null; }) =>
          (user.userID == this.userID));
        if (x != -1) {
          temp.push(groupData[i]);
          if (!found) {
            found = true;
            this.onSelectGroup(groupData[i])
          }
        }
      });
    }
    this.groups = temp
    });
  }

  groupsToggle() {
    this.toggleGroups = !this.toggleGroups;
  }

  roomsToggle() {
    this.toggleRooms = !this.toggleRooms;
  }

  onSelectGroup(group: any): void {
    this.toggleChat = true;
    this.selectedGroup = group;
    this.Header = this.selectedGroup.name;
    if (this.left) {
      this.systemMsg("left");
      this.left = false;
    }
    this.httpClient.post(BACKEND_URl + '/group_info', this.selectedGroup, httpOptions).subscribe((data:any) => {
      this.rooms = data;
      this.httpClient.post(BACKEND_URl + '/load_group_users', this.selectedGroup, httpOptions).subscribe((data:any) => {
        this.users = data; 
        if (this.userRole == "stdUser" || this.userRole == "GroupAssistant") {
          let i = this.users.findIndex((user:any) =>(user.userID == this.userID));
          if (this.users[i].groupAssis) {
            this.userRole = "GroupAssistant"
            this.toggleRole = false;
          }
          else {
            this.userRole = "stdUser"
            this.toggleRole = true;
          }
        }
      });
    });
  }

  onSelectRoom(room: any): void{
    this.toggleChat = false;
    this.selectedRoom = room;
    this.Header = this.selectedGroup.name +" - "+ this.selectedRoom.name;
    if (this.left) {
      this.systemMsg("left");
    }
    else this.left = true;
    this.httpClient.post(BACKEND_URl + '/load_chat', {"groupName":this.selectedGroup.name, "roomName":this.selectedRoom.name}, httpOptions).subscribe((data:any) => {
      if (data.length > 0) {
        this.messages = data[0].messages;
      }
      else {
        this.messages = [];
      }
      this.lastGroup = this.selectedGroup.name;
      this.lastRoom = this.selectedRoom.name;
      this.systemMsg("joined");
      // this.scrollToBottom();
      // this.messages = data[0].messages;
      // console.log(data.length);
    });
  }

  systemMsg(status: string) {
    this.messageData.userName = "*System*";
    this.messageData.message = "*" + this.userName + " has " + status + " the chat.*";
    this.messageData.dateTime = formatDate(Date.now(),'h:mm a', 'en-US');
    this.socketService.send({"groupName":this.lastGroup, "roomName":this.lastRoom, "messageData":this.messageData});
    this.messagecontent = "";
  }

  roleOptions() {
    if (this.userRole == "SuperAdmin") this.router.navigateByUrl('/super-admin');
    else if (this.userRole == "GroupAdmin") this.router.navigateByUrl('/group-admin');
    else this.router.navigate(['/group-assis', this.selectedGroup.id, this.selectedGroup.name]);
  }

  // scrollToBottom() {
  //   this.virtualScrollViewport.scrollToIndex(this.messages.length - 1);
  //   // setTimeout(() => {
  //   //   const items = document.getElementsByClassName("app-chat-msg");
  //   //   items[items.length - 1].scrollIntoView();
  //   // }, 10);
  // }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { formatDate } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { ImgUploadService } from '../services/img-upload.service';
import { DatabaseService } from "../services/database.service";

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


  constructor( private router:Router, private database:DatabaseService, private socketService:SocketService, private imgUploadService:ImgUploadService) {
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
    if (message.groupName == this.selectedGroup.name && message.roomName == this.selectedRoom.name) {
      // add new message to the messages array.
      this.messages.unshift(message.messageData);
      this.database.save_chat({"groupName":this.selectedGroup.name, "roomName":this.selectedRoom.name, "messages":this.messages}).subscribe((data:any) => {
        if (!data.success) alert("Error Saving Chat History!!");
      });
    }
  }

  chat() {
    if(this.messagecontent && !this.toggleChat) {
      // check there is a message to send
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
    this.database.get_groups().subscribe((data:any) => {
      this.groups = data;
      this.onSelectGroup(data[0]);
    });
  }

  loadEveryoneElse() {
    this.database.get_groups().subscribe((groupData:any) => {
      let temp: any[] = [];
    var found = false;
    for (let i = 0; i < groupData.length; i++) {
      this.database.load_group_users(groupData[i]).subscribe((userData:any) => {
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
    this.database.get_group_info(this.selectedGroup).subscribe((data:any) => {
      this.rooms = data;
      this.database.load_group_users(this.selectedGroup).subscribe((data:any) => {
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

  onSelectRoom(room: any): void {
    let i = this.users.findIndex((user:any)=>(user.userID == this.userID && user.roomID == room.roomID));
    if (i != -1) {
      this.toggleChat = false;
      this.selectedRoom = room;
      this.Header = this.selectedGroup.name +" - "+ this.selectedRoom.name;
      if (this.left) {
        this.systemMsg("left");
      }
      else this.left = true;
      this.database.load_chat({"groupName":this.selectedGroup.name, "roomName":this.selectedRoom.name}).subscribe((data:any) => {
        if (data.length > 0) {
          this.messages = data[0].messages;
        }
        else {
          this.messages = [];
        }
        this.lastGroup = this.selectedGroup.name;
        this.lastRoom = this.selectedRoom.name;
        this.systemMsg("joined");
      });
    }
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
}

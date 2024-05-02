import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, alertifyOptions: Partial<AlertifyOptions>){
    alertify.set("notifier", "delay", alertifyOptions.delay);
    alertify.set("notifier", "position", alertifyOptions.position);
    const msj = alertify[alertifyOptions.messageType](message);
    if(alertifyOptions.dismissOthers){
      msj.dismissOthers();
    }
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: AlertifyMessageType;
  position: AlertifyPosition;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum AlertifyMessageType{
  Error = "error",
  Success = "success", 
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}

export enum AlertifyPosition{
    TopRight = "top-right",
    TopLeft = "top-left",
    TopCenter = "top-center",
    BottomRight = "bottom-right",
    BottomLeft = "bottom-left",
    BottomCenter = "bottom-center"
}

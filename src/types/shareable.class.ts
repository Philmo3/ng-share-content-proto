import { ConnectionService } from './../app/connection.service';


export abstract class Shareable{
  shareId?: number

  constructor(protected connectionService: ConnectionService){}

  update(inputName: string, value: any){
    if(this.shareId){
      this.connectionService.update(this.shareId, new Map().set(inputName, ( typeof value) === 'string' ? value : JSON.stringify(value)))
    }
  }
}
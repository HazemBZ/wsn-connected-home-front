import { Injectable } from '@angular/core';

const ENDPOINT = "ws://192.168.1.13:8000/";


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public socket = new WebSocket(ENDPOINT);
  constructor() { }
}

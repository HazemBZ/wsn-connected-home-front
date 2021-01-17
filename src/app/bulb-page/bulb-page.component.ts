import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import * as icons from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bulb-page',
  templateUrl: './bulb-page.component.html',
  styleUrls: ['./bulb-page.component.css']
})
export class BulbPageComponent implements OnInit {

  public bulb = icons.faLightbulb;
  public temp = icons.faTemperatureHigh;
  public opened = false;
  public loading = false;
  constructor(private comService:CommunicationService) { }
  ngOnInit(): void {
  }


  public open(){
    this.opened = true;
    this.comService.socket.send("OPEN");
  }

  public close(){
    this.opened = false;
    this.comService.socket.send("CLOSE");
  }

  public toggle(){
    this.loading = true;
    setTimeout(()=> this.loading = false, 1000)
    if(this.opened) this.close()
    else this.open()
  }
}

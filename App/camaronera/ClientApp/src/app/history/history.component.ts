import { Component, OnInit } from '@angular/core';
import { SentenciasService } from '../../Servicios/sentencias.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public arraHist: any[] = []
  public listFor: any;
  public arrayH: number;
  public _dateA: Date;
  public _dateB: Date;
  public promdeio: number;
  public _totCamaron: number;
  

  constructor(public sentServices: SentenciasService) { }

  ngOnInit() {
    
    this.verRouteScreen();
    this.checkInfo();
  }


  showData() {
    this.verRouteScreen();
    this.sentServices.getHist(this._dateA, this._dateB).subscribe(
      x => {
        this.arraHist = x; {
          console.log(this.arraHist);
        }
      }
    );
  }

  verRouteScreen() {
    let history = document.getElementsByTagName('app-history');
    history[0].setAttribute('class', 'container-fluid');
  }

  checkInfo() {
    let infoD = document.getElementsByClassName('infoDesc');
    return console.log(infoD);
  }

  //histryCheck() {
  //  let checkBox = document.getElementsByClassName('inputs');
  //  console.log(checkBox);
  //  for (let i of this.arraHist) {
  //    this.listFor = i;
  //    console.log(this.listFor);
      
  //  }
  //}
}

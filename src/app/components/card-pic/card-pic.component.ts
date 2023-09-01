import { Component, Input } from '@angular/core';
import { Pic } from 'src/app/interfaces/pic';

@Component({
  selector: 'app-card-pic',
  templateUrl: './card-pic.component.html',
  styleUrls: ['./card-pic.component.scss']
})
export class CardPicComponent {
  @Input() picEntrante?:Pic;
  selected:boolean = false;
  avaible:boolean = false;
  mobile:boolean = true;
  constructor(){}
  ngOnInit(): void {
    
  }
  mostrarLabel(){
    this.selected = true
  }
  ocultarLabel(){
    this.selected = false
  }
  prohibirDescarga(event:any){
    event.preventDefault();
  }
}

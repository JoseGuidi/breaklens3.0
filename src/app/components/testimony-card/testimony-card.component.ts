import { Component, Input, SimpleChanges } from '@angular/core';
import { Testimony } from 'src/app/class/TestimonyClass';

@Component({
  selector: 'app-testimony-card',
  templateUrl: './testimony-card.component.html',
  styleUrls: ['./testimony-card.component.scss']
})
export class TestimonyCardComponent {
  @Input() testimonio?:Testimony; 
  cantEstrellas:number[] = [];
  seActualizoComentario:boolean = false
  ngOnInit(): void {
    if(this.testimonio){
      for(let i = 0; i < this.testimonio?.estrellas;i++){
        this.cantEstrellas.push(i);
      }
    }
    this.seActualizoComentario = false
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.seActualizoComentario = true;
    setTimeout(()=>{this.seActualizoComentario = false},3000)
  }
}

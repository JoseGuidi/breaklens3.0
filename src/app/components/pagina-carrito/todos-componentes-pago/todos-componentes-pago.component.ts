
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Institution } from '../../../interfaces/institution';
import { Pic } from '../../../interfaces/pic';
import { Folder } from '../../../interfaces/folder';
import { DataService } from '../../../services/PicsService/data.service';


@Component({
  selector: 'app-todos-componentes-pago',
  templateUrl: './todos-componentes-pago.component.html',
  styleUrls: ['./todos-componentes-pago.component.scss']
})
export class TodosComponentesPagoComponent {
  @Input() formDatos?:FormGroup;
  @Input() listadoItems?:{ f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[];
  @Input() entregaEnDomicilio?:boolean;
  @Input() entregaEnMail?:boolean;

  @Input() metodoPago?:String;
  @Input () costoEnvio?:any;
  @Output() volverAtras = new EventEmitter<any>();
  @Output() irAPagar = new EventEmitter<any>();
  imagenVertical:boolean = false;
  constructor(private _dataService:DataService){

  }

  getCostoEnvio(){
    if(this.entregaEnDomicilio && this.costoEnvio != '0'){
      return '$'+this.costoEnvio;
    }else{
      return 'Gratis'
    }
  }
  modificar(destino:String){
    this.volverAtras.emit(destino);
  }
  getElemento(pos:number) {
    if(this.listadoItems){
      return this.listadoItems[pos];
    }else{
      return null
    }
  }
  irAPagarCelular(){
    this.irAPagar.emit();
  }
}

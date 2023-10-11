import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from '../../../interfaces/folder';
import { Pic } from '../../../interfaces/pic';
import { Institution } from '../../../interfaces/institution';


@Component({
  selector: 'app-items-pago',
  templateUrl: './items-pago.component.html',
  styleUrls: ['./items-pago.component.scss']
})
export class ItemsPagoComponent {
  @Input() listadoItems: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[] = []
  @Input() entregaEnDomicilio?:boolean;
  @Output() avanzarPaso = new EventEmitter<any>();
  @Output() volverAtras = new EventEmitter<any>();
  getPrimero() {
    return this.listadoItems[0];
  }
  elegirMetodoPago(){
    this.avanzarPaso.emit();
  }
  volverEntrega(){
    this.listadoItems.forEach( (item)=>{
      item.d =false
    })
    this.volverAtras.emit('entrega');
  }
  entregarEnDomicilio(){
    return this.entregaEnDomicilio;
  }
}

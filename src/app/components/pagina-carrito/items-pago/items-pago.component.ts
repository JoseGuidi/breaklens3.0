import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';
import { Pic } from 'src/app/interfaces/pic';

@Component({
  selector: 'app-items-pago',
  templateUrl: './items-pago.component.html',
  styleUrls: ['./items-pago.component.scss']
})
export class ItemsPagoComponent {
  @Input() listadoItems: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[] = []
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
}

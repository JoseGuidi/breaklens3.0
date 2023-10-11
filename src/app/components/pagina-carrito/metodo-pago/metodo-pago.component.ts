import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.scss']
})
export class MetodoPagoComponent {
  @Output() eventEmmiter = new EventEmitter<any>()
  @Output() volverAtras = new EventEmitter<any>()
  formMetodoPago:FormGroup;
  sinElegir:boolean = false;
  constructor(private fb:FormBuilder){
    this.formMetodoPago = this.fb.group({
      pago:new FormControl('',[Validators.required])
    })
  }
  elegir(metodo:string){
    this.formMetodoPago.get('pago')?.setValue(metodo);
  }
  habilitarPagar(){
    if(this.formMetodoPago.valid){
      this.sinElegir = false;
      this.eventEmmiter.emit(this.formMetodoPago.value.pago);
    }else{
      this.sinElegir = true;
      setTimeout(()=>{
        this.sinElegir = false;
      },2000)
    }
  }
  volverResumen(){
    this.volverAtras.emit('resumen');
  }
}

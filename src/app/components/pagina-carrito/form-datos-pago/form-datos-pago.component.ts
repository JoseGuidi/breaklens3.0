import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';
import { Pic } from 'src/app/interfaces/pic';
import { CartService } from 'src/app/services/PicsService/cart.service';

@Component({
  selector: 'app-form-datos-pago',
  templateUrl: './form-datos-pago.component.html',
  styleUrls: ['./form-datos-pago.component.scss']
})
export class FormDatosPagoComponent {
  formDatos: FormGroup;
  ultimaInstitucion?:Institution;
  @Output() enviarDatos = new EventEmitter<any>();
  @Input() listadoItems: {f:Folder,p:Pic,i:Institution,q:Number,d:boolean}[] = [];
  constructor(private _router:Router, private _cartService:CartService){
    this.formDatos = new FormGroup({
      /*
      name: new FormControl('Jose', [Validators.required]),
      apellido: new FormControl('Guidi', [Validators.required]),
      email: new FormControl('joseguidi@gmail.com', [Validators.required, Validators.email]),
      cod_postal: new FormControl('7000', [Validators.required]),
      telefono: new FormControl('249498570', [Validators.required]),
      direc_calle: new FormControl('Colombia', [Validators.required]),
      direc_numero: new FormControl('721', [Validators.required]),
      direc_piso: new FormControl(''),*/
      name: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cod_postal: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      direc_calle: new FormControl('', [Validators.required]),
      direc_numero: new FormControl('', [Validators.required]),
      direc_piso: new FormControl(''),
    });
    this._cartService.carrito.subscribe(
      (ins) => {
        this.ultimaInstitucion= ins[ins.length-1].i;
        }
    );
  }
  enviarDatosForm(){
    if(this.formDatos.valid){
      this.enviarDatos.emit(this.formDatos);
    }else{

      if (this.formDatos.invalid) {
        Object.values(this.formDatos.controls).forEach(control => {
          control.markAsTouched();
        });
        return;
      }
    }
  }


}

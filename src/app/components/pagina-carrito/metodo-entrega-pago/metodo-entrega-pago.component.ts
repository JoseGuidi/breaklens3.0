import { DataService } from './../../../services/PicsService/data.service';
import { DomicilioClass } from './../../../class/domicilio';
import { Institution } from './../../../interfaces/institution';
import { Pic } from './../../../interfaces/pic';
import { Folder } from './../../../interfaces/folder';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-metodo-entrega-pago',
  templateUrl: './metodo-entrega-pago.component.html',
  styleUrls: ['./metodo-entrega-pago.component.scss']
})
export class MetodoEntregaPagoComponent {
  @Output() lugarEntrega = new EventEmitter<any>();
  @Output() volverAtras = new EventEmitter<any>();
  @Input() formDatos:FormGroup | undefined;
  @Input()listadoItems?: { f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[]
  formMetodo: FormGroup;
  listaDomicilios : DomicilioClass[] = [];
  costoEnvio: String = '';
  sinElegir:boolean=false;
  constructor(private _dataService:DataService, private fb: FormBuilder){

    this._dataService.obtenerDatosEnvio('7000').subscribe(envio =>{
      /*this.listaDomicilios = [
        {
            "calle": "COlombia",
            "numero": 721,
            "descr": "Enviar a domicilio",
            "costoEnvio": "500"
        },
        {
            "calle": "Cuba",
            "numero": 1498,
            "descr": "Retiro en sucursal",
            "costoEnvio": "Gratis"
        }
    ]*/
      if(envio.costo == 0){
        this.costoEnvio = 'Gratis'
      }else{
        this.costoEnvio = envio.costo;
      }
      this.cargarListadoDomicilio();
    })
    this.formMetodo = this.fb.group({
      metodo:new FormControl('',[Validators.required])
    })
  }
  private cargarListadoDomicilio() {
    if(this.formDatos){
      let domicilio;
      let calle = this.formDatos.value.direc_calle;
      let numero = this.formDatos.value.direc_numero;
      let piso = this.formDatos.value.direc_piso;
      if(piso){
        domicilio = new DomicilioClass(calle,numero,"Enviar a domicilio",this.costoEnvio,piso)
      }else{
        domicilio = new DomicilioClass(calle,numero,"Enviar a domicilio",this.costoEnvio)
      }
      this.listaDomicilios = [domicilio, new DomicilioClass("Cuba",1498,"Retiro en sucursal","Gratis")]

    }
  }

  eligioMetodo(){
    if(this.formMetodo.valid){
      this.lugarEntrega.emit(this.formMetodo);
      this.sinElegir = false;
    }else{
      this.sinElegir = true;
      setTimeout(()=>{
        this.sinElegir = false;
      },2000)
    }
  }

  getElement(pos:number){
    return this.listaDomicilios[pos];
  }
  getCostoEnvio(env:String){
    if(env != 'Gratis'){
      return '$'+env;
    }else{
      return env
    }
  }
  volverFormulario(){
    this.volverAtras.emit('datos');
  }

  elegir(item:DomicilioClass){
      let calle = item.calle;
      let numero = item.numero
      let piso = item.piso;
      if(piso){
        this.formMetodo.get('metodo')?.setValue(calle+'-'+numero+'-'+piso);
      }else{
        this.formMetodo.get('metodo')?.setValue(calle+'-'+numero+'-');
      }
  }
  esLaSeleccionada(item:DomicilioClass){
    let calle = item.calle;
    let numero = item.numero
    let piso = item.piso;
    if(piso){
      return calle+'-'+numero+'-'+piso == this.formMetodo.value.metodo;
    }else{
      return calle+'-'+numero+'-' == this.formMetodo.value.metodo;
    }
  }
}

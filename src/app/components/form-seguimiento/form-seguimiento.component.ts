import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Payment } from 'src/app/interfaces/payment';
import { DataService } from 'src/app/services/PicsService/data.service';

@Component({
  selector: 'app-form-seguimiento',
  templateUrl: './form-seguimiento.component.html',
  styleUrls: ['./form-seguimiento.component.scss'],
})
export class FormSeguimientoComponent {
  pagoBuscado:any;
  esTransferencia:boolean = false;
  infoPagoBuscado:any;
  mostrarPopUp:boolean = false
  codigoErroneo: boolean = false;
  constructor(private dataService: DataService) {}
  codigo = new FormControl('');
  cargando:boolean=false;
  buscarPago(event: any) {
    event.preventDefault();
    if (this.codigo != null && this.codigo.value) {
      /* id de mp o id de transferencia */
      /* 60646156751*/
      this.cargando = true;
      if(this.codigo.value.startsWith('TR')||this.codigo.value.startsWith('tr')||this.codigo.value.startsWith('tR')||this.codigo.value.startsWith('Tr')){
        this.esTransferencia = true;
        this.dataService.obtenerTranferencia(this.codigo.value.substring(2)).subscribe( (info_tr)=>{
          setTimeout( () =>{
            this.cargando =false;
            if(!info_tr){
              this.codigoErroneo = true
            }else{
              this.codigoErroneo =false
              this.pagoBuscado = info_tr
              this.mostrarPopUp = true
            }
          })
        })
    }else{
      this.esTransferencia = false
      this.dataService.getPaymentsMP(this.codigo.value).subscribe((info_p) => {
        setTimeout( () => {
          this.cargando = false
          if (!info_p.id) {
            // TO DO
            this.codigoErroneo = true
            setTimeout(() => {this.codigoErroneo = false},3000)
          }else{
            this.pagoBuscado = info_p;
            this.mostrarPopUp = true;
            this.codigoErroneo =false;
            
          }
        },1500)
        


      },);
    }
    }
  }
  closePopUp(){
    this.mostrarPopUp = false;
  }
  cerrarError(){
    this.codigoErroneo = false;
  }
  getEstadoPedido(){
    let estado = '';
    if(this.pagoBuscado.payment_status === 'approved'){
      if(this.pedidoEntregado()){
        estado = 'enviado'
      }else{
        estado = 'aprobado'
      }
    }else if(this.pagoBuscado.payment_status === 'pending'){
        estado = 'pendiente'
      
    }else if(this.pagoBuscado.payment_status === 'rejected'){
      estado = 'rechazado'
    }else if(this.pagoBuscado.payment_status === 'cancelled'){
      estado = 'cancelado'
    }
    return estado;
  }
  getDescripcionPedido(){
    let desc = '';
    return this.pagoBuscado.description
  }
  getEmailPedido(){
    return this.pagoBuscado.email
  }
  pedidoRealizado(){
    return this.pagoBuscado !== null;
  }
  pagoConfirmado(){
    return this.pagoBuscado.payment_status === 'approved';
  }
  pedidoListo(){
    return this.pagoBuscado.order_status === 'listo'
  }
  pedidoEntregado(){
    return this.pagoBuscado.order_status === 'entregado'
  }
  noCerrarPopUp(){

  }
  
}

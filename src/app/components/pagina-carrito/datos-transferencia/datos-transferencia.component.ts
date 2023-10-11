import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';
import { Pic } from 'src/app/interfaces/pic';
import { DataService } from 'src/app/services/PicsService/data.service';

@Component({
  selector: 'app-datos-transferencia',
  templateUrl: './datos-transferencia.component.html',
  styleUrls: ['./datos-transferencia.component.scss']
})
export class DatosTransferenciaComponent {
  @Input() envio?:number;
  @Input() items?:{ f: Folder; p: Pic; i: Institution; q: Number; d: boolean }[];
  @Input() orderID?:String;
  momentoDePago?:string;
  cvu:string = '';
  alias:string=''
  cvuCopiado:boolean = false
  aliasCopiado:boolean=false
  constructor(private _router: Router,private _dataService: DataService){
    this._dataService.obtenerDatosExtras().subscribe((data) => {
      this.alias = data.alias;
      this.cvu = data.cbu;
    });
  }
  getMontoTotal(){
    let total = 0;
    this.items?.forEach( item =>{
      total += item.f.precio.valueOf() * item.q.valueOf();
      if(item.d){
        total+= item.f.digital.valueOf();
      }
    })
    if(this.envio){
      
    total+= this.envio;
    }
    return total
  }

  copiarCVU(cvu:string){
    navigator.clipboard.writeText(this.cvu);
    this.cvuCopiado = true;
    setTimeout(() => {
      this.cvuCopiado = false;
    }, 1500);
  }
  copiarAlias(alias:string){
    navigator.clipboard.writeText(this.alias);
    this.aliasCopiado = true;
    setTimeout(() => {
      this.aliasCopiado = false;
    }, 1500);
  }
  redirigirHome(){
    setTimeout(() => {
      this._router.navigate(['/inicio']);
    }, 1000);
  }
}

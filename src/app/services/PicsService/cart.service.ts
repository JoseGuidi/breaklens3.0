import { Institution } from './../../interfaces/institution';
import { Folder } from './../../interfaces/folder';
import { Injectable } from '@angular/core';
import { Pic } from '../../interfaces/pic';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _carrito:{f:Folder,p:Pic,i:Institution,q:Number,d:boolean}[] = [];
  private _subjectCarrito:BehaviorSubject<{f:Folder,p:Pic,i:Institution,q:Number,d:boolean}[]> = new BehaviorSubject(this._carrito);
  public carrito:Observable<{f:Folder,p:Pic,i:Institution,q:Number,d:boolean}[]> = this._subjectCarrito.asObservable();

  private _visibilidadCarrito:boolean = false;
  private _subjectVisibilidad:BehaviorSubject<boolean> = new BehaviorSubject(this._visibilidadCarrito);
  public visibilidadCarrito:Observable<boolean> = this._subjectVisibilidad.asObservable();
  constructor() { }

  actualizarCarrito(f:Folder,p:Pic,i:Institution,q:Number,d:boolean) {

    let elem = this._carrito.find(e => e.p.id_foto === p.id_foto && e.f.nombre === f.nombre);
    if(elem){
      elem.q = elem.q.valueOf() + q.valueOf()

    }else{
      this._carrito.push({f,p,i,q,d});
    }
  }
  vaciarCarrito(){
    this._carrito = [];
    this._subjectCarrito.next(this._carrito);
  }
  borrarElemento(item:{ f: Folder; p: Pic;i:Institution,q:Number }){
    let indiceBuscado = this._carrito.findIndex(e => (e.p.id_foto === item.p.id_foto && e.f.nombre === item.f.nombre))
    this._carrito.splice(indiceBuscado,1);
  }

  cambiarVisbilidad(){
    this._visibilidadCarrito = !this._visibilidadCarrito;
    this._subjectVisibilidad.next(this._visibilidadCarrito);
  }
  agregarDigitalDeFoto(f:Folder,p:Pic,i:Institution,q:Number,d:boolean){
    let elem = this._carrito.find(e => e.p.id_foto === p.id_foto && e.f.id_carpeta === f.id_carpeta);
    if(elem){
      elem.d = d
    }
  }
}

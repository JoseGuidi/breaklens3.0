import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/pic';
import { Institution } from 'src/app/interfaces/institution';
import { Folder } from 'src/app/interfaces/folder';
import { FolderClass } from 'src/app/class/FolderClass';
import { Payment } from 'src/app/interfaces/payment';
const URL = 'https://breaklens.com/api/';
const URL_LOCAL = 'https://localhost/trabajos/breaklens/api-proyecto/api/';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPics(code: String,page:number,limit:number): Observable<Pic[]> {
    if(limit !== 0)
    return this.http.get<Pic[]>(URL + 'pic/' + code+'?page='+page+'&limit='+limit)
  else{
    return this.http.get<Pic[]>(URL + 'pic/' + code)

  }
  }

  // A CAMBIAR
  getInfoInstitution(code: String): Observable<Institution> {
    return this.http.get<Institution>(URL + 'institution/' + code);
  }

  getFolders(code: String): Observable<Folder[]> {
    return this.http.get<Folder[]>(URL + 'folder/' + code);
  }

  getPaymentsMP(code: String): Observable<Payment> {
    return this.http.get<Payment>(URL + 'payment_db/' + code);
  }

  createTransfer(
    desc: string,
    titDB: string,
    price: number,
    name: string,
    email: string,
    surname: string,
    telefono: string
  ) {
    let obj = {
      'price':price,
      'nombre':name,
      'apellido':surname,
      'email':email,
      'telefono':telefono,
      'tituloDB':titDB,
      'descripcion':desc
    }
    this.http.post(URL + 'transfer',obj);
  }
  obtenerTranferencia(id:String):Observable<Payment>{
    return this.http.get<Payment>(URL + 'transfer/' +id);
  }
  obtenerDatosExtras():Observable<any>{
    return this.http.get(URL+'extras')
  }
  obtenerDatosEnvio(id:string):Observable<any>{
    return this.http.get(URL+'envio/'+id)
  }
}

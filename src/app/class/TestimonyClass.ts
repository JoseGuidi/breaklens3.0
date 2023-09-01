export class Testimony{
    nombre:String;
    foto:String;
    estrellas:number;
    mensaje:String;
    constructor (n:String,f:String,m:String,e:number){
        this.nombre = n;
        this.foto = f;
        this.estrellas = e
        this.mensaje = m;
    }
}
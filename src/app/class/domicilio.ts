export class DomicilioClass{
    calle: String;
    numero:Number;
    piso?:String;
    descr:String;
    costoEnvio:String;
  constructor(call:String,num:Number,desc:String,costoEnvi:String,pi?:String){
    this.calle = call;
    this.numero = num;
    this.piso = pi;
    this.descr = desc;
    this.costoEnvio = costoEnvi;
  } 
}
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/PicsService/data.service';

@Component({
  selector: 'app-form-institucion',
  templateUrl: './form-institucion.component.html',
  styleUrls: ['./form-institucion.component.scss']
})
export class FormInstitucionComponent {
  error:boolean = false;
  modoContrasenia:String = 'password';
  constructor(private _dataService:DataService,private router:Router,private paramsRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    
  }
  codigo = new FormControl('');
  searchPics(event:Event){
    event.preventDefault();
    if(this.codigo != null && this.codigo.value){
      this._dataService.getInfoInstitution(this.codigo.value).subscribe(
        info_inst =>{
        this.router.navigate(['galeria/'+info_inst.cod_institucion])
        },
        err => {this.error = true 
          setTimeout(() => {this.error = false},3000)
        }
      );
      
    }
  }
  cambiarVisibilidadCodigo(){
    if(this.modoContrasenia === 'password'){
      this.modoContrasenia = 'text'
    }else{
      this.modoContrasenia = 'password'
    }
  }
  cerrarError(){
    this.error = false;
  }
 
}

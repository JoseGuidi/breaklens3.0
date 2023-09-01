import { Component, Input } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';
import { Institution } from 'src/app/interfaces/institution';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss']
})
export class FolderCardComponent{
  @Input() carpetaReferida?:Folder
  @Input() isSelected:boolean = false;
  @Input()institucion?:Institution;
  getCopiasIndividuales():Number{
    if(this.carpetaReferida){
      return this.carpetaReferida.individual.valueOf() - 1
    }else{
      return 0;
    }
  }
  tieneIndividualExtra(){
    if(this.carpetaReferida)
      return this.carpetaReferida?.individual.valueOf() > 1;
    return false
  }
  getIndividualesExtras(){
    if(this.carpetaReferida)
      return this.carpetaReferida?.individual.valueOf() - 1;
    return  0;
  }
  getMedidas(m:number){
    if(m === 13){
      return this.carpetaReferida?.nombre === 'Pack Basico' || this.carpetaReferida?.nombre === 'Pack Super'  
    }else{
      return this.carpetaReferida?.nombre === 'Pack Clasico' || this.carpetaReferida?.nombre === 'Pack Premium'  

    }
  }
}

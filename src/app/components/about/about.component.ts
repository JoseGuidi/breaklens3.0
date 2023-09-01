import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  mayor800:boolean = false;

  ngOnInit() {
    if (window.matchMedia('(min-width: 800px)').matches) {
      this.mayor800 = true
    }else{
      this.mayor800 = false;
    }
  }
  onResize(event:any) {
    if(event.target.innerWidth >= 800){
      this.mayor800= true
    }else{
      this.mayor800=false
    }
  }

}

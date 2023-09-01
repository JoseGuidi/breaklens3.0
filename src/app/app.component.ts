import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto-fotografias';
  carritoVisible: boolean = false;

  toggleMostrarCarrito() {
    this.carritoVisible = !this.carritoVisible;
  }
}

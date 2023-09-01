import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CarritoPageComponent } from './components/carrito-page/carrito-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';

const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path:'galeria/:codigo',component:GalleryComponent},
    {path:'carrito',component:CarritoPageComponent},
    {path: 'pago',component:PaymentPageComponent},
    { path: '**', redirectTo: 'inicio' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

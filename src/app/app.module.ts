import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { FormInstitucionComponent } from './components/form-institucion/form-institucion.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CardPicComponent } from './components/card-pic/card-pic.component';
import { FolderCardComponent } from './components/folder-card/folder-card.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule,NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { CarritoPageComponent } from './components/carrito-page/carrito-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormCompraComponent } from './components/form-compra/form-compra.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { FormSeguimientoComponent } from './components/form-seguimiento/form-seguimiento.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { AboutComponent } from './components/about/about.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { OpinionesComponent } from './components/opiniones/opiniones.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { NavbarCheckpointComponent } from './components/navbar-checkpoint/navbar-checkpoint.component';
import { TestimonyCardComponent } from './components/testimony-card/testimony-card.component';
import { LoaderSeguimientoComponent } from './components/loader-seguimiento/loader-seguimiento.component';

import { InfoExtraComponent } from './components/info-extra/info-extra.component';
import { NgOptimizedImage } from '@angular/common';
import { SeccionFotosComponent } from './seccion-fotos/seccion-fotos.component';
import { FormDatosPagoComponent } from './components/pagina-carrito/form-datos-pago/form-datos-pago.component';
import { ItemsPagoComponent } from './components/pagina-carrito/items-pago/items-pago.component';
import { MetodoEntregaPagoComponent } from './components/pagina-carrito/metodo-entrega-pago/metodo-entrega-pago.component';
import { MetodoPagoComponent } from './components/pagina-carrito/metodo-pago/metodo-pago.component';
import { ResumenPagoComponent } from './components/pagina-carrito/resumen-pago/resumen-pago.component';
import { TodosComponentesPagoComponent } from './components/pagina-carrito/todos-componentes-pago/todos-componentes-pago.component';
import { DatosTransferenciaComponent } from './components/pagina-carrito/datos-transferencia/datos-transferencia.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FormInstitucionComponent,
    GalleryComponent,
    CardPicComponent,
    FolderCardComponent,
    CartComponent,
    CarritoPageComponent,
    LoadingComponent,
    FormCompraComponent,
    FooterComponent,
    PaymentPageComponent,
    FormSeguimientoComponent,
    TutorialComponent,
    AboutComponent,
    BreadcrumbComponent,
    OpinionesComponent,
    CartItemComponent,
    NavbarCheckpointComponent,
    TestimonyCardComponent,
    LoaderSeguimientoComponent,
    InfoExtraComponent,
    SeccionFotosComponent,
    FormDatosPagoComponent,
    ItemsPagoComponent,
    MetodoEntregaPagoComponent,
    MetodoPagoComponent,
    ResumenPagoComponent,
    TodosComponentesPagoComponent,
    DatosTransferenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pic } from 'src/app/interfaces/pic';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/PicsService/data.service';
import { Institution } from 'src/app/interfaces/institution';
import { Folder } from 'src/app/interfaces/folder';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { CartService } from 'src/app/services/PicsService/cart.service';
import { FolderClass } from 'src/app/class/FolderClass';
import { LoadingService } from 'src/app/services/PicsService/loading.service';
import { HostListener, ElementRef, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';
import { DeviceService } from 'src/app/services/PicsService/device.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  listaCarpetas: Folder[] = [] /*[
    new FolderClass('Individual', 2000, 1, 0),
    new FolderClass('Completa', 2500, 1, 1),
    new FolderClass('Plus', 2900, 2, 1),
    new FolderClass('Gold', 3500, 4, 1),
  ]*/;
  listaFotos: Pic[] = [];
  listaContenedores: any[] = [];
  institucion?: Institution;
  institucionVacia: boolean = false;
  carritoVisible: boolean = false;
  carpetaElegida?: Folder;
  primeraVez: boolean = true;
  cargando: boolean = false;
  llegoFooter: boolean = false;
  cargandoNuevasFotos:boolean = false;
  currentPage:number = 0;
  cargandoFotos:boolean = false;
  cargoTodasFotos:boolean = false;
  cantidadTotalesFotos:number = 0;
  @ViewChild('galeriaFlex') galeriaFlex: ElementRef | undefined;
  constructor(
    private _dataService: DataService,
    private url: ActivatedRoute,
    private router: Router,
    private _cartService: CartService,
    private detectorRef: ChangeDetectorRef,
    private _loadingState: LoadingService,
    private _deviceService: DeviceService
  ) {}
  ngOnInit(): void {
    this.cargando = true;
    if (this._deviceService.isIphone()) {
      this._deviceService.setZoomTo100();
    }
    let codigo = this.url.snapshot.paramMap.get('codigo');
    this._loadingState.cambiarEstadoLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.cargando = false;
      
    }, 2000);
    if (codigo) {
      this._dataService.getFolders(codigo).subscribe((carpetas) => {
        if (typeof carpetas !== 'string') {
          this.listaCarpetas = carpetas;
          //this.cargando = false;
        }
      });
      this.cargandoFotos = true;
      setTimeout(()=>{
        this.cargandoFotos = false;
        this.cargoInicio = true;
      },5000) // son 2000 del primer cargando y 3000 de este
      if(codigo)
        this._dataService.getPics(codigo,this.currentPage,30).subscribe(
          (fotos) => {
            if (typeof fotos === 'string') {
              this.institucionVacia = true;
            }
            this.listaContenedores.push(fotos);
            console.log(this.listaContenedores)
            if (codigo) {
              this._dataService.getInfoInstitution(codigo).subscribe((ins) => {
                this.institucion = ins;
              });
            }
            this._loadingState.cambiarEstadoLoading(false);
            //this.cargando = false;
          },
          (error) => {
            this.router.navigate(['inicio']);
            this._loadingState.cambiarEstadoLoading(false);
          }
        );
        this._dataService.getCantidadPics(codigo).subscribe((cant)=>{
          this.cantidadTotalesFotos = cant.total;
        })
    }
  }

  getCantidadPaginasTotales(){
    return Math.ceil(this.cantidadTotalesFotos/30);
  }
  cambiarVisibilidadCarrito() {
    this.primeraVez = false;
    this._cartService.cambiarVisbilidad();
    this._cartService.visibilidadCarrito.subscribe(
      (vis) => (this.carritoVisible = vis)
    );

  }
  cerrarCarrito() {
    this.primeraVez = false;
    if (this.carritoVisible) {
      this.cambiarVisibilidadCarrito;
    }
  }
  seleccionarCarpeta(carpetaElegida: Folder) {
    this.carpetaElegida = carpetaElegida;

      let section = document.querySelector('.foto_grupal');
    if (section) {
      let variable = section.getBoundingClientRect().top + window.scrollY + 300;
      window.scrollTo({ top: variable, behavior: 'smooth' });
    }else{
      section = document.querySelector('.contenedor_galeria');
      if(section){
      let variable = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: variable, behavior: 'smooth' });
      }
    }
  }
  agregarFotoCarrito(fotoAgregada: Pic) {
    this.primeraVez = true;
    if (this.carpetaElegida && this.institucion) {
      this._cartService.actualizarCarrito(
        this.carpetaElegida,
        fotoAgregada,
        this.institucion,
        1,
        false
      );
      this.carpetaElegida = undefined;
      if (!this.carritoVisible) {
        this.cambiarVisibilidadCarrito();
      }
    } else if (!this.carpetaElegida) {
      this.scrollTo('#arriba');
    }
  }

  ngAfterViewChecked(): void {
    this.detectorRef.detectChanges();
  }
  private scrollTo(id: string) {
    let section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  prohibirDescarga(event: any) {
    event.preventDefault();
  }
  getLengthCarrito(): number {
    let cant = 0;
    this._cartService.carrito.subscribe((cart) => {
      cant = cart.length;
    });
    return cant;
  }




  private lastScrollPosition = 0;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {


  }

  getPicsForColumn(col:number){
    let arr:any = [];
    let length = this.listaFotos.length
    let pics_x_col = Math.floor(length/4) + 1;
    let inicio = col*pics_x_col;
    let fin = inicio+pics_x_col;
    this.listaFotos.forEach((item,index) => {
      if(index >= inicio && index < fin){
        arr.push(item);
      }
    })
    return arr;
  }

  loadMore(){
    this.currentPage++;
    let codigo = this.url.snapshot.paramMap.get('codigo');
    if(codigo && !this.cargoTodasFotos){
      console.log(this.cargoTodasFotos)
      
      setTimeout(()=>{
        this.cargandoNuevasFotos = false;

      },5000) 
      this._dataService.getPics(codigo,this.currentPage,30).subscribe((f: any[])=>{
        if(typeof f !== 'string' && f.length > 0){
         
          this.listaContenedores.push(f)
        }else{
          this.currentPage--;
          this.cargoTodasFotos = true
        }
      })
    }
  }
  size(arr:[]){
    return arr.length;
  }
  cargoInicio:boolean = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    
    if(this.cargoInicio){
      if(this.isBottom() &&  !this.cargoTodasFotos){
        this.cargandoNuevasFotos = true;
        this.loadMore();
        
      }
    }
  }
  isBottom(){
    let alturaGaleria = this.galeriaFlex?.nativeElement.offsetHeight;
    //console.log(window.innerHeight + window.scrollY,document.body.offsetHeight,alturaGaleria)
    return (window.innerHeight + window.scrollY) >= alturaGaleria;
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

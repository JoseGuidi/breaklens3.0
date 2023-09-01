import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  
  private isLoading:boolean = false;
  private subjectisLoading:BehaviorSubject<boolean> = new BehaviorSubject(this.isLoading);
  public loading:Observable<boolean> = this.subjectisLoading.asObservable();

  getEstadoLoading():Observable<boolean>{
    return this.loading;
  }
  cambiarEstadoLoading(b:boolean ){
    this.isLoading = b;
    this.subjectisLoading.next(this.isLoading);
  }
}

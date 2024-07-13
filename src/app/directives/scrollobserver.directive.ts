import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appScrollObserver]'
})
export class ScrollObserverDirective implements OnInit, OnDestroy {
  @Output() scrolledToEnd = new EventEmitter<void>();
  private observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
      console.log('Scrolled to the end');
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('Scrolled to the end');
        this.scrolledToEnd.emit();
      }
    }, {
      root: null, // el viewport
      threshold: 1.0 // el umbral de visibilidad (1.0 significa que todo el elemento es visible)
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

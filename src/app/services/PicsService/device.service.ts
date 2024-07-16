import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  isIphone(): boolean {
    return /iPhone/.test(navigator.userAgent);
  }

  setZoomTo100(): void {
    this.renderer.setStyle(document.documentElement, 'zoom', '100%');
  }
}

import { Component, ViewChild } from '@angular/core';
import { NbScrollComponent } from './nb-scroll/nb-scroll.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'next-scroll';
  @ViewChild(NbScrollComponent, { static: false }) nbscroll: NbScrollComponent;
  refresh() {
    this.nbscroll.refresh();
  }
}

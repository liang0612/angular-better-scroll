import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbScrollComponent } from './nb-scroll.component';

describe('NbScrollComponent', () => {
  let component: NbScrollComponent;
  let fixture: ComponentFixture<NbScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

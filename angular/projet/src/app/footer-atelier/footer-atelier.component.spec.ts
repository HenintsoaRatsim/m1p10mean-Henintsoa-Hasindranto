import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAtelierComponent } from './footer-atelier.component';

describe('FooterAtelierComponent', () => {
  let component: FooterAtelierComponent;
  let fixture: ComponentFixture<FooterAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterAtelierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

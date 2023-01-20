import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFinancierComponent } from './footer-financier.component';

describe('FooterFinancierComponent', () => {
  let component: FooterFinancierComponent;
  let fixture: ComponentFixture<FooterFinancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterFinancierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureFicheComponent } from './facture-fiche.component';

describe('FactureFicheComponent', () => {
  let component: FactureFicheComponent;
  let fixture: ComponentFixture<FactureFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

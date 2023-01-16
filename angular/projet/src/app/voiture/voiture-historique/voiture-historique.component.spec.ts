import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureHistoriqueComponent } from './voiture-historique.component';

describe('VoitureHistoriqueComponent', () => {
  let component: VoitureHistoriqueComponent;
  let fixture: ComponentFixture<VoitureHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

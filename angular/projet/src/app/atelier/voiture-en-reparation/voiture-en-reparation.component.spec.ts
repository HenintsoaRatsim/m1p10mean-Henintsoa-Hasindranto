import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureEnReparationComponent } from './voiture-en-reparation.component';

describe('VoitureEnReparationComponent', () => {
  let component: VoitureEnReparationComponent;
  let fixture: ComponentFixture<VoitureEnReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureEnReparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureEnReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

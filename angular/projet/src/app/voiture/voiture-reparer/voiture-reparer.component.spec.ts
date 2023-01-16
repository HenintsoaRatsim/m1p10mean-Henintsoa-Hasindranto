import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureReparerComponent } from './voiture-reparer.component';

describe('VoitureReparerComponent', () => {
  let component: VoitureReparerComponent;
  let fixture: ComponentFixture<VoitureReparerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureReparerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureReparerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

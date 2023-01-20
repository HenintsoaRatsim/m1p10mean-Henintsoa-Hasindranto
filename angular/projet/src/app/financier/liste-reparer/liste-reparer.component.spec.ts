import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReparerComponent } from './liste-reparer.component';

describe('ListeReparerComponent', () => {
  let component: ListeReparerComponent;
  let fixture: ComponentFixture<ListeReparerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeReparerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeReparerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

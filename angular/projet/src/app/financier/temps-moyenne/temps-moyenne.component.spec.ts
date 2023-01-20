import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsMoyenneComponent } from './temps-moyenne.component';

describe('TempsMoyenneComponent', () => {
  let component: TempsMoyenneComponent;
  let fixture: ComponentFixture<TempsMoyenneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempsMoyenneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempsMoyenneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

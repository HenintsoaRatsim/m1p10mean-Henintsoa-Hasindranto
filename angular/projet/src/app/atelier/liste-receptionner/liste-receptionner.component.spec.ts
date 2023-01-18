import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReceptionnerComponent } from './liste-receptionner.component';

describe('ListeReceptionnerComponent', () => {
  let component: ListeReceptionnerComponent;
  let fixture: ComponentFixture<ListeReceptionnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeReceptionnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeReceptionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

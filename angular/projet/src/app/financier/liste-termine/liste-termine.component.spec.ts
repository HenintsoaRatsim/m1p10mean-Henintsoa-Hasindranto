import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTermineComponent } from './liste-termine.component';

describe('ListeTermineComponent', () => {
  let component: ListeTermineComponent;
  let fixture: ComponentFixture<ListeTermineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTermineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

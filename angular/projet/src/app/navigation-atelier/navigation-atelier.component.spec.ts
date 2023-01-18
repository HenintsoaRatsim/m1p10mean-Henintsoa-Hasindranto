import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationAtelierComponent } from './navigation-atelier.component';

describe('NavigationAtelierComponent', () => {
  let component: NavigationAtelierComponent;
  let fixture: ComponentFixture<NavigationAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationAtelierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

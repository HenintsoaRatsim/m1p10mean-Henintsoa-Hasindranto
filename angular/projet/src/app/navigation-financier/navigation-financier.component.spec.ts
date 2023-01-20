import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationFinancierComponent } from './navigation-financier.component';

describe('NavigationFinancierComponent', () => {
  let component: NavigationFinancierComponent;
  let fixture: ComponentFixture<NavigationFinancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationFinancierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFinancierComponent } from './sidebar-financier.component';

describe('SidebarFinancierComponent', () => {
  let component: SidebarFinancierComponent;
  let fixture: ComponentFixture<SidebarFinancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarFinancierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

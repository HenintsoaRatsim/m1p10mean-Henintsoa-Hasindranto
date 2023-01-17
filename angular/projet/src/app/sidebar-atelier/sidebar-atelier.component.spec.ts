import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAtelierComponent } from './sidebar-atelier.component';

describe('SidebarAtelierComponent', () => {
  let component: SidebarAtelierComponent;
  let fixture: ComponentFixture<SidebarAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAtelierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

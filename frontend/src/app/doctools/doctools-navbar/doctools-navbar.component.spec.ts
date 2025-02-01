import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoolsNavbarComponent } from './doctools-navbar.component';

describe('DoctoolsNavbarComponent', () => {
  let component: DoctoolsNavbarComponent;
  let fixture: ComponentFixture<DoctoolsNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctoolsNavbarComponent]
    });
    fixture = TestBed.createComponent(DoctoolsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenVisitComponent } from './open-visit.component';

describe('OpenVisitComponent', () => {
  let component: OpenVisitComponent;
  let fixture: ComponentFixture<OpenVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

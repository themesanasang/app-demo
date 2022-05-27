import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdDetailComponent } from './opd-detail.component';

describe('OpdDetailComponent', () => {
  let component: OpdDetailComponent;
  let fixture: ComponentFixture<OpdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

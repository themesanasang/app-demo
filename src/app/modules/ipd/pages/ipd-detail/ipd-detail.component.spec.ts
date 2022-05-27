import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdDetailComponent } from './ipd-detail.component';

describe('IpdDetailComponent', () => {
  let component: IpdDetailComponent;
  let fixture: ComponentFixture<IpdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

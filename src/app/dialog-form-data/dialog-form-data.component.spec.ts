import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormDataComponent } from './dialog-form-data.component';

describe('DialogFormDataComponent', () => {
  let component: DialogFormDataComponent;
  let fixture: ComponentFixture<DialogFormDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

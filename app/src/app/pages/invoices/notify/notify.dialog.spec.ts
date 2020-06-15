import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyDialog } from './notify.dialog';

describe('NotifyDialog', () => {
  let component: NotifyDialog;
  let fixture: ComponentFixture<NotifyDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

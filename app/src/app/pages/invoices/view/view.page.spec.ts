import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoicePage } from './view.page';

describe('ViewInvoicePage', () => {
  let component: ViewInvoicePage;
  let fixture: ComponentFixture<ViewInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInvoicePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

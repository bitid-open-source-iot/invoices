import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEditorPage } from './editor.page';

describe('InvoiceEditorPage', () => {
  let component: InvoiceEditorPage;
  let fixture: ComponentFixture<InvoiceEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

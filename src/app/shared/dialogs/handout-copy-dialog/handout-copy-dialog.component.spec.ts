import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoutCopyDialogComponent } from './handout-copy-dialog.component';

describe('HandoutCopyDialogComponent', () => {
  let component: HandoutCopyDialogComponent;
  let fixture: ComponentFixture<HandoutCopyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandoutCopyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandoutCopyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

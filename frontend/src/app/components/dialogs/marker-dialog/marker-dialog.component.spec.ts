import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDialogComponent } from './marker-dialog.component';

describe('AddMarkerDialogComponent', () => {
  let component: MarkerDialogComponent;
  let fixture: ComponentFixture<MarkerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

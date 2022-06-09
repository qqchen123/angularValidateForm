import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyhomeEditComponent } from './edit.component';

describe('MyhomeEditComponent', () => {
  let component: MyhomeEditComponent;
  let fixture: ComponentFixture<MyhomeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhomeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhomeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

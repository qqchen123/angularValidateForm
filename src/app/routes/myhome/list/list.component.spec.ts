import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyhomeListComponent } from './list.component';

describe('MyhomeListComponent', () => {
  let component: MyhomeListComponent;
  let fixture: ComponentFixture<MyhomeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhomeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

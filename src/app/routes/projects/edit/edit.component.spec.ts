import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsEditComponent } from './edit.component';

describe('ProjectsEditComponent', () => {
  let component: ProjectsEditComponent;
  let fixture: ComponentFixture<ProjectsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

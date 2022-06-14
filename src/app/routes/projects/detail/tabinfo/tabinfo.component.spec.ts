import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsTabinfoComponent } from './tabinfo.component';

describe('ProjectsTabinfoComponent', () => {
  let component: ProjectsTabinfoComponent;
  let fixture: ComponentFixture<ProjectsTabinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsTabinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTabinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

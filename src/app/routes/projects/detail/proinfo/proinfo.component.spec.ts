import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsProinfoComponent } from './proinfo.component';

describe('ProjectsProinfoComponent', () => {
  let component: ProjectsProinfoComponent;
  let fixture: ComponentFixture<ProjectsProinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsProinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsProinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

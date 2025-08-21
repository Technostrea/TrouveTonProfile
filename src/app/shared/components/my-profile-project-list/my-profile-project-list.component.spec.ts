import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileProjectListComponent } from './my-profile-project-list.component';

describe('MyProfileProjectListComponent', () => {
  let component: MyProfileProjectListComponent;
  let fixture: ComponentFixture<MyProfileProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfileProjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProfileProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

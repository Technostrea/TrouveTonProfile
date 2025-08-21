import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileProjectItemComponent } from './my-profile-project-item.component';

describe('MyProfileProjectItemComponent', () => {
  let component: MyProfileProjectItemComponent;
  let fixture: ComponentFixture<MyProfileProjectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfileProjectItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProfileProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

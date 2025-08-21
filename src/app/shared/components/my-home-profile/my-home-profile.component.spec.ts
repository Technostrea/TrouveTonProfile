import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHomeProfileComponent } from './my-home-profile.component';

describe('MyHomeProfileComponent', () => {
  let component: MyHomeProfileComponent;
  let fixture: ComponentFixture<MyHomeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHomeProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyHomeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

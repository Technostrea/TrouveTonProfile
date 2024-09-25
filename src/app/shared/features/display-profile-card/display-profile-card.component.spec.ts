import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProfileCardComponent } from './display-profile-card.component';

describe('DisplayProfileCardComponent', () => {
  let component: DisplayProfileCardComponent;
  let fixture: ComponentFixture<DisplayProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

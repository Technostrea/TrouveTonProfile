import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalProfileItemComponent } from './vertical-profile-item.component';

describe('VerticalProfileItemComponent', () => {
  let component: VerticalProfileItemComponent;
  let fixture: ComponentFixture<VerticalProfileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalProfileItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

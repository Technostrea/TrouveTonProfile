import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizentalProfileItemComponent } from './horizental-profile-item.component';

describe('HorizentalProfileItemComponent', () => {
  let component: HorizentalProfileItemComponent;
  let fixture: ComponentFixture<HorizentalProfileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizentalProfileItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizentalProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

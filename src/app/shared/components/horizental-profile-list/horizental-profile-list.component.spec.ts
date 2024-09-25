import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizentalProfileListComponent } from './horizental-profile-list.component';

describe('HorizentalProfileListComponent', () => {
  let component: HorizentalProfileListComponent;
  let fixture: ComponentFixture<HorizentalProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizentalProfileListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizentalProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

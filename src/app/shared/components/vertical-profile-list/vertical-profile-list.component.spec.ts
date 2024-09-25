import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalProfileListComponent } from './vertical-profile-list.component';

describe('VerticalProfileListComponent', () => {
  let component: VerticalProfileListComponent;
  let fixture: ComponentFixture<VerticalProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalProfileListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

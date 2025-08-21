import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PdfViewerComponent} from './pdf-viewer.component';
import {Profile} from "@app/shared/models/profile";

describe('PdfViewerComponent', () => {
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;

  const mockProfile: Profile = {
    id: '123',
    cv: 'cvfilename.pdf',
  } as Profile;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfViewerComponent);
    component = fixture.componentInstance;

    component.profile = mockProfile;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

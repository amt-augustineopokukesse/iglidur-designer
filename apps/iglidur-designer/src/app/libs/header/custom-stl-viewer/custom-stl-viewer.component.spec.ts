import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomStlViewerComponent } from './custom-stl-viewer.component';

describe('CustomStlViewerComponent', () => {
  let component: CustomStlViewerComponent;
  let fixture: ComponentFixture<CustomStlViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomStlViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomStlViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewComponent } from './content-view.component';

describe('ContentViewComponent', () => {
  let component: ContentViewComponent;
  let fixture: ComponentFixture<ContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form-component.component';

describe('BookFormComponentComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesComponentComponent } from './quotes-component.component';

describe('QuotesComponentComponent', () => {
  let component: QuotesComponentComponent;
  let fixture: ComponentFixture<QuotesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

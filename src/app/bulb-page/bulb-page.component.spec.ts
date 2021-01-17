import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulbPageComponent } from './bulb-page.component';

describe('BulbPageComponent', () => {
  let component: BulbPageComponent;
  let fixture: ComponentFixture<BulbPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulbPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulbPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

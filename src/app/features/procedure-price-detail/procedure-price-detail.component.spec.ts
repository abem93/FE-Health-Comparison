import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedurePriceDetailComponent } from './procedure-price-detail.component';

describe('ProcedurePriceDetailComponent', () => {
  let component: ProcedurePriceDetailComponent;
  let fixture: ComponentFixture<ProcedurePriceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedurePriceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedurePriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

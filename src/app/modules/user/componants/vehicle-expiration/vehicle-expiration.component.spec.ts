import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleExpirationComponent } from './vehicle-expiration.component';

describe('VehicleExpirationComponent', () => {
  let component: VehicleExpirationComponent;
  let fixture: ComponentFixture<VehicleExpirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleExpirationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

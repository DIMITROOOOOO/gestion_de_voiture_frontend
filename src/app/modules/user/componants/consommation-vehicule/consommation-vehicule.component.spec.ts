import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsommationVehiculeComponent } from './consommation-vehicule.component';

describe('ConsommationVehiculeComponent', () => {
  let component: ConsommationVehiculeComponent;
  let fixture: ComponentFixture<ConsommationVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsommationVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsommationVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

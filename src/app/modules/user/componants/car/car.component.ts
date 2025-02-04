import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../../services/car.service';
import { TypeBoiteVitesse } from '../../../../models/TypeBoiteVitesse';
import { TypeCarburant } from '../../../../models/typeCarburant';
import { TypeContrat } from '../../../../models/TypeContrat';
import { TypeVehicle } from '../../../../models/TypeVehicle';
import { Vehicule } from '../../../../models/Vehicule';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  standalone:false
})
export class CarComponent implements OnInit {
  cars: Vehicule[] = [];
  filteredCars: Vehicule[] = [];
  loading = true;
  error: string | null = null;

  carForm: FormGroup;
  modelForm: FormGroup;
  vignetteForm: FormGroup;
  assuranceForm: FormGroup;
  taxForm: FormGroup;

  editCarForm: FormGroup;
  editModelForm: FormGroup;
  editVignetteForm: FormGroup;
  editAssuranceForm: FormGroup;
  editTaxForm: FormGroup;
  // Enum values as arrays
  vehicleTypes = Object.values(TypeVehicle);
  gearboxTypes = Object.values(TypeBoiteVitesse);
  contractTypes = Object.values(TypeContrat);
  fuelTypes = Object.values(TypeCarburant);
  selectedCar: Vehicule | null = null;
  @ViewChild('addCarModal') addCarModal!: TemplateRef<any>; 
  @ViewChild('editCarModal') editCarModal!: TemplateRef<any>; 
  constructor(
    private carService: CarService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    // Initialize forms
    this.carForm = this.fb.group({
      plaque_immatriculation: ['', Validators.required],
      kilometrage: ['', Validators.required],
      dateMiseEnCirculation: ['', Validators.required],
      typeCarburant: ['', Validators.required],
      consommation: ['', Validators.required],
      statut: ['disponible', Validators.required],
    });

    this.modelForm = this.fb.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      typeVehicle: ['', Validators.required],
      typeBoiteVitesse: ['', Validators.required],
    });

    this.vignetteForm = this.fb.group({
      numeroVignette: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      dateDebut: ['', Validators.required],
      coutAchat: ['', Validators.required],
    });

    this.assuranceForm = this.fb.group({
      idAssurance: ['', Validators.required],
      compagnieAssurance: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      dateDebut: ['', Validators.required],
      coutAssurance: ['', Validators.required],
      typeContrat: ['', Validators.required],
    });

    this.taxForm = this.fb.group({
      codeTaxe: ['', Validators.required],
      montant: ['', Validators.required],
    });
    this.editCarForm = this.fb.group({
      plaque_immatriculation: ['', Validators.required],
      kilometrage: ['', Validators.required],
      dateMiseEnCirculation: ['', Validators.required],
      typeCarburant: ['', Validators.required],
      consommation: ['', Validators.required],
      statut: ['disponible', Validators.required],
    });
    
    this.editModelForm = this.fb.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      typeVehicle: ['', Validators.required],
      typeBoiteVitesse: ['', Validators.required],
    });
    this.editVignetteForm = this.fb.group({
      numeroVignette: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      dateDebut: ['', Validators.required],
      coutAchat: ['', Validators.required],
    });

    this.editAssuranceForm = this.fb.group({
      idAssurance: ['', Validators.required],
      compagnieAssurance: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      dateDebut: ['', Validators.required],
      coutAssurance: ['', Validators.required],
      typeContrat: ['', Validators.required],
    });

    this.editTaxForm = this.fb.group({
      codeTaxe: ['', Validators.required],
      montant: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data: Vehicule[]) => {
        this.cars = data;
        this.filteredCars = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cars. Please try again later.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  // Open the "Add Car" modal
  openAddModal(): void {
    this.modalService.open(this.addCarModal, { size: 'lg' });
  }

  // Open the "Edit Car" modal
  openEditModal(car: Vehicule): void {
    this.selectedCar = car;

    // Patch the edit forms with the selected car's data
    this.editCarForm.patchValue(car);
    this.editModelForm.patchValue(car.modele);
    this.editVignetteForm.patchValue(car.vignette);
    this.editAssuranceForm.patchValue(car.assurance);
    this.editTaxForm.patchValue(car.taxe);

    // Open the modal
    this.modalService.open(this.editCarModal, { size: 'lg' });
  }
  onEditSubmit(): void {
    if (this.editCarForm.valid && this.selectedCar) {
      const updatedCar: Vehicule = {
        ...this.selectedCar,
        ...this.editCarForm.value,
        modele: this.editModelForm.value,
        vignette: this.editVignetteForm.value,
        assurance: this.editAssuranceForm.value,
        taxe: this.editTaxForm.value,
      };

      this.carService.updateCar(updatedCar.vehicule_id, updatedCar).subscribe({
        next: () => {
          this.loadCars(); // Refresh the list
          this.modalService.dismissAll(); // Close all modals
        },
        error: (err) => {
          console.error('Error updating vehicle:', err);
        },
      });
    }
  }

  // Delete a car
  deleteCar(id: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).subscribe({
        next: () => {
          this.loadCars(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting car:', err);
        },
      });
    }
  }

  onSubmit(): void {
    console.log('Submit button clicked');
    if (
      this.carForm.valid &&
      this.modelForm.valid &&
      this.vignetteForm.valid &&
      this.assuranceForm.valid &&
      this.taxForm.valid
    ) {
      const vehicleData: Vehicule = {
        ...this.carForm.value,
        modele: this.modelForm.value,
        vignette: this.vignetteForm.value,
        assurance: this.assuranceForm.value,
        taxe: this.taxForm.value,
      };
      console.log('Form data:', vehicleData);
      this.carService.createCar(vehicleData).subscribe({
        next: () => {
          console.log('Car created successfully');
          this.loadCars(); // Refresh the list
          this.resetForms(); // Reset all forms
          this.modalService.dismissAll(); // Close all modals
        },
        error: (err) => {
          console.error('Error creating vehicle:', err);
        },
      });
    }
    else {
      console.error('Form is invalid. Please check the fields.');
      this.logFormValidationErrors(this.carForm, 'carForm');
      this.logFormValidationErrors(this.modelForm, 'modelForm');
      this.logFormValidationErrors(this.vignetteForm, 'vignetteForm');
      this.logFormValidationErrors(this.assuranceForm, 'assuranceForm');
      this.logFormValidationErrors(this.taxForm, 'taxForm');
    }
  }
  logFormValidationErrors(form: FormGroup, formName: string): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control?.invalid) {
        console.error(`Invalid field in ${formName}:`, key, control.errors);
      }
    });
  }
  resetForms(): void {
    this.carForm.reset();
    this.modelForm.reset();
    this.vignetteForm.reset();
    this.assuranceForm.reset();
    this.taxForm.reset();
  }
  searchQuery: string = '';
  searchCriteria: keyof Vehicule = 'plaque_immatriculation'; // Explicitly define the type

  filterCars(): void {
    this.filteredCars = this.cars.filter(car =>
      String(car[this.searchCriteria]).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
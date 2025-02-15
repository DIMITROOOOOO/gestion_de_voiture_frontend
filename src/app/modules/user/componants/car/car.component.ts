import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../../services/car.service';
import { TypeBoiteVitesse } from '../../../../models/TypeBoiteVitesse';
import { TypeCarburant } from '../../../../models/typeCarburant';
import { TypeContrat } from '../../../../models/TypeContrat';
import { TypeVehicle } from '../../../../models/TypeVehicle';
import { Vehicule } from '../../../../models/Vehicule';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private modalService: NgbModal,
    private router: Router
  ) {

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


  openAddModal(): void {
    this.modalService.open(this.addCarModal, { size: 'lg' });
  }

  
  openEditModal(car: Vehicule): void {
    console.log("car id :",car.vehiculeId);
    this.selectedCar = car;
    console.log('Selected Car:', this.selectedCar);
    console.log('Selected Car ID:', this.selectedCar.vehiculeId);
    this.editCarForm.patchValue(car);
    this.editModelForm.patchValue(car.modele);
    this.editVignetteForm.patchValue(car.vignette);
    this.editAssuranceForm.patchValue(car.assurance);
    this.editTaxForm.patchValue(car.taxe);

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
      console.log('Updated Car ID:', updatedCar.vehiculeId);
      this.carService.updateCar(updatedCar.vehiculeId, updatedCar).subscribe({
        next: () => {
          this.loadCars(); 
          this.modalService.dismissAll(); 
        },
        error: (err) => {
          console.error('Error updating vehicle:', err);
        },
      });
    }
  }

  
  deleteCar(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(id).subscribe({
          next: () => {
            Swal.fire('Supprimé !', 'La voiture a été supprimée avec succès.', 'success');
            this.loadCars(); 
          },
          error: (err) => {
            Swal.fire('Erreur !', 'Un problème est survenu lors de la suppression.', 'error');
            console.error('Erreur lors de la suppression de la voiture :', err);
          }
        });
      }
    });
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
          this.loadCars(); 
          this.resetForms(); 
          this.modalService.dismissAll(); 
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

trackConsumption(car: any) {
  this.router.navigate(['/menu-gestionnaire/consommation-vehicule', car.plaque_immatriculation]);
}
viewExpenses(car:any) {
  this.router.navigate(['/menu-gestionnaire/report',car.plaque_immatriculation ]);
}
searchQuery: string = '';
filterCars(): void {
  if (!this.searchQuery) {
    this.filteredCars = this.cars;
    return;
  }

  this.filteredCars = this.cars.filter(car =>
    car.plaque_immatriculation.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}
}
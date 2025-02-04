import { Component, OnInit } from '@angular/core';
import { ChauffeurService } from '../../services/chauffeur-service.service';
import { CarService } from '../../services/car.service';
import { Driver } from '../../../../models/driver';
import { driverStatut } from '../../../../models/driverStatut';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  standalone: false,
})
export class DriverComponent implements OnInit {
  chauffeurs: Driver[] = [];
  availableVehicles: any[] = [];
  availableChauffeurs: Driver[] = [];
  selectedChauffeurId: number | null = null;
  selectedVehicle: any = null;

  currentChauffeur: Driver = {
    chauffeur_id: 0,
    nom: '',
    telephone: '',
    numero_permis: '',
    date_embauche: new Date(),
    statutChaffeurs: driverStatut.disponible,
  };

  // Modal visibility flags
  showAddChauffeurModal: boolean = false;
  showEditChauffeurModal: boolean = false;
  showDeleteChauffeurModal: boolean = false;
  showAssignVehicleModal: boolean = false;

  constructor(
    private chauffeurService: ChauffeurService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.loadChauffeurs();
    this.loadAvailableVehicles();
  }

  // Fetch all chauffeurs
  loadChauffeurs(): void {
    this.chauffeurService.getChauffeurs().subscribe({
      next: (data) => {
        this.chauffeurs = data;
        this.availableChauffeurs = this.chauffeurs.filter(
          (chauffeur) => chauffeur.statutChaffeurs === driverStatut.disponible
        );
      },
      error: (error) => {
        console.error('Error fetching chauffeurs:', error);
      }
    });
  }

  // Fetch available vehicles
  loadAvailableVehicles(): void {
    console.log('Fetching available vehicles...'); // Debugging
    this.carService.getAvailableVehicles().subscribe({
      next: (data) => {
        console.log('Received data:', data); // Debugging
        this.availableVehicles = data;
      },
      error: (error) => {
        console.error('Error fetching available vehicles:', error);
      }
    });
  }

  // Open a modal
  openModal(modalId: string): void {
    if (modalId === 'addChauffeurModal') {
      this.showAddChauffeurModal = true;
    } else if (modalId === 'assignVehicleModal') {
      this.showAssignVehicleModal = true;
    } else if (modalId === 'editChauffeurModal') {
      this.showEditChauffeurModal = true;
    } else if (modalId === 'deleteChauffeurModal') {
      this.showDeleteChauffeurModal = true;
    }
  }

  // Close a modal
  closeModal(modalId: string): void {
    if (modalId === 'addChauffeurModal') {
      this.showAddChauffeurModal = false;
    } else if (modalId === 'assignVehicleModal') {
      this.showAssignVehicleModal = false;
    } else if (modalId === 'editChauffeurModal') {
      this.showEditChauffeurModal = false;
    } else if (modalId === 'deleteChauffeurModal') {
      this.showDeleteChauffeurModal = false;
    }
  }

  // Open Edit Modal
  openEditModal(chauffeur: Driver): void {
    this.currentChauffeur = { ...chauffeur }; // Set the selected chauffeur
    this.openModal('editChauffeurModal'); // Open the modal
  }

  // Open Delete Modal
  openDeleteModal(chauffeur: Driver): void {
    this.currentChauffeur = { ...chauffeur }; // Set the selected chauffeur
    this.openModal('deleteChauffeurModal'); // Open the modal
  }

  // Set the selected vehicle
  setSelectedVehicle(vehicle: any): void {
    this.selectedVehicle = vehicle;
  }

  // Add a new chauffeur
  addChauffeur(): void {
    const payload = {
      ...this.currentChauffeur,
      date_embauche: this.currentChauffeur.date_embauche,
    };

    this.chauffeurService.addChauffeur(payload).subscribe({
      next: () => {
        alert('Chauffeur added successfully!');
        this.loadChauffeurs(); // Refresh chauffeurs list
        this.resetForm(); // Reset the form
        this.closeModal('addChauffeurModal'); // Close the modal
      },
      error: (error) => {
        console.error('Error adding chauffeur:', error);
      }
    });
  }

  // Update a chauffeur
  updateChauffeur(): void {
    const payload = {
      ...this.currentChauffeur,
      date_embauche: this.currentChauffeur.date_embauche,
    };

    this.chauffeurService.updateChauffeur(this.currentChauffeur.chauffeur_id, payload).subscribe({
      next: () => {
        alert('Chauffeur updated successfully!');
        this.loadChauffeurs(); // Refresh chauffeurs list
        this.resetForm(); // Reset the form
        this.closeModal('editChauffeurModal'); // Close the modal
      },
      error: (error) => {
        console.error('Error updating chauffeur:', error);
      }
    });
  }

  // Delete a chauffeur
  deleteChauffeur(chauffeurId: number): void {
    this.chauffeurService.deleteChauffeur(chauffeurId).subscribe({
      next: () => {
        alert('Chauffeur deleted successfully!');
        this.loadChauffeurs(); // Refresh chauffeurs list
        this.closeModal('deleteChauffeurModal'); // Close the modal
      },
      error: (error) => {
        console.error('Error deleting chauffeur:', error);
      }
    });
  }

  // Assign the vehicle to the selected chauffeur
  assignChauffeurToVehicle(): void {
    if (this.selectedVehicle && this.selectedChauffeurId) {
      this.chauffeurService.assignChauffeurToVehicle(this.selectedVehicle.vehicule_id, this.selectedChauffeurId).subscribe({
        next: () => {
          alert('Vehicle assigned successfully!');
          this.loadAvailableVehicles(); // Refresh available vehicles
          this.loadChauffeurs(); // Refresh chauffeurs list
          this.closeModal('assignVehicleModal'); // Close the modal
        },
        error: (error) => {
          console.error('Error assigning vehicle:', error);
        }
      });
    }
  }

  // Reset the form
  resetForm(): void {
    this.currentChauffeur = {
      chauffeur_id: 0,
      nom: '',
      telephone: '',
      numero_permis: '',
      date_embauche: new Date(),
      statutChaffeurs: driverStatut.disponible,
    };
  }

  // Helper method to get enum values
  getDriverStatutValues(): string[] {
    return Object.values(driverStatut);
  }
}
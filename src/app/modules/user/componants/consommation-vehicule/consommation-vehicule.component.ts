import { Component } from '@angular/core';
import { ConsommationVehiculeService } from '../../services/consommation-vehicule.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsommationVehicule } from '../../../../models/consommation-vehicule';
@Component({
  selector: 'app-consommation-vehicule',
  templateUrl: './consommation-vehicule.component.html',
  styleUrl: './consommation-vehicule.component.css',
  standalone:false
})
export class ConsommationVehiculeComponent {
  plaqueImmatriculation: string = '';
  consommationData: ConsommationVehicule[] = [];
  newConsommation: ConsommationVehicule = {
    dateConsommation: '',
    quantiteConsommee: 0,
    montantDepense: 0,
  };

  constructor(
    private consommationService: ConsommationVehiculeService,
    private modalService: NgbModal // Inject NgbModal for modal dialog
  ) {}

  // Handle search for consommation data
  handleSearch() {
    this.consommationService
      .getConsommationByPlaque(this.plaqueImmatriculation)
      .subscribe(
        (data) => {
          this.consommationData = data;
        },
        (error) => {
          console.error('Error fetching consommation data:', error);
          alert('Vehicle not found or an error occurred.');
        }
      );
  }

  // Open the modal for adding a new consommation record
  openAddModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Handle adding a new consommation record
  handleAddConsommation() {
    this.consommationService
      .addConsommation(this.plaqueImmatriculation, this.newConsommation)
      .subscribe(
        (response) => {
          alert('Consommation record added successfully!');
          this.modalService.dismissAll(); // Close the modal
          this.handleSearch(); // Refresh the data
        },
        (error) => {
          console.error('Error adding consommation record:', error);
          alert('Failed to add consommation record.');
        }
      );
  }
}

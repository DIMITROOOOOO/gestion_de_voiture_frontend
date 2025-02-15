import { Component, OnInit } from '@angular/core';
import { ConsommationVehiculeService } from '../../services/consommation-vehicule.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsommationVehicule } from '../../../../models/consommation-vehicule';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { CategoryScale } from 'chart.js'; 
import { LinearScale } from 'chart.js';
import {  LineController, LineElement, PointElement } from 'chart.js';
import { ActivatedRoute } from '@angular/router'; 

Chart.register(CategoryScale,LinearScale);
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

@Component({
  selector: 'app-consommation-vehicule',
  templateUrl: './consommation-vehicule.component.html',
  styleUrls: ['./consommation-vehicule.component.css'],
  standalone: false,
})
export class ConsommationVehiculeComponent implements OnInit {
  plaqueImmatriculation: string = '';
  consommationData: ConsommationVehicule[] = [];
  newConsommation: ConsommationVehicule = {
    dateConsommation: '',
    quantiteConsommee: 0,
    montantDepense: 0,
  };


  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        type: 'category', 
        title: {
          display: true,
          text: 'Plaque Immatriculation',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Montant Depense',
        },
        beginAtZero: true,
      },
    },
  };
  public lineChartType: ChartType = 'line'; 
  public lineChartLegend = true;
  public lineChartData: any = {
    labels: [], 
    datasets: [
      {
        data: [], 
        label: 'Total Montant Depense',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false, 
      },
    ],
  };

  constructor(
    private consommationService: ConsommationVehiculeService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadChartData();
    this.plaqueImmatriculation = this.route.snapshot.paramMap.get('plaque_immatriculation') || '';
    
    if (this.plaqueImmatriculation) {
      this.handleSearch();
    }
    this.loadChartData();

  }

  loadChartData(): void {
    this.consommationService.getTotalConsommationFeesByVehicule().subscribe({
      next: (data: any[]) => {
        this.lineChartData.labels = data.map((item) => item.plaqueImmatriculation);
        this.lineChartData.datasets[0].data = data.map((item) => item.totalMontantDepense);
      },
      error: (error) => {
        console.error('Error fetching chart data:', error);
      }
    });
  }

  handleSearch(): void {
    this.consommationService
      .getConsommationByPlaque(this.plaqueImmatriculation)
      .subscribe({
        next: (data) => {
          this.consommationData = data;
        },
        error: (error) => {
          console.error('Error fetching consommation data:', error);
          alert('Vehicle not found or an error occurred.');
        }
      });
  }

  openAddModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  handleAddConsommation(): void {
    this.consommationService
      .addConsommation(this.plaqueImmatriculation, this.newConsommation)
      .subscribe({
        next: (response) => {
          alert('Consommation record added successfully!');
          this.modalService.dismissAll(); 
          this.handleSearch(); 
          this.loadChartData(); 
        },
        error: (error) => {
          console.error('Error adding consommation record:', error);
          alert('Failed to add consommation record.');
        }
      });
  }
}
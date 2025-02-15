import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js'; 
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  standalone: false
})
export class ReportComponent implements OnInit {
  immatriculation: string = '';
  barChartData: any= {
    labels: [],
    datasets: [], 
  };
  
  expenseTableData: { category: string; amount: number }[] = [];
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'annees 2024/2025',
      },
    },
  };


  constructor(private vehiculeService: CarService,private route: ActivatedRoute) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.immatriculation = params.get('plaque_immatriculation') || '';
      console.log("Retrieved Matriculation:", this.immatriculation); 
  
      if (this.immatriculation) {
        this.loadExpenses();
      } else {
        this.errorMessage = 'Aucune immatriculation fournie.';
      }
    });
  }
  
  errorMessage: string = '';
  loadExpenses(): void {
    this.vehiculeService.getFeesByImmatriculation(this.immatriculation).subscribe({
      next: (feesResponse: any) => {
        console.log("API Response:", feesResponse);
        this.errorMessage = ''; 
        this.updateCharts(feesResponse);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des dépenses:', error);
        this.errorMessage = 'Véhicule non trouvé ou une erreur est survenue.';
        this.barChartData = { labels: [], datasets: [] }; 
      },
    });
  }

  
  updateCharts(feesResponse: any): void {
    const labels = [
      'Assurance',
      'Vignette',
      'Taxe',
      'Maintenance',
      'Consommation',
    ];
    const data = [
      feesResponse.assuranceFees,
      feesResponse.vignetteFees,
      feesResponse.taxeFees,
      feesResponse.maintenanceFees,
      feesResponse.consommationFees,
    ];
    this.expenseTableData = labels.map((label, index) => ({
      category: label,
      amount: data[index] || 0, 
    }));
    this.barChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Expenses',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}
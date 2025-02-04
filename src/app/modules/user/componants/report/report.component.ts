import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js'; 
import { CarService } from '../../services/car.service';
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
  
  pieChartData: any = {
    labels: [], 
    datasets: [],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    },
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expenses Distribution',
      },
    },
  };

  constructor(private vehiculeService: CarService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  searchVehicle(): void {
    if (!this.immatriculation) {
      alert('Please enter a vehicle immatriculation.');
      return;
    }

    this.vehiculeService
      .getFeesByImmatriculation(this.immatriculation)
      .subscribe(
        (feesResponse: any) => {
          this.updateCharts(feesResponse);
        },
        (error) => {
          console.error('Error fetching vehicle fees:', error);
          alert('Vehicle not found or an error occurred.');
        }
      );
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

    this.pieChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
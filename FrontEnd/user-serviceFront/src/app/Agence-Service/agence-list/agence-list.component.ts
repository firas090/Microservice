import { Component, OnInit } from '@angular/core';
import { AgenceService } from 'src/app/services/agence-service/agence.service';
import { Agence } from '../../models/agence';
import { StatsParVille } from 'src/app/models/StatsParVille';
import { ChartData, ChartOptions } from 'chart.js';  // Import Chart.js types
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';  // Import html2canvas
  import autoTable from 'jspdf-autotable';  // Import autoTable from jsPDF
@Component({
  selector: 'app-agence-list',
  templateUrl: './agence-list.component.html'
})
export class AgenceListComponent implements OnInit {
  // Declare agences only once
  agences: Agence[] = [];  
  statsParVille: StatsParVille | undefined;  // Store the statistics data
  barChartData: ChartData<'bar'> = {
    labels: [],  // City names
    datasets: [
      {
        data: [],  // Active agencies count
        label: 'Actives',
        backgroundColor: '#42A5F5',  // Blue for active
      },
      {
        data: [],  // Inactive agencies count
        label: 'Inactives',
        backgroundColor: '#FF7043',  // Red for inactive
      }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { 
        beginAtZero: true 
      },
      y: { 
        beginAtZero: true 
      }
    }
  };

  constructor(private agenceService: AgenceService) {}

  ngOnInit(): void {
    // Load agencies and statistics when the component initializes
    this.loadAgences();
    this.fetchStatsParVille();
    this.loadStatsParVille();

  }

  // Function to load agencies
  loadAgences(): void {
    this.agenceService.getAllAgences().subscribe(data => {
      this.agences = data;
    });
  }

  // Function to fetch statistics by city and status
  fetchStatsParVille(): void {
    this.agenceService.getStatsParVille().subscribe((data: StatsParVille) => {
      this.statsParVille = data;
    });
  }

  // Function to delete an agency
  deleteAgence(id: string): void {
    if (confirm('Are you sure you want to delete this agency?')) {
      this.agenceService.deleteAgence(id).subscribe(() => {
        this.loadAgences(); // Refresh the agencies list after deletion
      });
    }
  }

  // Function to toggle the active status of an agency
  toggleStatus(id: string, active: boolean): void {
    this.agenceService.toggleActiveStatus(id, !active).subscribe(() => {
      this.loadAgences(); // Refresh the agencies list after status change
    });
  }
  

 

 

  loadStatsParVille(): void {
    this.agenceService.getStatsParVille().subscribe((data: StatsParVille) => {
      this.statsParVille = data;
      this.updateChartData();  // Update the chart data after fetching
    });
  }

  updateChartData(): void {
    // Extract city names and statistics for active/inactive agencies
    const cities = Object.keys(this.statsParVille || {});
    const actives = cities.map(city => this.statsParVille![city].actives);
    const inactives = cities.map(city => this.statsParVille![city].inactives);

    this.barChartData.labels = cities;
    this.barChartData.datasets[0].data = actives;
    this.barChartData.datasets[1].data = inactives;
  }

  
  
  downloadAgenciesAsPdf(): void {
    const doc = new jsPDF();
  
    // Table headers for the PDF
    const headers = [['ID', 'Name', 'Address', 'Email', 'Status']];
  
    // Mapping the agencies data into the format required by autoTable
    const body = this.agences.map(agence => [
      agence.idAgence ?? '',
      agence.nomAg ?? '',
      agence.adresse ?? '',
      agence.email ?? '',
      agence.active ? 'Active' : 'Inactive'  // Status as text
    ]);
  
    // Creating the table in the PDF
    autoTable(doc, {
      head: headers,
      body: body,
      startY: 20,  // Starting position of the table
      theme: 'striped',  // Optional: Add striped rows for better readability
    });
  
    // Save the PDF with the name 'agency_list.pdf'
    doc.save('agency_list.pdf');
  }
  
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DestinationService } from '../services/destination-service.service';
import { Destination } from '../models/destination.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  popularDestinations: Destination[] = [];
  selectedDestination?: Destination;
  destinationForm: FormGroup;
  searchTerm = '';
  selectedCountry = '';
  loading = false;
  viewMode: 'grid' | 'list' = 'grid';
  activeTab: 'all' | 'popular' | 'recommended' = 'all';
  priceRange = { min: 0, max: 5000 };
  selectedCategory = '';
  selectedClimate = '';
  categoryOptions = ['Beach', 'Mountain', 'City', 'Cultural', 'Adventure', 'Relaxation'];
  climateOptions = ['Tropical', 'Temperate', 'Mediterranean', 'Alpine', 'Desert', 'Arctic'];
  showFilters = false;
  isEditing = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private destinationService: DestinationService,
    private fb: FormBuilder
  ) {
    this.destinationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      averagePrice: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      climate: ['', [Validators.required]]
    });
  }

  // Add this to your ngOnInit
  ngOnInit(): void {
    console.log('Initializing component');
    this.loadAllDestinations();
    this.loadPopularDestinations();
  }

// Update your createDestination method
  createDestination(): void {
    console.log('Create destination form:', this.destinationForm.value);

    if (this.destinationForm.invalid) {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.destinationForm);
      return;
    }

    this.loading = true;
    this.destinationService.createDestination(this.destinationForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          console.log('Destination created:', data);
          this.destinations.push(data);
          this.filteredDestinations = [...this.destinations];
          this.resetForm();
          this.loadPopularDestinations();
          this.showSuccess('Destination created successfully!');
        },
        error: (error) => {
          console.error('Error creating destination:', error);
          this.showError('Failed to create destination. Please check console for details.');
        }
      });
  }

  loadAllDestinations(): void {
    this.loading = true;
    this.destinationService.getAllDestinations()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.destinations = data;
          this.filteredDestinations = data;
        },
        error: (error) => this.showError('Failed to load destinations')
      });
  }

  loadPopularDestinations(): void {
    this.destinationService.getPopularDestinations()
      .subscribe({
        next: (data) => this.popularDestinations = data,
        error: (error) => this.showError('Failed to load popular destinations')
      });
  }

  searchDestinations(): void {
    if (!this.searchTerm.trim()) {
      this.loadAllDestinations();
      return;
    }

    this.loading = true;
    this.destinationService.searchDestinationsByName(this.searchTerm)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.filteredDestinations = data;
          this.activeTab = 'all';
        },
        error: (error) => this.showError('Search failed')
      });
  }

  filterByCountry(): void {
    if (!this.selectedCountry.trim()) {
      this.loadAllDestinations();
      return;
    }

    this.loading = true;
    this.destinationService.getDestinationsByCountry(this.selectedCountry)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.filteredDestinations = data;
          this.activeTab = 'all';
        },
        error: (error) => this.showError('Failed to filter by country')
      });
  }

  filterByPriceRange(): void {
    this.loading = true;
    this.destinationService.recommendByPriceRange(this.priceRange.min, this.priceRange.max)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.filteredDestinations = data;
          this.activeTab = 'recommended';
        },
        error: (error) => this.showError('Failed to filter by price range')
      });
  }

  filterByCategory(): void {
    if (!this.selectedCategory) return;

    this.loading = true;
    this.destinationService.recommendByCategory(this.selectedCategory)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.filteredDestinations = data;
          this.activeTab = 'recommended';
        },
        error: (error) => this.showError('Failed to filter by category')
      });
  }

  filterByClimate(): void {
    if (!this.selectedClimate) return;

    this.loading = true;
    this.destinationService.recommendByClimate(this.selectedClimate)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.filteredDestinations = data;
          this.activeTab = 'recommended';
        },
        error: (error) => this.showError('Failed to filter by climate')
      });
  }

  selectDestination(destination: Destination): void {
    this.selectedDestination = { ...destination };
    this.destinationForm.patchValue(destination);
    this.isEditing = true;
    this.scrollToForm();
  }



  updateDestination(): void {
    if (this.destinationForm.invalid || !this.selectedDestination?.id) {
      this.markFormGroupTouched(this.destinationForm);
      return;
    }

    const updatedDestination = {
      ...this.selectedDestination,
      ...this.destinationForm.value
    };

    this.loading = true;
    this.destinationService.updateDestination(updatedDestination.id, updatedDestination)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          const index = this.destinations.findIndex(d => d.id === data.id);
          if (index !== -1) this.destinations[index] = data;
          this.filteredDestinations = [...this.destinations];
          this.resetForm();
          this.loadPopularDestinations();
          this.showSuccess('Destination updated successfully!');
        },
        error: (error) => this.showError('Failed to update destination')
      });
  }

  deleteDestination(id: number): void {
    if (confirm('Are you sure you want to delete this destination?')) {
      this.loading = true;
      this.destinationService.deleteDestination(id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.destinations = this.destinations.filter(d => d.id !== id);
            this.filteredDestinations = this.filteredDestinations.filter(d => d.id !== id);
            this.loadPopularDestinations();
            this.showSuccess('Destination deleted successfully!');
          },
          error: (error) => this.showError('Failed to delete destination')
        });
    }
  }

  resetForm(): void {
    this.destinationForm.reset({ averagePrice: 0 });
    this.selectedDestination = undefined;
    this.isEditing = false;
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) this.markFormGroupTouched(control);
    });
  }

  setActiveTab(tab: 'all' | 'popular' | 'recommended'): void {
    this.activeTab = tab;
    if (tab === 'all') this.filteredDestinations = this.destinations;
    else if (tab === 'popular') this.filteredDestinations = this.popularDestinations;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  resetFilters(): void {
    this.priceRange = { min: 0, max: 5000 };
    this.selectedCategory = '';
    this.selectedClimate = '';
    this.searchTerm = '';
    this.selectedCountry = '';
    this.loadAllDestinations();
  }

  getActiveDestinations(): Destination[] {
    return this.activeTab === 'popular' ? this.popularDestinations : this.filteredDestinations;
  }

  private scrollToForm(): void {
    setTimeout(() => {
      const formElement = document.querySelector('.form-panel');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 5000);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 5000);
  }
}

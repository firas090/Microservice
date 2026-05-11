import { Routes } from '@angular/router';
import { DestinationComponent } from './destination/destination.component';

export const routes: Routes = [
  { path: '', redirectTo: 'destinations', pathMatch: 'full' },
  { path: 'destinations', component: DestinationComponent },
  { path: '**', redirectTo: 'destinations' }
];

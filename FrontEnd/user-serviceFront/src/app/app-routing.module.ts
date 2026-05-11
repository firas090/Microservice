import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddAvisComponent } from './Avis-Service/add-avis/add-avis.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ListAllAvisComponent } from './Avis-Service/list-all-avis/list-all-avis.component';
import { EditAvisComponent } from './Avis-Service/edit-avis/edit-avis.component';

import { AddReservationComponent } from './Reservation-Service/add-reservation/add-reservation.component';
import { ListReservationsComponent } from './Reservation-Service/list-reservations/list-reservations.component';
import { EditReservationComponent } from './Reservation-Service/edit-reservation/edit-reservation.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { StatisticsComponent } from './Reservation-Service/statistics/statistics.component';
import { RecommendationsComponent } from './Reservation-Service/recommendations/recommendations.component';
import { ReservationOptionsComponent } from './Reservation-Service/reservation-options/reservation-options.component';
import { AgenceListComponent } from './Agence-Service/agence-list/agence-list.component';
import { AgenceFormComponent } from './Agence-Service/agence-form/agence-form.component';
import { AgenceDetailsComponent } from './Agence-Service/agence-details/agence-details.component';
import { AgenceSearchComponent } from './Agence-Service/agence-search/agence-search.component';
import { AgenceExportComponent } from './Agence-Service/agence-export/agence-export.component';
import { AgenceEmailComponent } from './Agence-Service/agence-email/agence-email.component';

import { ApiweatherComponent } from './Transport-service/apiweather/apiweather.component';  // Assurez-vous d'importer le composant

import { AddTransportComponent } from './Transport-service/add-transport/add-transport.component';
import { EditTransportComponent } from './Transport-service/edit-transport/edit-transport.component';
import { ListTransportComponent } from './Transport-service/list-transports/list-transport.component';
import { TransportDetailComponent } from './Transport-service/transport-detail/transport-detail.component';

import { DestinationComponent } from './destination/destination.component';


const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'avis', component: AddAvisComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'list-all-avis', component: ListAllAvisComponent },
  { path: 'edit-avis/:id', component: EditAvisComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'reservation/add', component: AddReservationComponent },
  { path: 'reservation/list', component: ListReservationsComponent },
  { path: 'reservation/edit/:id', component: EditReservationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reservation/statistics', component: StatisticsComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'reservation/:id/options', component: ReservationOptionsComponent },
  { path: 'agences', component: AgenceListComponent },
  { path: 'agence/add', component: AgenceFormComponent },
  { path: 'agence/edit/:id', component: AgenceFormComponent },
  { path: 'agence/:id', component: AgenceDetailsComponent },
  { path: 'search', component: AgenceSearchComponent },
  { path: 'export', component: AgenceExportComponent },
  { path: 'email', component: AgenceEmailComponent },

  { path: 'add-transport', component: AddTransportComponent },
  { path: 'edit-transport/:id', component: EditTransportComponent },
  { path: 'transports', component: ListTransportComponent },
  { path: 'transport/:id', component: TransportDetailComponent },
  { path: 'weather/:id', component: ApiweatherComponent },  // Nouvelle route pour la météo
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'destinations', component: DestinationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }

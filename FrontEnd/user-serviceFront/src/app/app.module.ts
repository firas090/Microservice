import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';  // Import ChartsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { AgenceResponsableComponent } from './Agence-Service/agence-responsable/agence-responsable.component';
import { AddTransportComponent } from './Transport-service/add-transport/add-transport.component';
import { EditTransportComponent } from './Transport-service/edit-transport/edit-transport.component';
import { ListTransportComponent } from './Transport-service/list-transports/list-transport.component';
import { TransportDetailComponent } from './Transport-service/transport-detail/transport-detail.component';
import { ApiweatherComponent } from './Transport-service/apiweather/apiweather.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    NavBarComponent,
    HomeComponent,
    AddAvisComponent,
    ForgotPasswordComponent,
    ListAllAvisComponent,
    EditAvisComponent,
    AddReservationComponent,
    ListReservationsComponent,
    EditReservationComponent,
    ProfileComponent,
    StatisticsComponent,
    RecommendationsComponent,
    ReservationOptionsComponent,
    AgenceListComponent,
    AgenceFormComponent,
    AgenceDetailsComponent,
    AgenceSearchComponent,
    AgenceExportComponent,
    AgenceEmailComponent,
    AgenceResponsableComponent,

    AddTransportComponent,
    EditTransportComponent,
    ListTransportComponent,
    TransportDetailComponent,
    ApiweatherComponent

    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
    
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

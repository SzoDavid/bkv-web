import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './pages/main/main.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ReservationsComponent} from './pages/reservations/reservations.component';
import {SearchComponent} from './pages/search/search.component';
import {SearchBoxComponent} from './pages/search/search-box/search-box.component';
import {SearchResultsComponent} from './pages/search/search-results/search-results.component';
import {MenuComponent} from './shared/menu/menu.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        ProfileComponent,
        ReservationsComponent,
        SearchComponent,
        SearchBoxComponent,
        SearchResultsComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

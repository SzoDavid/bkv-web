import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './shared/menu/menu.component';
import {FormsModule} from "@angular/forms";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"","appId":"","storageBucket":"","apiKey":"","authDomain":"","messagingSenderId":""})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

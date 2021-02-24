import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http'

import { AuthTokenHttpInterceptorProvider } from './http-interceptors/auth-token.interceptor';
import { LoaderInterceptorProvider } from './http-interceptors/http-loader.interceptor';
import { RetryInterceptorProvider } from './http-interceptors/http-retry.interceptor';

import { UserDialogComponent } from './admin/user-management/dialogs/user-dialog.component';

import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

import { AdminGuard } from "./user/admin.guard";
import { UserAccountComponent } from './user-account/user-account.component';


import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
// import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/database';
// import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    UserAccountComponent,
   


    //DateListComponent,
    //DateListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule, // <-- here
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthTokenHttpInterceptorProvider,
    LoaderInterceptorProvider,
    RetryInterceptorProvider,
    AdminGuard,
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    // { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined },
    // { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5000] : undefined },
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }

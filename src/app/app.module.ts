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
import { UserDialogComponent } from './admin/user-management/dialogs/user-dialog.component';

import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

import { AdminGuard } from "./user/admin.guard";





//import { DateListComponent} from './date-management/date-list/date-list.component';

// import { DateListPageComponent } from './trial-date-management/date-list-page/date-list-page.component'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
   


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
    AdminGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }

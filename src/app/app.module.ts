import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ReactiveFormsModule} from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { PincodeService } from './pincode-service.service';
import { InputRestrictionDirective } from './alphabet-only.directive';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DialogFormDataComponent } from './dialog-form-data/dialog-form-data.component';
import { DatePipe } from '@angular/common'; // Import DatePipe



@NgModule({
  declarations: [
    AppComponent,
    InputRestrictionDirective,
    ListComponent,
    FormComponent,
    DialogFormDataComponent,
   
   
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    // MatDialogModule
    // MatButtonModule
  ],
  providers: [PincodeService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

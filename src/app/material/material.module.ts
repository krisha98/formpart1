import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

let a = [MatButtonModule,
  MatTableModule,
  MatRadioModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
  MatDividerModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
   ]

@NgModule({
  declarations: [],
  imports: [
    a
  ],
  exports: [
    a
  ],
  providers: [
    MatDatepickerModule,MatCheckboxModule
  ],
})
export class MaterialModule { }

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators, AbstractControl } from '@angular/forms';
import { PincodeService } from './pincode-service.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormDataService } from './form-data-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'; // Import DatePipe






function alphabeticValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /^[a-zA-Z ]*$/.test(control.value);
  return valid ? null : { alphabetic: true };
}





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // standalone: true,
  // imports: [MatTableModule],
})

export class AppComponent {
  

  
  [x: string]: any;
  fetchingPincodeDetailsflag:boolean = true;
  userData: any[] = [];
  hide: boolean = false;
  title = ' Admission Form';
  constructor(private formBuilder: FormBuilder,private pincodeService: PincodeService,private formDataService: FormDataService,private datePipe: DatePipe) { }
  user = this.formBuilder.group({
    name: ['',[Validators.maxLength(40),Validators.required]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['',[Validators.email,Validators.required]],
    dob: ['',Validators.required],
    add: ['',[Validators.required,Validators.maxLength(200)]],
    country: new FormControl({ value: '', disabled: true }),
    state: new FormControl({ value: '', disabled: true }),
    city: new FormControl({ value: '', disabled: true }),
    pin: ['',[Validators.required,Validators.minLength(6)]],
    bld: ['',[Validators.required,Validators.pattern('^(?!.*[0-9])(A|B|AB|O)([+-])$')]],
    branch: ['', [Validators.required, alphabeticValidator]],
    subject: this.formBuilder.array([]),
    
  });
     // Function to fetch pincode details and fill location fields
  fetchPincodeDetails(pincode: string) {
    this.fetchingPincodeDetailsflag = true;
    this.pincodeService.getPincodeDetails(pincode).subscribe(
      (response) => {
      this.fetchingPincodeDetailsflag = false;
        console.log(response); // Log the entire response for reference
        if (response && response.length > 0) {
          const postOfficeDetails = response[0].PostOffice;
          console.log(postOfficeDetails); // Log the post office details
  
          if (postOfficeDetails.length > 0) {
            const firstPostOffice = postOfficeDetails[0];
            this.user.patchValue({
              country: firstPostOffice.Country,
              state: firstPostOffice.State,
              city: firstPostOffice.District
            });
          } else {
    this.fetchingPincodeDetailsflag = true;
            console.log('No post office details found for the provided pincode.');
          }
        }
      },
      (error) => {
        console.error(error); // Log errors, if any
    this.fetchingPincodeDetailsflag = true;
      }
    );
  }

new_subject(): FormGroup {
  return this.formBuilder.group({
    subject: '',
  })
}
addsubject() {
  if (this.subject.length < 5) {
    this.subject.push(this.new_subject());
  }
}

removesubject(i:number) {
  this.subject.removeAt(i);
}
get hob() {
  return this.user.get('hob');
} 
login() {
  if (this.user.valid && !this.fetchingPincodeDetailsflag) {
    this.formDataService.addFormData(this.user.value);
  }

  if (this.user.valid) {
    this.userData.push(this.user.value);
    this.dataSource.data = this.userData;
    this.user.reset();
  }
}
}



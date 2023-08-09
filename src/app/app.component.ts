import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators, AbstractControl } from '@angular/forms';
import { PincodeService } from './pincode-service.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormDataService } from './form-data-service.service';
import { Router } from '@angular/router';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

function alphabeticValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /^[a-zA-Z ]*$/.test(control.value);
  return valid ? null : { alphabetic: true };
}





const ELEMENT_DATA = [
  {
    name: '',
    password: '',
    mob: '',
    email: '',
  },
  {
    name: '',
    password: '',
    mob: '',
    email: '',
  },
  {
    name: '',
    password: '',
    mob: '',
    email: '',
  },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // standalone: true,
  // imports: [MatTableModule],
})

export class AppComponent {
  
  displayedColumns: string[] = [ 'name', 'password', 'mob', 'email', 'dob','add','pin','branch', 'bld'];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  
  [x: string]: any;
  fetchingPincodeDetailsflag:boolean = true;
  userData: any[] = [];
  hide: boolean = false;
  title = ' Admission Form';
  constructor(private formBuilder: FormBuilder,private pincodeService: PincodeService,private formDataService: FormDataService) { }
  user = this.formBuilder.group({
    name: ['',[Validators.maxLength(40),Validators.required]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['',[Validators.email,Validators.required]],
    dob: ['',Validators.required],
    add: ['',[Validators.required,Validators.maxLength(200)]],
    // hob:['',Validators.requiredTrue],d
    country: new FormControl({ value: '', disabled: true }),
    state: new FormControl({ value: '', disabled: true }),
    city: new FormControl({ value: '', disabled: true }),
    pin: ['',[Validators.required,Validators.minLength(6)]],
    bld: ['',[Validators.required,Validators.pattern('^(?!.*[0-9])(A|B|AB|O)([+-])$')]],
    branch: ['', [Validators.required, alphabeticValidator]],
    // branch:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(10)]],
    // '^(?!.*[0-9])(a-zA-Z)$'

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
 // Define the getter method for the "skills" FormArray
 get subject(): FormArray {
  return this.user.get('subject') as FormArray;
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


// login() {
// if (this.user.valid && !this.fetchingPincodeDetailsflag) {
//   console.log(this.user.value);
// }
// if (this.user.valid) {
//   this.userData.push(this.user.value);
//   this.dataSource.data = this.userData
//   this.user.reset(); // Clear form after submission
// }
// }





// function login() {
//   throw new Error('Function not implemented.');
// }
// login() {
  //     console.warn(this.user.value);
  //   }
  // }
  





















//   get skills() : FormArray {
//     return this.user.get("skills") as FormArray
//   }
 
//   newSkill(): FormGroup {
//     return this.formBuilder.group({
//       skill: '',
//       exp: '',
//     })
//   }
 
//   addSkills() {
//     this.skills.push(this.newSkill());
//   }
 
//   removeSkill(i:number) {
//     this.skills.removeAt(i);
//   }
  

//   login() {
//     console.warn(this.user.value);
//   }
// }



  // user = new FormGroup({
  //   name: new FormControl(''),
  //   password: new FormControl(''),
  //   mob: new FormControl(''),
  //   email: new FormControl(''),
  //   dob: new FormControl(''),
  //   add: new FormControl(''),
  //   pin: new FormControl(''),
  //   bld: new FormControl(''),
  // })

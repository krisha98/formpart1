import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PincodeService } from '../pincode-service.service';
import { FormDataService } from '../form-data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormDataComponent } from '../dialog-form-data/dialog-form-data.component';
import { DatePipe,formatDate} from '@angular/common';


function alphabeticValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /^[a-zA-Z ]*$/.test(control.value);
  return valid ? null : { alphabetic: true };
}




@Component({

  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})




export class FormComponent implements OnInit {


  [x: string]: any;
  dataGet1: any;
  isPopupOpen:boolean =false;
  displayData: any;

  title = ' Admission Form';
  fetchingPincodeDetailsflag: boolean = true;
  fetchingPincodeDetails:boolean = false;

  userData: any[] = [];
  hide: boolean = true;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private pincodeService: PincodeService, private formDataService: FormDataService, private dialog: MatDialog, private datePipe: DatePipe) { }
  user = this.formBuilder.group({
    name: ['', [Validators.maxLength(40), Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['', [Validators.email, Validators.required]],
    // dob: ['',formatDate(this.post.dob, 'yyyy-MM-dd', 'en'), [Validators.required]],
    dob: ['', Validators.required],
    add: ['', [Validators.required, Validators.maxLength(200)]],
    // hob:['',Validators.requiredTrue],d
    country: new FormControl({ value: '', disabled: true }),
    state: new FormControl({ value: '', disabled: true }),
    city: new FormControl({ value: '', disabled: true }),
    pin: ['', [Validators.required, Validators.minLength(6)]],
    bld: ['', [Validators.required, Validators.pattern('^(?!.*[0-9])(A|B|AB|O)([+-])$')]],
    branch: ['', [Validators.required, alphabeticValidator]],
    // branch:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(10)]],
    // '^(?!.*[0-9])(a-zA-Z)$'

    subject: this.formBuilder.array([]),
  });


  // formatting date 
  getFormattedDate() {
    const dob = this.user.get('dob').value;
    if (dob) {

// sourcery skip: inline-immediately-returned-variable
      const formattedDate = this.datePipe.transform(dob, 'dd/MM/yyyy');
      return formattedDate;
    }
    return '';
  }


  // Function to fetch pincode details and fill location fields
  fetchPincodeDetails(pincode: string)
   {
    this.fetchingPincodeDetails = true;
    this.fetchingPincodeDetailsflag = true;
    this.pincodeService.getPincodeDetails(pincode).subscribe(
      (response) => {
        this.fetchingPincodeDetailsflag = false;
        this.fetchingPincodeDetails = false;
        console.log(response); // Log the entire response for reference
        if (response && response.length > 0) {
          const postOfficeDetails = response[0].PostOffice;
          console.log(postOfficeDetails); // Log the post office details

          if (postOfficeDetails.length > 0) {
            const firstPostOffice = postOfficeDetails[0];
            // this.user.controls.country.setValue(firstPostOffice.Country)
            // this.user.controls.state.setValue(firstPostOffice.State)
            // this.user.controls.city.setValue(firstPostOffice.District)
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
        // this.fetchingPincodeDetails = false;
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

  removesubject(i: number) {
    this.subject.removeAt(i);
  }
  // confirm(){
  //   const formData = this.user.value;
  //   if (this.user.valid && !this.fetchingPincodeDetailsflag) {
  //     if(this.iseditmode){
  //       this.formDataService.updateEntry(this.prefilledData.id, formData);
  //     }
  //     else{
  //       this.formDataService.addFormData(this.user.value);
  //     }
  //     this.user.reset(); 
  // }
  // }

  openPopup() {
    if (this.user.valid && !this.fetchingPincodeDetails) {
      // If the form is valid and pincode details are not being fetched
      this.isPopupOpen = true;
    }
    console.log(this.user.get('subject').value)
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  login() {
    const formData = this.user.value;
    this.displayData = this.user.value
    console.log(this.displayData)
    if (this.user.valid && !this.fetchingPincodeDetailsflag) {
      if (this.iseditmode) {
        this.formDataService.updateEntry(this.prefilledData.id, formData);
      }
      else {
        this.formDataService.addFormData(this.user.value);
      }
      this.user.reset();
      this.router.navigate(['/list']); 

      // const dialogRef = this.dialog.open(DialogFormDataComponent, {
      //   data: formData, // Pass the form data to the dialog
      // });
    }
  }
get branch() {
    return this.user.get('branch');
  }

  iseditmode: boolean = false;

  ngOnInit(): void {
    // this.user.get('dob').valueChanges.subscribe((dob) => {
    //   if (dob) {
    //     this.formattedDOB = this.datePipe.transform(dob, 'dd/MM/yyyy');
    //   } else {
    //     this.formattedDOB = '';
    //   }
    // });
  
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        console.log('Received ID:', id);
        this.prefilledData = history.state.prefilledData;
        console.log(this.prefilledData)
        if (this.prefilledData) {
          this.dataGet1 = this.prefilledData;
          this.user.controls.name.setValue(this.dataGet1.name)
          this.user.controls.password.setValue(this.dataGet1.password)
          this.user.controls.mob.setValue(this.dataGet1.mob)
          this.user.controls.email.setValue(this.dataGet1.email)
          this.user.controls.dob.setValue(this.dataGet1.dob)
          this.user.controls.add.setValue(this.dataGet1.add)
          this.user.controls.pin.setValue(this.dataGet1.pin)
          this.user.controls.bld.setValue(this.dataGet1.bld)
          this.user.controls.branch.setValue(this.dataGet1.branch)
          // this.formBuilder.array(this.dataGet1.subject.map(subject => this.formBuilder.group({ subject })))
          
           // Add prefilled subjects
        this.dataGet1.subject.forEach(subject => {
          this.addsubject();
          const lastIndex = this.subject.length - 1;
          this.subject.at(lastIndex).patchValue({ subject });
        });

          this.iseditmode = true;
        }
        // this.user = this.formBuilder.group({
        //   name: new FormControl(this.prefilledData.name), // Initialize with pre-filled data
        //   password: new FormControl(this.prefilledData.password),

        // });


        // Now you can use the 'id' in your component logic
      }
    });

  }

}














import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PincodeService } from '../pincode-service.service';
import { FormDataService } from '../form-data-service.service';


@Component({
  selector: 'app-dialog-form-data',
  templateUrl: './dialog-form-data.component.html',
  styleUrls: ['./dialog-form-data.component.css']
})
export class DialogFormDataComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formDataService: FormDataService,private pincodeService: PincodeService) {
    console.log('Received data:', data); // Check if data is logged to the console
  }
  // confirm(){
  //   const formData = this.data.value;
  //   if (this.data.valid && !this.fetchingPincodeDetailsflag) {
  //     if(this.iseditmode){
  //       this.formDataService.updateEntry(this.prefilledData.id, formData);
  //     }
  //     else{
  //       this.formDataService.addFormData(this.user.value);
  //     }
  //     this.user.reset(); 
  // }
  // }
  ngOnInit(): void {
  }

}



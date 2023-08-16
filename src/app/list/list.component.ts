import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  [x: string]: any;
  formData: any[] = [];
  subjectValues: string[] = [];

  constructor(private formDataService: FormDataService, private router: Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.subjectValues = this.formDataService.getSubjectValues();
    console.log(this.subjectValues)
    this.formData = this.formDataService.getFormData()
    console.log(this.formData)
  }

  deleteData(index: number) {
    this.formData.splice(index, 1); // Remove data from the array
  }
  editData(data: any) {
    console.log(data)
    this.router.navigate([`/form`, data.id], { state: { prefilledData: data } });
    // this.data = this.getAll();
    console.log(data.id)

  }

}
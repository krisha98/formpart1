import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  formData: any[] = [];

  constructor(private formDataService: FormDataService, private router: Router) { }

  ngOnInit(): void {
    this.formData = this.formDataService.getFormData()
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
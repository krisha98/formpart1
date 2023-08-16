// form-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formData: any[] = [
    {
      id:0,
      name: " krisha",
      password: "Aka@12",
      mob: "+91-8160425628",
      email: "shethkrisha5@gmail.com",
      dob: "2023-08-14T18:30:00.000Z",
      add: "xs",
      pin: "396191",
      bld: "AB+",
      branch: "IT",
      subject: []
    }
  ];
  private id = 1;
  addFormData(data: any) {
    data.id = this.id++;
    data.subject = data.subject.map((subjectObj: any) => subjectObj.subject);
    this.formData.push(data);
  }

  getFormData() {
    return this.formData;
  }

  // Update existing entry by ID
  updateEntry(id, updatedData) {
    // Find the index of the entry with the specified ID
    const index = this.formData.findIndex(item => item.id === id);

    // Check if the entry with the specified ID was found
    if (index !== -1) {
      // Spread operator is used to create a new object with updatedData and id properties
      this.formData[index] = { ...updatedData, id };
      console.log(index)
      return index;
    }
  }
  
  // Add a method to get subject values from form data
  getSubjectValues() {
    const subjectValues: string[] = [];
    for (const formData of this.formData) {
      const subjects = formData.subject as string[];
      subjectValues.push(...subjects);
    }
    return subjectValues;
  }

}
  // Create new entry
  // createEntry(newData) {
  //   const id = this.data.length + 1;
  //   const newEntry = { ...newData, id };
  //   this.data.push(newEntry);
  //   return newEntry; // Return the newly created entry
  // }

//    // Update existing entry by ID
//    updateEntry(id: number, updatedData: any): void {
//     const index = this.data.findIndex(item => item.id === id);
//     if (index !== -1) {
//       this.data[index] = { ...updatedData, id };
//     }
//   }

//   // Create new entry
//   createEntry(newData: any): void {
//     const id = this.data.length + 1;
//     this.data.push({ ...newData, id });
//   }
// }


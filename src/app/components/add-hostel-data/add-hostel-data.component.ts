import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HostelService } from 'src/app/service/Hostel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HostelData } from '../home/home.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-hostel-data',
  templateUrl: './add-hostel-data.component.html',
  styleUrls: ['./add-hostel-data.component.css'
  ]
})
export class AddHostelDataComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('openPopUp') openPopUp!: TemplateRef<any>;
  existingData: any
  modalRef: any;

  constructor(
    private hostelService: HostelService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {

  }



  @Input()
  set dataFromParent(data: any) {
    this.existingData = data
    if (data != null && data.id != null) {
      this.openModal(this.openPopUp)
    }
    if (data.id == null && data.key == null) {
      this.openModal(this.openPopUp)
    }
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template);
  }




  submitForm(formData: any, form: NgForm) {

    if (form.valid) {
      if (formData != null && formData.id == 0) {
        this.hostelService.addHostel(JSON.stringify(formData)).subscribe((response) => {
          this.snackBar.open("Successfully added ");
          this.modalRef.close()
          window.location.reload()

        }, (error) => {
          this.snackBar.open("Error Submitting data");
          this.modalRef.dismiss()

        });
      }
      if (formData != null && formData.id != 0) {
        this.hostelService.updateHostel(formData.id, JSON.stringify(formData)).subscribe((res) => {
          this.modalRef.close()
          window.location.reload()
          this.snackBar.open("data updated successfully")

        })
      }
    } else {
      Object.keys(form.controls).forEach(controlName => {
        const control = form.controls[controlName];
        control.markAsTouched();
      });
    }
  }

  close() {
    this.modalRef.close
  }
}

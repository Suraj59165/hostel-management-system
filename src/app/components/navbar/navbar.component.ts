import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { window } from 'rxjs';
import { AddHostelDataComponent } from '../add-hostel-data/add-hostel-data.component';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dataToChild: any;
  title="Hostel Management System"
  searchText:any;

  constructor() { };


  openPopUpComponent()
  {
    this.dataToChild = { ...this };
  }
  

  
  
}


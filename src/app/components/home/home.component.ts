import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HostelService } from 'src/app/service/Hostel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddHostelDataComponent } from '../add-hostel-data/add-hostel-data.component';



export interface HostelData {

  id: string;
  code: string;
  location: string;
  opensAt: string;
  closesAt: string;
  fees: number;
  beds: number;
  available: boolean;

}

interface ApiResponse {
  content: HostelData[]; // Assuming 'HostelData' matches the structure of your data
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
}


@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent implements OnInit {

  dataToChild: any;
  tempData: HostelData[] = [];
  searchText: any;
  selectedOption: string = 'location';
  pageSize: any = 5;
  pageNumber:any=0;
  sortDirection:any='asc';

  displayedColumns: string[] = ['hostelCode', 'location', 'opensAt', 'closesAt', 'fees', 'numberOfBeds', 'available', 'action'];
  dataSource: HostelData[] = [];



  constructor(
    private service: HostelService,
    private snackBar: MatSnackBar

  ) {
  }

  ngOnInit() {
    if (this.searchText == null) {
      this.loadHostelData(this.pageSize,this.pageNumber,this.sortDirection)
    }
  }

  onInputChange(event: Event) {
    const trimmedSearchText = this.searchText.trim();
    if (trimmedSearchText.length === 0 && /^\s*$/.test(trimmedSearchText)) {
      this.loadHostelData(this.pageSize,this.pageNumber,this.sortDirection)
    }
    else
      this.service.findBykeyword(this.selectedOption, this.searchText).subscribe(
        (res: ApiResponse) => {
          this.dataSource = res.content;
        },
        (error) => {
          console.error('Error:', error);

        }
      );

  }
  onPageSizeChange(event: any) {
    console.log("running")
    this.pageSize = event.pageSize;
    console.log('Page changed from', event.previousPageIndex, 'to', event.pageIndex);
    this.pageNumber=event.pageIndex
    this.loadHostelData(this.pageSize,this.pageNumber,this.sortDirection)

  }

 
  loadHostelData(pageSize:any,pageNumber:any,sortDirection:any) {
    this.service.getAllHotels(pageSize,pageNumber,sortDirection).subscribe((res: ApiResponse) => {
      this.dataSource = res.content;
    })
  }

  onEdit(element: HostelData) {
    this.dataToChild = { ...element };
    console.log(this.dataToChild)
  }


  onDelete(element: HostelData) {
    this.service.deleteHostel(element.id).subscribe((res) => {
      this.snackBar.open("Hostel Deleted Successfully")
      window.location.reload();
    })
  }
}

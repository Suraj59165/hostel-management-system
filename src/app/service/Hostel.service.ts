import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HostelData } from "../components/home/home.component";

@Injectable({
    providedIn: 'root'
})
export class HostelService {
  
    constructor(private http: HttpClient) { }

    getAllHotels(pageSize:any,pageNumber:any,sortDirection:any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const params = new HttpParams()
            .set('pageSize', pageSize)
            .set('pageNumber', pageNumber)
            .set('sortDirection',sortDirection)
           
            ;

        return this.http.get<any>('http://localhost:8080/hostel', {  headers,params: params,

        });
    }

    addHostel(hosteldata: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const options = { headers: headers };
        return this.http.post('http://localhost:8080/hostel', hosteldata, options)
    }

    deleteHostel(id: string) {
        console.log("in service")
        return this.http.delete('http://localhost:8080/hostel/' + id)
    }

    updateHostel(id: string, hosteldata: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const options = { headers: headers };
        return this.http.put('http://localhost:8080/hostel/' + id, hosteldata, options)
    }

    findBykeyword(keyword: string, data: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const params = new HttpParams()
            .set('data', data)
            ;

        return this.http.get<any>('http://localhost:8080/hostel/search/'+keyword, {  headers,params: params,

        });
    }
}
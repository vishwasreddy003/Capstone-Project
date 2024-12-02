import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EnergyData {
  month: string;
  electricityUnits: number;
  noOfGasCylinders: number;
}


@Injectable({
  providedIn: 'root'
})
export class TrackerApiService {

  baseUrl = 'http://localhost:8080/planetwise'

  constructor(private http:HttpClient) { }

  submitEnergyData(energyData:EnergyData) : Observable<any>{
    return this.http.post(this.baseUrl,energyData);
  }


}

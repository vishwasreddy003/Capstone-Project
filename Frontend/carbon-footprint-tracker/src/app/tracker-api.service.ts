import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnergyData } from './model/EnergyData';
import { TransportData } from './model/TransportData';
import { WasteProdData } from './model/WasteProdData';


@Injectable({
  providedIn: 'root'
})
export class TrackerApiService {

  baseUrl = 'http://localhost:8080/planetwise'

  constructor(private http:HttpClient) { }

  submitEnergyData(energyData:EnergyData) : Observable<any>{
    return this.http.post(this.baseUrl+'/energy',energyData);
  }

  submitTransportData(transportData:TransportData) : Observable<any>{
    return this.http.post(this.baseUrl+'/transportation',transportData);
  }

  submitWasteProdData(wasteProdData:WasteProdData) :Observable<any>{
    return this.http.post(this.baseUrl+'/WasteProduction',wasteProdData);
  }



}

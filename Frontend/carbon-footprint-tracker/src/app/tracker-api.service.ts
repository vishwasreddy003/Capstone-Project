import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnergyData } from './model/EnergyData';
import { GreenScore } from './model/GreenScore';
import { TransportData } from './model/TransportData';
import { WasteProdData } from './model/WasteProdData';


@Injectable({
  providedIn: 'root'
})
export class TrackerApiService {

  baseUrl = 'http://localhost:8080/PlanetWise'

  constructor(private http:HttpClient) { }

  submitEnergyData(energyData:EnergyData){
    let username = sessionStorage.getItem('username')
    return this.http.post(this.baseUrl+`/energy/${username}/addData`,energyData);
  }

  submitTransportData(transportData:TransportData){
    let username = sessionStorage.getItem('username')
    return this.http.post(this.baseUrl+`/transportation/${username}/addData`,transportData);
  }

  submitWasteProdData(wasteProdData:WasteProdData){
    let username = sessionStorage.getItem('username')
    return this.http.post(this.baseUrl+`/WasteProduction/${username}/addData`,wasteProdData);
  }

  getGreenScores(greenScore:GreenScore){
    let username = sessionStorage.getItem('username')
    return this.http.post(this.baseUrl+`/greenScore/${username}/calculate`,greenScore);
  }
 
  getAllGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+`/goals/allGoals`);
  }

}

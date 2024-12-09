import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnergyData } from './model/EnergyData';
import { GreenScore } from './model/GreenScore';
import { Task } from './model/task';
import { TransportData } from './model/TransportData';
import { TrendsDto } from './model/TrendsDto';
import { WasteProdData } from './model/WasteProdData';


@Injectable({
  providedIn: 'root'
})
export class TrackerApiService {
  moveTaskToCurrent(id: number | undefined) {
    throw new Error('Method not implemented.');
  }

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
    console.log('ok');
    return this.http.get<any[]>(this.baseUrl+`/goals/allGoals`);
  }

  getTrendsData(category: string): Observable<TrendsDto[]> {
    const username = sessionStorage.getItem('username');
    return this.http.get<TrendsDto[]>(
      `${this.baseUrl}/WasteProduction/${username}/analytics`
    );
  }
  

  // baseurl + planetwise+user+{username}+addGoal+{goalID};

  // baseurl + planetwise+user+{username}+goals;

  addGoals(goalId:string) {
    let username = sessionStorage.getItem('username');
    return this.http.post(this.baseUrl+`/user/addGoal/${username}/${goalId}`,{});
  } 

}

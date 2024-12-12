import { HttpClient, HttpParams } from '@angular/common/http';
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

  getGreenScores(greenScores: GreenScore):Observable<number>{
    const username = sessionStorage.getItem('username');
    return this.http.post<number>(`${this.baseUrl}/greenScore/${username}/calculate`,greenScores);
  }

  getAllGoals(): Observable<any[]> {
    console.log('ok');
    return this.http.get<any[]>(this.baseUrl+`/goals/allGoals`);
  }

  getTrendsData(category: string): Observable<TrendsDto[]> {
    const username = sessionStorage.getItem('username');


    if(category === 'wastage'){
      return this.http.get<TrendsDto[]>(
        `${this.baseUrl}/WasteProduction/${username}/analytics`
      );
    }else if(category === 'transportation'){
      return this.http.get<TrendsDto[]>(
        `${this.baseUrl}/transportation/${username}/analytics`
      );
    }else if(category === 'household'){
      return this.http.get<TrendsDto[]>(
        `${this.baseUrl}/energy/${username}/analytics`
      );
    }else{
      return this.http.get<TrendsDto[]>(
        `${this.baseUrl}/greenScore/${username}/analytics`
      );
    }
    
  }

  addGoals(goalId:string) {
    let username = sessionStorage.getItem('username');
    return this.http.post(this.baseUrl+`/user/addGoal/${username}/${goalId}`,{});
  }

  markAsCompleted(goalId:string){
    let username = sessionStorage.getItem('username');
    return this.http.post(this.baseUrl+`/user/checkGoal/${username}/${goalId}`,{});
  }

  getUserGoalIds(): Observable<string[]> {
    let username = sessionStorage.getItem('username');  
    console.log(username);
    return this.http.get<string[]>(`${this.baseUrl}/user/getGoals/${username}`);
  }

  getUserCheckedGoals():Observable<string[]> {
    let username = sessionStorage.getItem('username');  
    console.log(username);
    return this.http.get<string[]>(`${this.baseUrl}/user/getCheckedGoals/${username}`);
  }


  getGoalsByIds(goalIds: string[]): Observable<Task[]> {
    const body = { goalIds }; 
    return this.http.post<Task[]>(`${this.baseUrl}/goals/getMyGoals`, body);
  }

  updateCoinBalance(coins:number):Observable<number>{
    let username = sessionStorage.getItem('username');
    return this.http.post<number>(`${this.baseUrl}/user/updateBalance/${username}?coins=${coins}`,{});
  }
  

  getLatestWasteEmission():Observable<number>{
    let username = sessionStorage.getItem('username');

    return this.http.get<number>(`${this.baseUrl}/WasteProduction/${username}/latest`);
  }

  getLatestTransportEmission():Observable<number>{
    let username = sessionStorage.getItem('username');

    return this.http.get<number>(`${this.baseUrl}/transportation/${username}/latest`);
  }

  getLatestHouseholdEmission():Observable<number>{
    let username = sessionStorage.getItem('username');

    return this.http.get<number>(`${this.baseUrl}/energy/${username}/latest`);
  }


  getAllEnergyData():Observable<any>{
    let username = sessionStorage.getItem('username');
    return this.http.get(this.baseUrl+`/energy/${username}/getAll`);
  }

  getAllTransportationData():Observable<any>{
    let username = sessionStorage.getItem('username');
    return this.http.get(this.baseUrl+`/transportation/${username}/getAll`);
  }
  getAllWasteData():Observable<any>{
    let username = sessionStorage.getItem('username');
    return this.http.get(this.baseUrl+`/WasteProduction/${username}/getAll`);
  }

}

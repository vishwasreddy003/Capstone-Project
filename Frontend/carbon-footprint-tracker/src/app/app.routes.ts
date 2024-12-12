import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnergyWasteComponent } from './energy-waste/energy-waste.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StoreComponent } from './store/store.component';
import { TransportationComponent } from './transportation/transportation.component';
import { WasteProductionComponent } from './waste-production/waste-production.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'waste',component:WasteProductionComponent},
    {path:'transport',component:TransportationComponent},
    {path:'energy',component:EnergyWasteComponent},
    {path:'analytics', component:AnalyticsComponent},
    {path:'store',component:StoreComponent},
    {path:'getStarted',component:GetStartedComponent},
    {path: 'error', component: ErrorPageComponent},
    {path:'history',component:HistoryComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        }),
    ],
    exports:[RouterModule],

})

export class AppRoutingModule {}

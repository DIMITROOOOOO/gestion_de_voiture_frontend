import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/componants/sign-up/sign-up.component';
import { LoginComponent } from './auth/componants/login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuAdminComponent } from './modules/admin/componants/menu-admin/menu-admin.component';
import { MenuGestionnaireComponent } from './modules/user/componants/menu-gestionnaire/menu-gestionnaire.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    {path :"register", component :SignUpComponent},
    {path :"login", component :LoginComponent},
    {path:"menu-admin", component:MenuAdminComponent},
    {
        path: 'menu-gestionnaire',
        component: MenuGestionnaireComponent,
        children: [
          {
            path: 'car',
            loadChildren: () =>
              import('./modules/user/componants/car/car.module').then((m) => m.CarModule),
          },
          {
            path: 'driver',
            loadChildren: () =>
              import('./modules/user/componants/driver/driver.module').then((m) => m.DriverModule),
          },
          {
            path: 'maintenance',
            loadChildren: () =>
              import('./modules/user/componants/maintenance/maintenance.module').then((m) => m.MaintenanceModule),
          },
          {
            path: 'report',
            loadChildren: () =>
              import('./modules/user/componants/report/report.module').then((m) => m.ReportModule),
          },
          { 
            path: 'consommation-vehicule', 
            loadChildren: () => import('./modules/user/componants/consommation-vehicule/consommation-vehicule.module').then(m => m.ConsommationVehiculeModule) 
          },
          { path: '', redirectTo: 'car', pathMatch: 'full' }, // Default route for menu-gestionnaire
        ],
      },
      { path: '**', redirectTo: '' },

];
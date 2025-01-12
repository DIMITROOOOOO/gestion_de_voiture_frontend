import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/componants/sign-up/sign-up.component';
import { LoginComponent } from './auth/componants/login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuAdminComponent } from './modules/admin/componants/menu-admin/menu-admin.component';
export const routes: Routes = [
    { path: '', component: AccueilComponent },
    {path :"register", component :SignUpComponent},
    {path :"login", component :LoginComponent},
    {path:"menu-admin", component:MenuAdminComponent},

];
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MenuGestionnaireComponent } from './componants/menu-gestionnaire/menu-gestionnaire.component';
import { AppComponent } from '../../app.component';

@NgModule({
  declarations: [],
  imports: [
    MenuGestionnaireComponent,
    CommonModule,
    UserRoutingModule,
    
    
  ],
})
export class UserModule {}
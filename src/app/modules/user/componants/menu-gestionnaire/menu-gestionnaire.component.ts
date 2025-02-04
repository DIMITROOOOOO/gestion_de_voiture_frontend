import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu-gestionnaire',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './menu-gestionnaire.component.html',
  styleUrls: ['./menu-gestionnaire.component.css'],
})
  export class MenuGestionnaireComponent {
   
  }
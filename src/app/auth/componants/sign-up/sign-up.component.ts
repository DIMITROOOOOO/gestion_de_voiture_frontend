import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    imports: [FormsModule, CommonModule]
})
export class SignUpComponent {
  user = {
    nom: '', 
    motdepasse: '', 
    email: '',
    role: 'admin' 
  };
  roles = [
    { value: 'gestionnaire', label: 'gestionnaire' },
    { value: 'admin', label: 'admin' },
    { value: 'chauffeur', label: 'chauffeur' }
  ];
  constructor(private UserService: UserService, private router: Router) {}

  onSubmit() {
    this.UserService.createUser(this.user).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/login']); 
        switch (this.user.role) {
          case 'admin':
            this.router.navigate(['/menu-admin']);
            break;
          case 'gestionnaire':
            this.router.navigate(['/menu-gestionnaire']);
            break;
          case 'chauffeur':
            this.router.navigate(['/menu-chauffeur']);
            break;
          default:
            this.router.navigate(['/accueil']); 
            break;
        }
      },
      
      
      error: (error) => {
        console.error('Error creating user:', error);
      }
    });
  }
}
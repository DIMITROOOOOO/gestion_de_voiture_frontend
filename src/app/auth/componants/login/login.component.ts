import { Component } from '@angular/core';
import { UserDto } from '../../../models/user-dto';
import { Role } from '../../../models/enum';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [FormsModule,CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
          animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
        ]),
      ]),
    ],
})
export class LoginComponent {
  showError = false;
    users: UserDto[] = [];
    Role = Role;
    user = {
        email: '',
        motdepasse: '',
      };
    constructor(private UserService: UserService, private router: Router) {}

    onSubmit() {
        this.UserService.login(this.user.email, this.user.motdepasse).subscribe({
          next: (response) => {
            console.log('Login successful', response);
    
            if (response.role === 'admin') {
              this.router.navigate(['/menu-admin']);
            } else if (response.role === 'gestionnaire') {
              this.router.navigate(['/menu-gestionnaire']);
            } else if (response.role === 'chauffeur') {
              this.router.navigate(['/menu-chauffeur']);
            } else {
              console.error('Unknown role:', response.role);
              this.showError = true;
            }
          },
          error: (error) => {
            console.error('Login failed', error);
            this.showError = true;
          },
        });
      }

}

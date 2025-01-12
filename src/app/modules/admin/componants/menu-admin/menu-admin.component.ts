import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../auth/service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../../../models/user-dto';
import { Role } from '../../../../models/enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // For modal handling

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class MenuAdminComponent implements OnInit {
  users: UserDto[] = []; // List of users
  selectedUser: UserDto | null = null; // Selected user for add/edit
  isEditMode: boolean = false; // Toggle between add/edit mode
  loading: boolean = false; // Loading state
  error: string | null = null; // Error state
  userForm: FormGroup; // Reactive form for user data
  Role = Role; // Expose Role enum to the template

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    // Initialize the form
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [Role.GESTIONNAIRE, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users
  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again later.';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  // Open modal for adding a new user
  openAddUserModal(modal: any): void {
    this.isEditMode = false;
    this.selectedUser = null;
    this.userForm.reset({ role: Role.GESTIONNAIRE }); // Reset form with default role
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Open modal for editing a user
  openEditUserModal(modal: any, user: UserDto): void {
    this.isEditMode = true;
    this.selectedUser = user;
    this.userForm.patchValue(user); // Populate form with selected user data
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Save or update user
  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value as UserDto;

    if (this.isEditMode && this.selectedUser) {
      // Update existing user
      this.userService.updateUser({ ...this.selectedUser, ...userData }).subscribe({
        next: () => {
          this.loadUsers();
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.error = 'Failed to update user. Please try again later.';
          console.error('Error updating user:', err);
        }
      });
    } else {
      // Create new user
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.loadUsers();
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.error = 'Failed to create user. Please try again later.';
          console.error('Error creating user:', err);
        }
      });
    }
  }

  // Delete a user
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),
        error: (err) => {
          this.error = 'Failed to delete user. Please try again later.';
          console.error('Error deleting user:', err);
        }
      });
    }
  }
}
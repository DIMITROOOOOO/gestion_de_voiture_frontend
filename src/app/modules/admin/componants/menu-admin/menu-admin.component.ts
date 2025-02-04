import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../auth/service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../../../models/user-dto';
import { Role } from '../../../../models/enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule], 
  providers: [NgbModal],
})
export class MenuAdminComponent implements OnInit {
  users: UserDto[] = [];
  selectedUser: UserDto | null = null;
  isEditMode: boolean = false;
  loading: boolean = false;
  error: string | null = null;
  userForm: FormGroup;
  Role = Role;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', [Validators.required]],
      role: [Role.GESTIONNAIRE, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

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
      },
    });
  }

  openAddUserModal(modal: any): void {
    this.isEditMode = false;
    this.selectedUser = null;
    this.userForm.reset({ role: Role.GESTIONNAIRE });
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  openEditUserModal(modal: any, user: UserDto): void {
    this.isEditMode = true;
    this.selectedUser = user;
    this.userForm.patchValue(user);
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value as UserDto;

    if (this.isEditMode && this.selectedUser) {
      this.userService.updateUser({ ...this.selectedUser, ...userData }).subscribe({
        next: () => {
          this.loadUsers();
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.error = 'Failed to update user. Please try again later.';
          console.error('Error updating user:', err);
        },
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.loadUsers();
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.error = 'Failed to create user. Please try again later.';
          console.error('Error creating user:', err);
        },
      });
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),
        error: (err) => {
          this.error = 'Failed to delete user. Please try again later.';
          console.error('Error deleting user:', err);
        },
      });
    }
  }
}
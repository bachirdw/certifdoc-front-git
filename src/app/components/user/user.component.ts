import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  public refreshing: boolean = false;
  private subscriptions: Subscription[] = [];
  public selectedUser: User | null = null;
  public fileName!: string;
  public profileImage!: File;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getUsers(): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe({
        next: (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.refreshing = false;
        }
      })
    );
  }

  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.clickButton('openUserInfo');
  }

  public onDeleteUser(userId: number): void {
    this.subscriptions.push(
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.getUsers();
        },
        error: (errorResponse: HttpErrorResponse) => {}
      })
    );
  }

  public onAddNewUser(userForm: NgForm): void {
    const formData = this.userService.createUserFormData('', userForm.value, this.profileImage as any);
    this.subscriptions.push(
      this.userService.addUser(formData).subscribe({
        next: (response: User) => {
          this.clickButton('new-user-close');
          this.getUsers();
          this.fileName = '';
          this.profileImage = null as any;
          userForm.reset();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.profileImage = null as any;
        }
      })
    );
  }

  public onProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImage = input.files[0];
      this.fileName = this.profileImage.name;
    }
  }

  public saveNewUser(): void {
    this.clickButton('new-user-save');
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }
}

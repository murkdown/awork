import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserItemComponent } from '../user-item/user-item.component';
import { VirtualScrollComponent } from "../../shared/virtual-scroll/virtual-scroll.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [
    UserItemComponent,
    VirtualScrollComponent
  ]
})
export class UserListComponent {
  users = input.required<User[]>();
  usersSliced: User[] = [];

  onSlice(users: User[]) {
    this.usersSliced = users;
  }
}

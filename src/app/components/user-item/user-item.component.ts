import { Component, input, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {
  user = input.required<User>();
  allUsers = input.required<User[]>();
  isExpanded = signal(false);

  /**
   * Get the count of users with same nationality
   */
  get nationalitiesCount(): number {
    if (!this.allUsers().length) {
      return 0
    }

    return this.allUsers().reduce((acc, user) => {
      return user.nat === this.user().nat ? acc + 1 : acc
    }, 0)
  }

  expand() {
    this.isExpanded.set(!this.isExpanded())
  }
}

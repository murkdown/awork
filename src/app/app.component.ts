import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from './services/users.service'
import { UserGroup } from './models/user.model'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserGroupsComponent } from './components/user-groups/user-groups.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserGroupsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  usersService = inject(UsersService);

  userGroups: UserGroup[] = [];
  initialUserGroups: UserGroup[] = [];

  constructor() {
    this.usersService.getUsers().pipe(takeUntilDestroyed()).subscribe(users => {
      if (typeof Worker !== 'undefined') {
        const worker = new Worker(new URL('./services.worker.ts', import.meta.url));
        worker.onmessage = ({ data }) => {
          this.userGroups = data;
          this.initialUserGroups = data;
        }
        worker.postMessage(users);
      } else {
        this.userGroups = [];
      }
    })
  }

  onFilterBy(searchQuery: string) {
    const filtered = this.initialUserGroups.map(group => {
      return {
        ...group,
        users: group.users.filter(u => u.lastname?.includes(searchQuery))
      }
    });
    this.userGroups = filtered;
  }
}

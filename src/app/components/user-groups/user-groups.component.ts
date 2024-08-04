import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UserGroup } from '../../models/user.model';
import { UserListComponent } from "../user-list/user-list.component";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";
import { VirtualScrollComponent } from "../../shared/virtual-scroll/virtual-scroll.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-groups',
  standalone: true,
  imports: [
    UserListComponent,
    InfiniteScrollDirective,
    VirtualScrollComponent,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-groups.component.html',
  styleUrl: './user-groups.component.scss'
})
export class UserGroupsComponent {
  userGroups = input.required<UserGroup[]>();
  userGroupsSliced: UserGroup[] = [];
  searchQuery = '';
  filterUsers = output<string>();


  onSlice(userGroups: UserGroup[]) {
    this.userGroupsSliced = userGroups;
  }

  onFilterUsers() {
    this.filterUsers.emit(this.searchQuery);
  }
}

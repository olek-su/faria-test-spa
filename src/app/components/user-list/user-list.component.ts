import { Component, inject } from '@angular/core';
import { UserListApiService } from '../../services/user-list.api-service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, of, startWith, switchMap, take } from 'rxjs';
import { UserData } from '../../models/user-data.model';
import { FormatDatePipe } from '../../pipes/formatted-date.pipe';
import { UserIconComponent } from '../user-icon/user-icon.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatDatePipe, UserIconComponent], 
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private readonly userListApiService = inject(UserListApiService);

	public readonly filter = new FormControl('', { nonNullable: true });
  
  public allUsers$ = new BehaviorSubject<UserData[]>([]);

  public usersFiltered$ = this.filter.valueChanges.pipe(
    startWith(''),
    switchMap((text) => {
      return combineLatest([of(text), this.allUsers$])
    }),
    map(([query, users]) => {
      return users.filter(x => x.name.toUpperCase().includes(query.toUpperCase()))
    }),
  );

  public ngOnInit(): void {
    this.userListApiService.getUsers$().pipe(
      take(1),
      map(users => users.sort((a, b) => a.name.localeCompare(b.name))),
    ).subscribe((result) => {
      this.allUsers$.next(result);
    });
  }

  public resetBalances(): void {
    const allUsers = this.allUsers$.value;
    const updatedUsers = allUsers.map((user) => ({ ...user, balance: '0' }))
    this.allUsers$.next(updatedUsers);
  }
}

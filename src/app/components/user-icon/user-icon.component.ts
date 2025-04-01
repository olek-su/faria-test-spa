import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { UserListApiService } from '../../services/user-list.api-service';
import { take } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.scss'
})
export class UserIconComponent implements OnInit {
  public imageUrl: SafeUrl | undefined;

  @Input() public iconName: string | null = null;

  private readonly userService = inject(UserListApiService);
  private readonly sanitizer = inject(DomSanitizer);

  public ngOnInit(): void {
    this.userService.getUserIcon$(this.iconName ?? 'unknown')
      .pipe(take(1))
      .subscribe((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl); 
      });
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  searchResults: User[] = [];
  searchTerm$ = new Subject<string>();
  isLoading = false;
  isMobileView = false;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkViewport();
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.isLoading = true;
        return this.userService.searchUsers(term);
      })
    ).subscribe(users => {
      this.searchResults = users;
      this.isLoading = false;
    });
  }

  search(term: string): void {
    this.searchTerm$.next(term);
  }

  navigateToProfile(username: string): void {
    this.router.navigate(['/user', username]);
  }

  @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
      this.checkViewport();
    }
    
  checkViewport(): void {
    this.isMobileView = window.innerWidth < 768;
  }
}
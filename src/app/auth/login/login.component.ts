import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/helper/task_dto';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private service: TaskService,
    private utilService: UtilityService
  ) {}
  username = '';
  login() {
    console.log('We are here');
    this.utilService.showLoading();
    this.service.getUsers().subscribe(
      (users: User[]) => {
        this.service
          .getUserByUsername(this.username)
          .subscribe((user: User | null) => {
            if (user) {
              sessionStorage.setItem('loggedInUser', JSON.stringify(user));

              this.utilService.hideLoading();
              this.router.navigate(['/task-list']);
              Swal.fire({
                // position: "top-end",
                icon: 'success',
                title: `Welcome back ${user.name}`,
                showConfirmButton: false,
                timer: 3000,
              });
              // location.reload();
            } else {
              this.utilService.hideLoading();
              Swal.fire({
                // position: "top-end",
                icon: 'error',
                title: 'User not found',
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
      },
      (error) => {
        Swal.fire({
          // position: "top-end",
          icon: 'error',
          title: 'An Error occur, please try again',
          showConfirmButton: false,
          timer: 2000,
        });
        console.error('Error fetching users:', error);
      }
    );
  }
}

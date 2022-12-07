import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private readonly api: ApiService,
  ) { }

  ngOnInit(): void {
    let get = this.api.profile.getProfile();
    get.subscribe({
      next: (data: any) => {
        if (data != null) {
          window.location.href = '/game';
        }
      }
    });
  }

  chooseCivilization(civilization: string) {
    let post = this.api.profile.setCivilization(civilization);
    post.subscribe({
      next: (data: any) => {
        console.log(data);
        // window.location.href = '/game';
      }, error: (error: any) => {
        console.table(error);
      }
    });
  }
}

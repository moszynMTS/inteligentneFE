import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiCaller } from 'src/app/shared/apiCaller';
import { ControllerNames } from 'src/app/shared/controlerNames';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: string | null = this.getCookie('user');
  token: string | null = this.getCookie('token');
  logged: boolean = false;
  username: string = ''; // Store username for display
  loginForm: FormGroup; // Define the login form

  constructor(private apiCaller: ApiCaller, private fb: FormBuilder, private snackBar: MatSnackBar, private translate: TranslateService) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadAccountData();
  }

  loadAccountData() {
    if (this.token == null || this.user == null) {
      //this.login();
    } else {
      this.logged = true;
      this.username = this.user;
    }
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return; // If form is invalid, do not proceed
    }

    const { username, password } = this.loginForm.value;

    this.apiCaller.setControllerPath(ControllerNames.Authorise);
    this.apiCaller.login(username, password).subscribe((res: any) => {
      if (res?.content != null) {
        this.snackBar.open(this.translate.instant('Snackbar.Logged'), this.translate.instant('Snackbar.Close'), {
          duration: 3000,
          horizontalPosition: 'center', 
          verticalPosition: 'bottom'
        });
        this.setUserCookie(res?.content, res?.content?.expirationTime);
        this.username = res?.content?.userName;
        this.logged = true;
      }
    });
  }

  setUserCookie(userData: any, expirationTimeInSeconds: number): void {
    const expiryDate = new Date();
    let minutes = expirationTimeInSeconds / 60;
    expiryDate.setMinutes(expiryDate.getMinutes() + minutes);
    document.cookie = `token=${userData.token}; expires=${expiryDate.toUTCString()}; path=/`;
    document.cookie = `user=${userData.userName}; expires=${expiryDate.toUTCString()}; path=/`;
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

}

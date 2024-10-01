import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  router = inject(Router);
  authService = inject(AuthService);

  isPasswordVisible = signal<boolean>(false);
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      const formValue = {
        username: this.form.value.username || '',
        password: this.form.value.password || '',
      };
      this.authService.login(formValue).subscribe((res) => {
        this.router.navigate(['']);
      });
    }
  }
}

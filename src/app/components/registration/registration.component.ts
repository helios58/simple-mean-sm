import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: any;

  constructor(private fb: FormBuilder, private router: Router,  private authService: AuthService) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe(
        (response: { token: any; }) => {
          this.authService.storeToken(response.token); 
           this.router.navigate(['/home']);  
        },
        (error: { error: { message: string; }; }) => {
          this.errorMessage = error.error.message || 'Register failed';
        }
      );
    }
  }
}

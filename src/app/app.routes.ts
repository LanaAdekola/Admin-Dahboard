import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LeaveComponent } from './leave/leave.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: '/login', 
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: 'profile', component: ProfileComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'leave', component: LeaveComponent },
    { path: 'leave-form', component: LeaveFormComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'create-new-password', component: CreateNewPasswordComponent },

    { path: '**', redirectTo: '/login' } // catch-all route

];
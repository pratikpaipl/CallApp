import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //stockist
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-pass',
    loadChildren: () => import('./auth/forgot-password/reset-pass/reset-pass.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'verify-code',
    loadChildren: () => import('./auth/forgot-password/verification-code/verification-code.module').then(m => m.VerificationCodePageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./task/create/create.module').then(m => m.CreatePageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./task/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPagePageModule)
  },
  { path: '**', redirectTo: '/404' },
];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { useHash: true })
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

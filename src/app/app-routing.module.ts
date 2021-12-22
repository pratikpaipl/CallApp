import { ChangePasswordPage } from './home/settings/profile/change-pass/change-pass.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //stockist
  {
    path: 'home', canActivate: [AuthGuard],
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
    path: 'reset-pass',
    loadChildren: () => import('./auth/forgot-password/reset-pass/reset-pass.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'verify-code',
    loadChildren: () => import('./auth/forgot-password/verification-code/verification-code.module').then(m => m.VerificationCodePageModule)
  },
  {
    path: 'task-list/:type', canActivate: [AuthGuard],
    loadChildren: () => import('./task/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'edit-task', canActivate: [AuthGuard],
    loadChildren: () => import('./task/edit-task/edit-task.module').then(m => m.EditTaskPageModule)
  },
  {
    path: 'view', canActivate: [AuthGuard],
    loadChildren: () => import('./task/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: '0', canActivate: [AuthGuard],
    loadChildren: () => import('./home/settings/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'change-pass', canActivate: [AuthGuard],
    loadChildren: () => import('./home/settings/profile/change-pass/change-pass.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: '1', canActivate: [AuthGuard],
    loadChildren: () => import('./home/settings/notification-settings/notification-settings.module').then(m => m.NotificationSettingsPageModule)
  },
  {
    path: '2', canActivate: [AuthGuard],
    loadChildren: () => import('./home/settings/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: '4', canActivate: [AuthGuard],
    loadChildren: () => import('./home/settings/support/support.module').then(m => m.SupportPageModule)
  },
  {
    path: '5', canActivate: [AuthGuard],
    loadChildren: () => import('./home/settings/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: '7', canActivate: [AuthGuard],
    loadChildren: () => import('./home/settings/privacy/privacy.module').then(m => m.PrivacyPageModule)
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckurlComponent } from './url-checker/checkurl/checkurl.component';
import { HomeComponent } from './url-checker/home/home.component';
import { AuthenticationComponent } from './url-checker/authentication/authentication.component';
import { ExpandurlComponent } from './url-checker/expandurl/expandurl.component';
import { ApiComponent } from './url-checker/api/api.component';
import { DashboardComponent } from './url-checker/dashboard/dashboard.component';
import { AuthGuard } from './common/services/auth.guard';
import { CreditsComponent } from './miscellaneous/credits/credits.component';
import { PrivacypolicyComponent } from './miscellaneous/privacypolicy/privacypolicy.component';
import { OauthComponent } from './url-checker/authentication/oauth/oauth.component';
import { ForgetpasswordComponent } from './url-checker/authentication/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './url-checker/authentication/resetpassword/resetpassword.component';
import { VerifypasswordresetComponent } from './url-checker/authentication/verifypasswordreset/verifypasswordreset.component';

// Determine the current subdomain
const hostname = window.location.hostname;
const subdomain = hostname.split('.')[0];

// Define routes dynamically based on the subdomain
const routes: Routes =
  subdomain === 'docify'
    ? [
        {
          path: '',
          loadChildren: () =>
            import('./doctools/doctools.module').then((m) => m.DoctoolsModule),
        },
      ]
    : [
        { path: '', component: HomeComponent },
        { path: 'checkurl', component: CheckurlComponent },
        {
          path: 'auth',
          component: AuthenticationComponent,
          canActivate: [AuthGuard],
        },
        { path: 'expandurl', component: ExpandurlComponent },
        { path: 'api', component: ApiComponent },
        {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuard],
        },
        { path: 'credits', component: CreditsComponent },
        { path: 'privacypolicy', component: PrivacypolicyComponent },
        { path: 'oauth-callback', component: OauthComponent },
        { path: 'forget-password', component: ForgetpasswordComponent },
        { path: 'reset-password', component: ResetpasswordComponent },
        {
          path: 'verify-password-reset',
          component: VerifypasswordresetComponent,
        },
        {
          path: 'doctools',
          loadChildren: () =>
            import('./doctools/doctools.module').then((m) => m.DoctoolsModule),
        }, // Lazy-load doctools for the main app
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

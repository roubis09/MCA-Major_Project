import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckurlComponent } from './url-checker/checkurl/checkurl.component';
import { HomeComponent } from './url-checker/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { ApiComponent } from './url-checker/api/api.component';
import { ConfirmdialogComponent } from './url-checker/shared/components/confirmdialog/confirmdialog.component';
import { ConfirmdialogModule } from './url-checker/shared/components/confirmdialog/confirmdialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationComponent } from './url-checker/authentication/authentication.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExpandurlComponent } from './url-checker/expandurl/expandurl.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SigninComponent } from './url-checker/authentication/signin/signin.component';
import { RegisterComponent } from './url-checker/authentication/register/register.component';
import { PricingComponent } from './url-checker/api/pricing/pricing.component';
import { DocsComponent } from './url-checker/api/docs/docs.component';
import { HttpInterceptorService } from './common/services/http-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './url-checker/dashboard/dashboard.component';
import { AboutComponent } from './url-checker/home/about/about.component';
import { ServicesComponent } from './url-checker/home/services/services.component';
import { IntersectionObserverDirective } from './common/directives/intersection-observer.directive';
import { WhyusComponent } from './url-checker/home/whyus/whyus.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContactComponent } from './url-checker/home/contact/contact.component';
import { CreditsComponent } from './miscellaneous/credits/credits.component';
import { PrivacypolicyComponent } from './miscellaneous/privacypolicy/privacypolicy.component';
import { ProfileModalComponent } from './common/navbar/profilemodal/profilemodal.component';
import { SimpledialogComponent } from './url-checker/shared/components/simpledialog/simpledialog.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OauthComponent } from './url-checker/authentication/oauth/oauth.component';
import { ForgetpasswordComponent } from './url-checker/authentication/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './url-checker/authentication/resetpassword/resetpassword.component';
import { VerifypasswordresetComponent } from './url-checker/authentication/verifypasswordreset/verifypasswordreset.component';
import { DoctoolsModule } from './doctools/doctools.module';
import { CommonsModule } from './common/common.module';

@NgModule({
  declarations: [
    AppComponent,
    CheckurlComponent,
    HomeComponent,
    ApiComponent,
    AuthenticationComponent,
    ExpandurlComponent,
    SigninComponent,
    RegisterComponent,
    PricingComponent,
    DocsComponent,
    DashboardComponent,
    AboutComponent,
    ServicesComponent,
    IntersectionObserverDirective,
    WhyusComponent,
    ContactComponent,
    CreditsComponent,
    PrivacypolicyComponent,
    ProfileModalComponent,
    SimpledialogComponent,
    OauthComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    VerifypasswordresetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ConfirmdialogModule,
    MatCheckboxModule,
    MatExpansionModule,
    CommonsModule,
    OAuthModule.forRoot(),
  ],
  exports: [ConfirmdialogComponent],
  providers: [
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

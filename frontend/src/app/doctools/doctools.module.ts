import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DigitalsignatureComponent } from './digitalsignature/digitalsignature.component';
import { CommonsModule } from '../common/common.module';
import { DoctoolsRoutingModule } from './doctools-routing.module';
import { UploadComponent } from './digitalsignature/upload/upload.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctoolsNavbarComponent } from './doctools-navbar/doctools-navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    DigitalsignatureComponent,
    UploadComponent,
    DoctoolsNavbarComponent,
  ],
  imports: [
    CommonModule,
    CommonsModule,
    DoctoolsRoutingModule,
    PdfViewerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class DoctoolsModule {}

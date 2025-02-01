import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DigitalsignatureComponent } from './digitalsignature/digitalsignature.component';
import { UploadComponent } from './digitalsignature/upload/upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route for DoctoolsModule
  { path: 'digitalsign', component: DigitalsignatureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild for child routes in feature modules
  exports: [RouterModule],
})
export class DoctoolsRoutingModule {}

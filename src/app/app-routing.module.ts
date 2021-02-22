import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'status', component: StatusComponent },
  { path: '', redirectTo: 'status', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

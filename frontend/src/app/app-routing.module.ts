import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuxLayoutModule } from '@ihk-gfi/lux-components';
import { PageHomeComponent } from './components/pages/page-home/page-home.component';
import { PageErrorComponent } from './components/pages/page-error/page-error.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: '**', component: PageErrorComponent } // Immer als letzte Route !! -> 404!
];

@NgModule({
  imports: [LuxLayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
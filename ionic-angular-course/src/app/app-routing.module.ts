import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { 
    path: 'auth',
    // loadChildren: './auth/auth.module#AuthPageModule'
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule),
  },
  { 
    path: 'places',
    // loadChildren: './places/places.module#PlacesPageModule'
    loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule),
    canLoad: [AuthGuard]
   },
  { 
    path: 'bookings',
    // loadChildren: './bookings/bookings.module#BookingsPageModule', 
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsPageModule),
    canLoad: [AuthGuard] 
  },
  {
    path: 'acerca-de',
    loadChildren: () => import('./shared/acerca-de/acerca-de.module').then( m => m.AcercaDePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home-component/home-component.component';
import { LoginComponent } from './routes/login-component/login-component.component';
import { BookFormComponent } from './routes/book-form-component/book-form-component.component';
import { QuotesComponent } from './routes/quotes-component/quotes-component.component';
import { authGuard } from './services/auth.guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Hem'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Logga in'
  },
  {
    path: 'add-book',
    component: BookFormComponent,
    canActivate: [authGuard],
    title: 'Lägg till bok'
  },
  {
    path: 'edit-book/:id',
    component: BookFormComponent,
    canActivate: [authGuard],
    title: 'Redigera bok'
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    canActivate: [authGuard],
    title: 'Mina citat'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente';
import { ProdutoComponent } from './produto/produto';

export const routes: Routes = [
  { path: '', redirectTo: 'cliente', pathMatch: 'full' },
  { path: 'cliente', component: ClienteComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: '**', redirectTo: 'cliente' }
];

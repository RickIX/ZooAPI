import { Routes } from '@angular/router';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { CuidadosListComponent } from './cuidados-list/cuidados-list.component';
import { CuidadoFormComponent } from './cuidado-form/cuidado-form.component';
import { AnimalStatsComponent } from './animal-stats/animal-stats.component';

export const routes: Routes = [
  { path: 'animals', component: AnimalListComponent },
  { path: 'animals/add', component: AnimalFormComponent },
  { path: 'animals/edit/:id', component: AnimalFormComponent },
  { path: 'animals/stats', component: AnimalStatsComponent },

  { path: 'cuidados', component: CuidadosListComponent },
  { path: 'cuidados/add', component: CuidadoFormComponent },
  { path: 'cuidados/edit/:id', component: CuidadoFormComponent },

  { path: '', redirectTo: '/animals', pathMatch: 'full' },
  { path: '**', redirectTo: '/animals' }
];

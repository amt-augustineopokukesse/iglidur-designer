import { Route } from '@angular/router';
import { ModelComponent } from './pages/model/model.component';
import { MaterialComponent } from './pages/material/material.component';
import { PostProcessingComponent } from './pages/post-processing/post-processing.component';
import { ProducibilityComponent } from './pages/producibility/producibility.component';

export const appRoutes: Route[] = [
    { path: 'model', component: ModelComponent },
    { path: 'material', component: MaterialComponent },
    { path: 'postprocessing', component: PostProcessingComponent },
    { path: 'producibility', component: ProducibilityComponent },
    { path: '', redirectTo: 'model', pathMatch: 'full' },
    { path: '**', redirectTo: 'model' },

];

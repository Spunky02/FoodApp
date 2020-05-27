import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGaurd } from '../auth/auth.gaurd';

const routes : Routes = [
    {path: '', component : RecipesComponent,canActivate : [AuthGaurd]   
    ,children : [
        {path :'', component : RecipeStartComponent },
        {path : 'new', component: RecipeEditComponent},
        {path :':id', component:RecipeDetailComponent},
        {path : ':id/edit', component: RecipeEditComponent}

    ]},
]
@NgModule({
    declarations:[],
    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
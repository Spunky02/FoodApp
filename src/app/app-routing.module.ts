import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AuthComponent} from './auth/auth.component';

const appRoutes : Routes = [
    {path: 'auth' , component : AuthComponent},
    {path : '', redirectTo : '/recipes' , pathMatch :'full'},
    {path:'recipes' , loadChildren : ()=> import('./recipes/recipes.module').then(m=> m.RecipesModule)},
    {path: 'shopping-list' , loadChildren :()=>import('./shopping-list/shopping-list.module').then(m=> m.ShoppingListModule)}
];

@NgModule ({
    imports : [RouterModule.forRoot(appRoutes, { preloadingStrategy : PreloadAllModules})],
    exports : [RouterModule]
})
export class AppRoutingModule{

}
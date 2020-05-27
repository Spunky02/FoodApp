import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class DataStrorageService{
    constructor(private http : HttpClient,
                private recipeService : RecipeService,
                private authService : AuthService){}
     
    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
            return this.http.put('https://foodappdb-5316d.firebaseio.com/recipes.json', recipes,
            {
                params : new HttpParams().set('auth', user.token)
            })
        })).subscribe(
          response => {
             console.log(response);
          }
      )
    }

    fetchRecipes(){
      return  this.authService.user.pipe(
          take(1),
          exhaustMap(user => {
            return this.http.get<Recipe[]>('https://foodappdb-5316d.firebaseio.com/recipes.json',
            {
               params : new HttpParams().set('auth',user.token)
            })
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe , ingredients : recipe.ingredients ? recipe.ingredients : [] }
                })
            })).subscribe(
        recipes => {
            this.recipeService.setRecipes(recipes);
        });
    }
}
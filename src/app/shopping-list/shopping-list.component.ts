import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  ingredients : Ingredient[];
  private idChangedSub : Subscription;
  constructor(private ingredientService : ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getIngredients();
    this.idChangedSub =  this.ingredientService.ingredientsChanged
    .subscribe(
      (ingredients : Ingredient[]) => {
          this.ingredients = ingredients;
      }
    );
  }
  onEditItem(index : number){
      this.ingredientService.startedEditing.next(index);
  }

  ngOnDestroy() : void {
      this.idChangedSub.unsubscribe();
  }
}

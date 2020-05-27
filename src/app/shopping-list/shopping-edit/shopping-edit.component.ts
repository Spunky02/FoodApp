import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static : false}) slForm  : NgForm;
    subscription : Subscription;
    editMode = false;
    editedItemIndex : number; 
    editedItem : Ingredient;
  constructor(private ingredientService : ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.ingredientService.startedEditing
    .subscribe(
        (index : number) => { 
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem  = this.ingredientService.getIngredient(index);
          this.slForm.setValue({
            name : this.editedItem.name,
            amount : this.editedItem.amount
          });
        }
    );
  }

  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
      if(this.editMode){
          this.ingredientService.updateIngredient(this.editedItemIndex,newIngredient);
      } else {
          this.ingredientService.addIngredient(newIngredient);
             }
             this.editMode = false;
             form.reset();
 }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
      this.ingredientService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
}
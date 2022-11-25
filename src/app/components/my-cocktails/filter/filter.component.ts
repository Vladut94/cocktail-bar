import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  withAlcohol!: boolean;

  @Output()
  showFilteredCocktails: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  shouldShowAllCocktails: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showAllCocktails() {
    this.shouldShowAllCocktails.emit(this.withAlcohol);
  }

  showAlcoholicCocktails() {
    this.withAlcohol = true;
    this.showFilteredCocktails.emit(this.withAlcohol);
  }

  showNonAlcoholicCocktails() {
    this.withAlcohol = false;
    this.showFilteredCocktails.emit(this.withAlcohol);
  }
}

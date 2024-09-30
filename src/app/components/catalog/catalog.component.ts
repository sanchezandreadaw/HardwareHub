import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  products!: Product[];

  constructor(
    private sharingService : SharingDataService,
    private productService : ProductService
  ) {}

  ngOnInit(): void {
      if(!this.products) {
        this.products = this.productService.findAll();
      }
  }
  onAddCart(product: Product) {
    this.sharingService.productEventEmitter.emit(product);
  }

}

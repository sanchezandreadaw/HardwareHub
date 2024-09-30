import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();
  private _productEventEmitter : EventEmitter<Product> = new EventEmitter();
  private _itemEventEmitter : EventEmitter<CartItem> = new EventEmitter();

  constructor() { }

  get idProductEventEmitter() : EventEmitter<number> {
    return this._idProductEventEmitter;
  }

  get productEventEmitter() : EventEmitter<Product> {
    return this._productEventEmitter;
  }

  get itemEventEmitter() : EventEmitter<CartItem> {
    return this._itemEventEmitter;
  }
}

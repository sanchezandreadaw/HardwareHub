import { Component, EventEmitter} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  
  items: CartItem[] = [];

  total = 0;
  

  
  constructor(private router : Router, private sharingService : SharingDataService){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }
  onDeleteCart(id: number) {
    this.sharingService.idProductEventEmitter.emit(id);
  }

  incrementQuantity(item: CartItem) {
    item.quantity += 1;
    this.sharingService.itemEventEmitter.emit(item);
}


  decrementQuantity(item : CartItem) {
    if(item.quantity > 1) {
       item.quantity -= 1;
    }
    this.sharingService.itemEventEmitter.emit(item);
  }


}

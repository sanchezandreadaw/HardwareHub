import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import {Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import { showAlertConfirmButton } from '../helpers/helperAlert';
import { showConfirmAlert } from '../helpers/helperAlert';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {


  items: CartItem[] = [];

  total: number = 0;


  constructor(
    private service: ProductService,
    private sharingService : SharingDataService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.onAddCart();
    this.onDeleteCart();
    this.incrementQuantity();
    this.decrementQuantity();
    this.calculateTotal();
  }

  onAddCart(): void {
    this.sharingService.productEventEmitter.subscribe(product => {
      const hasItem = this.items.find(item => item.product.id === product.id);
      if (hasItem) {
        this.items = this.items.map(item => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
      } else {
        this.items = [... this.items, { product: { ...product }, quantity: 1 }];
      }

      showConfirmAlert('Producto agregado correctamente');
      this.calculateTotal();
      this.saveSession();

      this.router.navigate(['/cart'], {
        state : {items : this.items, total : this.total}
      });

    });
  }

  onDeleteCart(): void {
    this.sharingService.idProductEventEmitter.subscribe(id => {
      const item = this.items.find(i => i.product.id == id);
        if(item) {
          showAlertConfirmButton(item).then(result => {
            if (result.isConfirmed) {
                this.items = this.items.filter(item => item.product.id !== id);

                if (this.items.length == 0) {
                    sessionStorage.removeItem('cart');
                    sessionStorage.clear();
                }

                this.calculateTotal();
                this.saveSession();

                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/cart'], {
                        state: { items: this.items, total: this.total }
                    });
                });
            }
        });
        }
      
    });
}


  incrementQuantity() {
    this.sharingService.itemEventEmitter.subscribe(item => {
        this.items = this.items.map(cartItem => {
            if (cartItem.product.id === item.product.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }; 
            }
            return cartItem;
        });
        this.calculateTotal();
        this.saveSession();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], {
                state: { items: this.items, total: this.total }
            });
        });
    });
}

  decrementQuantity() {
    this.sharingService.itemEventEmitter.subscribe(item => {

      this.items = this.items.map(cartItem => {
        if(cartItem.product.id === item.product.id) {
          return {...cartItem, quantity: cartItem.quantity - 1}
        } 
        return cartItem;
      });

      this.calculateTotal();
      this.saveSession();

      this.router.navigateByUrl('/', {skipLocationChange : true}).then(() => {
    
        this.router.navigate(['/cart'], {
          state: { items: this.items, total: this.total }
      });

      })

    })
  }


  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}

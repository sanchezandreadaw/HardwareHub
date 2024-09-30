import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { showConfirmAlert } from '../../helpers/helperAlert';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'payment',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './payment.component.html',
})
export class PaymentComponent {

  paymentData = {
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };
  
  constructor(private router : Router) {}

 
  onSubmit() {
    showConfirmAlert('Pago realizado correctamente. ¡Gracias por su compra!');

    setTimeout( () => {

      sessionStorage.removeItem('cart');
      sessionStorage.clear();
  
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }, 3000)

  }

}

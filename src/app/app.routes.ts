import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
    {path : '', redirectTo: '/catalog', pathMatch : 'full'},
    {path : 'cart', component: CartComponent },
    {path : 'catalog', component: CatalogComponent},
    {path : 'payment', component: PaymentComponent}
];

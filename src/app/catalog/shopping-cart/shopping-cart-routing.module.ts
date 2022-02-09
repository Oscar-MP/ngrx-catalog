import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayCartComponent } from './pay-cart/pay-cart.component';
import { ShoppingCartComponent } from './shopping-cart.component';

const routes: Routes = [
    {
        path: 'resume',
        component: ShoppingCartComponent
    },
    {
        path: 'pay',
        component: PayCartComponent
    },
    {
        path: '**',
        redirectTo: 'resume',
        pathMatch: 'full'
    }
]


@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class ShoppingCartRoutingModule {}
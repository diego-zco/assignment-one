import { Selector } from 'testcafe'

class YourCartPage {
    constructor(){
        this.pageTitle = Selector('.subheader').withExactText('Your Cart')
        this.continueShoppingButton = Selector('.btn_secondary').withExactText('CONTINUE SHOPPING')
        this.checkoutButton = Selector('.btn_action.checkout_button')
        this.cartItems = Selector('.cart_item')
        this.inventoryItemNames = Selector('.inventory_item_name')
    }
}


export default new YourCartPage()
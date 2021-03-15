import { Selector } from 'testcafe'

class OverviewPage {
    constructor(){
        this.pageTitle = Selector('.subheader').withExactText('Checkout: Overview')
        this.cancelButton = Selector('.cart_cancel_link.btn_secondary').withExactText('CANCEL')
        this.continueButton = Selector('.btn_action.cart_button').withExactText('FINISH')
        this.summaryInfo = Selector('.summary_info')
        this.cartList = Selector('.cart_list')
        this.cartItems = Selector('.cart_item')
        this.inventoryItemName = Selector('.inventory_item_name')
        this.inventoryItemPrice = Selector('.inventory_item_price')
        this.itemTotal = Selector('.summary_subtotal_label')
        this.tax = Selector('.summary_tax_label')
        this.total = Selector('.summary_total_label')


    }
}

export default new OverviewPage()
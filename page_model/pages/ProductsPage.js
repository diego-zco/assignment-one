import { Selector, t } from 'testcafe'

class ProductsPage {
    constructor(){
        this.pageTitle = Selector('.product_label').withExactText('Products')
        this.logo = Selector('.app_logo')
        this.burgerMenuButton = Selector('#react-burger-menu-btn')
        this.shoppingCartButton = Selector('#shopping_cart_container')
        this.logoutButton = Selector('#logout_sidebar_link')
        this.addToCartButton = Selector('.btn_inventory')
        this.inventoryItemName = Selector('.inventory_item_name')
        this.inventoryItemPrice = Selector('.inventory_item_price')
    }

    async addElementsToCart(elementsToAdd){
        await t
            // Count of found items in the products page
            const countAvailable = await this.addToCartButton.count
            // List of added elements 
            let elementsSelected = []
            // List of list of added elements
            let listElementsSelected = []
            // Element being reviewed
            var pickedElem = 0
            // Add elements to Array
            for (var i=1; i<=elementsToAdd; i++){
                pickedElem = Math.floor(Math.random() * (countAvailable))
                //Existent element in array?
                while (elementsSelected.includes(pickedElem)){
                    pickedElem = Math.floor(Math.random() * (countAvailable))
                }
                elementsSelected.push(pickedElem)
            }
            // elementsSelected.sort(function(a,b){return b-a});
            for (var i=0; i<elementsSelected.length; i++){
                listElementsSelected.push(
                    [
                    await
                        elementsSelected[i],
                    await 
                        this.inventoryItemName.nth(elementsSelected[i]).innerText,
                    await
                        this.inventoryItemPrice.nth(elementsSelected[i]).innerText
                    ])
                await t.click(this.addToCartButton.nth(elementsSelected[i]))

            }

            // returning a list [itemId, itemName, itemPrice]
            return listElementsSelected
    }
    
}

export default new ProductsPage()
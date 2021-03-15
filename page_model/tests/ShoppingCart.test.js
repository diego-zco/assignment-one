import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import YourCartPage from '../pages/YourCartPage'
import CheckoutPage from '../pages/CheckoutPage'
import OverviewPage from '../pages/OverviewPage'
import ConfirmationPage from '../pages/ConfirmationPage'
import { CREDENTIALS, USER } from '../data/Constants'

fixture('Shopping products fixture testing')
    .page `https://www.saucedemo.com`


//Test Case 4: Navigate to the shopping cart:: Expected result: User navigates to the shopping cart page
test('4 - Navigate to the shopping cart', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await t
        .click(ProductsPage.shoppingCartButton)
        .expect(YourCartPage.pageTitle.exists).ok()

})

//Test Case 5: Add single item to shopping cart :: Expected result: Item has been added to the shopping cart
test('5 - Add a single random item to the shopping cart', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    const elementsToAdd = 1
    await ProductsPage.addElementsToCart(elementsToAdd)
    await t
        .click(ProductsPage.shoppingCartButton)
        .expect(YourCartPage.cartItems.count).eql(elementsToAdd)
        .expect(YourCartPage.inventoryItemNames.count).eql(elementsToAdd)
})

//Test Case 6: Add multiple items to the shopping cart :: Expected result: All he items have been added to the shopping cart
test('6 - Add multiple random items to the shopping cart', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    const totalElements = await ProductsPage.addToCartButton.count
    const elementsToAdd = Math.floor(Math.random() * (totalElements - 2)) + 2
    await ProductsPage.addElementsToCart(elementsToAdd)
    await t
        .click(ProductsPage.shoppingCartButton)
        .expect(YourCartPage.cartItems.count).eql(elementsToAdd)
        .expect(YourCartPage.inventoryItemNames.count).eql(elementsToAdd)
})

//Test Case 7: Continue with missing mail information:: Expected result: Error message is displayed in the user information page
test('7 - Continue at Checkout Page with missing information', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    const totalElements = await ProductsPage.addToCartButton.count
    const elementsToAdd = Math.floor(Math.random() * (totalElements - 2)) + 2
    await ProductsPage.addElementsToCart(elementsToAdd)
    await t
        .click(ProductsPage.shoppingCartButton)
        .click(YourCartPage.checkoutButton)
        .click(CheckoutPage.continueButton)
        .expect(CheckoutPage.errorMessage.innerText).contains("Error:")
        .expect(CheckoutPage.errorMessage.innerText).contains("First Name is required")

})

//Test Case 8: Fill user's information :: Expected result: User navigates to the overview page once the data has been filled
test('8 - Continue to Overview Page with user information', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    const totalElements = await ProductsPage.addToCartButton.count
    const elementsToAdd = Math.floor(Math.random() * (totalElements - 2)) + 2
    await ProductsPage.addElementsToCart(elementsToAdd)
    await t
        .click(ProductsPage.shoppingCartButton)
        .click(YourCartPage.checkoutButton)
        await CheckoutPage.sendUserInfo(USER.USER_ONE.FIRSTNAME, USER.USER_ONE.LASTNAME, USER.USER_ONE.POSTAL_CODE)
        await t
        .expect(OverviewPage.pageTitle.exists).ok()
        .expect(OverviewPage.summaryInfo.exists).ok()
        
})

//Test Case 9: Final order items :: Expected result: items in the overview page match with the added items
test('9 - Items in Overview Page', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    const totalElements = await ProductsPage.addToCartButton.count
    const elementsToAdd = Math.floor(Math.random() * (totalElements - 2)) + 2
    // Using a dictionary to store the details of the products, returned by addElementsToCart
    const listElementsSelected = await ProductsPage.addElementsToCart(elementsToAdd)
    await t
        .click(ProductsPage.shoppingCartButton)
        .click(YourCartPage.checkoutButton)
    await CheckoutPage.sendUserInfo(USER.USER_ONE.FIRSTNAME, USER.USER_ONE.LASTNAME, USER.USER_ONE.POSTAL_CODE)
    await t
        .expect(OverviewPage.cartItems.count).eql(elementsToAdd)
        // Verify every item in the list returned by addElementsToCart
        for (var i=0;i<listElementsSelected.length;i++){
            var elementName = listElementsSelected[i][1]
            var elementPrice = listElementsSelected[i][2]
            await t
                .expect(OverviewPage.inventoryItemName.nth(i).innerText).contains(elementName)
                .expect(OverviewPage.inventoryItemPrice.nth(i).innerText).contains(elementPrice)
        }

})

//Test Case 10: Complete purchase :: Expected result: user navigates to the confirmation page
test('10 - Complete purchase', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    const totalElements = await ProductsPage.addToCartButton.count
    const elementsToAdd = Math.floor(Math.random() * (totalElements - 2)) + 2
    // Using a dictionary to store the details of the products, returned by addElementsToCart
    const listElementsSelected = await ProductsPage.addElementsToCart(elementsToAdd)
    await t
        .click(ProductsPage.shoppingCartButton)
        .click(YourCartPage.checkoutButton)
    await CheckoutPage.sendUserInfo(USER.USER_ONE.FIRSTNAME, USER.USER_ONE.LASTNAME, USER.USER_ONE.POSTAL_CODE)
    await t
        .expect(OverviewPage.cartItems.count).eql(elementsToAdd)
        // Verify every item in the list returned by addElementsToCart
        for (var i=0;i<listElementsSelected.length;i++){
            var elementName = listElementsSelected[i][1]
            var elementPrice = listElementsSelected[i][2]
            await t
                .expect(OverviewPage.inventoryItemName.nth(i).innerText).contains(elementName)
                .expect(OverviewPage.inventoryItemPrice.nth(i).innerText).contains(elementPrice)
        }
    await t
        .click(OverviewPage.continueButton)
        .expect(ConfirmationPage.pageTitle.exists).ok()
        .expect(ConfirmationPage.confirmationText.exists).ok()
        .expect(ConfirmationPage.image.exists).ok()

})

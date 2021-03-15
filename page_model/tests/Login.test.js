import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import { CREDENTIALS } from '../data/Constants'


fixture('Login feature testing')
    .page `https://www.saucedemo.com`


//Test Case 1: Login with a valid user :: Expected result: User navigates to the Product's page  STATUS: DONE
test('1 - Login with valid user', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await t
        .expect(ProductsPage.pageTitle.exists).ok()
        .expect(ProductsPage.logo.exists).ok()
        .expect(ProductsPage.burgerMenuButton.exists).ok()
        .expect(ProductsPage.shoppingCartButton.exists).ok()
})

//Test Case 2: Login with a invalid user :: Expected result: Error message is displayed  STATUS: DONE
test('2 - Login with an invalid user', async t => {
    await LoginPage.performLogin(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD)
    await t
        .expect(LoginPage.errorMessage.exists).ok()
        .expect(LoginPage.errorMessage.innerText).contains("Username and password do not match any user in this service")
})


//Test Case 3: Logout from Products page :: Expected result: User navigates to login page  STATUS: DONE
test('3 - Logout from products page', async t => {
    await LoginPage.performLogin(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await t
        .expect(ProductsPage.pageTitle.exists).ok()
        .expect(ProductsPage.burgerMenuButton.exists).ok()
        .click(ProductsPage.burgerMenuButton)
        .click(ProductsPage.logoutButton)
})

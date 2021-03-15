import { Selector, t } from 'testcafe'

class CheckoutPage {
    constructor(){
        this.pageTitle = Selector('subheader').withExactText('Checkout: Your Information')
        this.firstNameField = Selector('input[id="first-name"]')
        this.lastNameField = Selector('#last-name')
        this.zipCodeField = Selector('#postal-code')
        this.cancelButton = Selector('.cart_cancel_link.btn_secondary').withExactText('CANCEL')
        this.continueButton = Selector('input[value="CONTINUE"]')
        this.errorMessage = Selector('h3[data-test="error"]')

    }

    async sendUserInfo(firstName, lastName, postalCode){
        await t
            .typeText(this.firstNameField, firstName)
            .typeText(this.lastNameField, lastName)
            .typeText(this.zipCodeField, postalCode)
            .click(this.continueButton)

    }
}

export default new CheckoutPage()
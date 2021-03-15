import { Selector } from 'testcafe'

class ConfirmationPage {
    constructor(){
        this.pageTitle = Selector('.subheader').withExactText('Finish')
        this.confirmationText = Selector('.complete-header')
        this.image = Selector('.pony_express')

    }
}

export default new ConfirmationPage()
import { Selector, t } from 'testcafe'

class LoginPage {
    constructor(){
        this.usernameField = Selector('#user-name')
        this.passwordFeild = Selector('#password')
        this.loginButton = Selector('#login-button')
        this.errorMessage = Selector('h3[data-test="error"]')
    }

    async performLogin(username, password){
        await t
            .typeText(this.usernameField, username)
            .typeText(this.passwordFeild, password)
            .click(this.loginButton)
    }
}

export default new LoginPage()
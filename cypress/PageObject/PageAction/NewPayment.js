const variable1= require('../PageElements/NewPayment.json')

export class NewPayment {
    goToNewPaymentPage(){
        cy.get(variable1.newPaymentPageLocators.newPaymentHeader).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.createAPayment).should('contain.text','Create a Payment')
    }
    validateSearchField(search){
        cy.get(variable1.newPaymentPageLocators.searchField).should('be.visible').type(search)
        cy.get(variable1.newPaymentPageLocators.createAPayment).should('contain.text','Create a Payment')
    }
    validateAddRecipient(){
        cy.get(variable1.newPaymentPageLocators.searchField).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.addRecipient).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.addRecipientPageHeading).should('contain.text','Recipient Details')
    }
    selectCurrency(currency){
        cy.get(variable1.newPaymentPageLocators.enterPaymentDetailsHeading).should('contain.text','Enter Payment Details')
        cy.get(variable1.newPaymentPageLocators.selectCurrency).should('exist').click()
        cy.get('[src*="/static/media/'+currency+'"]').eq(0).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.sendAmount).type('170')
    }
    checkFundingMethod(){
        cy.get(variable1.newPaymentPageLocators.fundingMethodHeading).should('contain.text','Funding Method')
        cy.get(variable1.newPaymentPageLocators.fundingMethodField).should('be.visible').click()
        cy.get('[class="ant-select-item-option-content"]').find('Easy Transfer').should('be.disabled')
    }
    validateFxRateTimer(){
        cy.get(variable1.newPaymentPageLocators.fxRateTimer).should('be.visible').should('contain.text','30s')
        cy.wait(30000)
        cy.get(variable1.newPaymentPageLocators.fxRateTimer).should('be.visible').should('contain.text','0s')
        cy.get(variable1.newPaymentPageLocators.fxRateTimer).should('be.visible').should('contain.text','30s')
    }
    validatePayTheRecipient(){
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').should('be.visible').click()
        cy.get("div[title='Payment of Salaries']").click()
        cy.get('.m-t-20 > :nth-child(1) > .ant-card > .ant-card-body > :nth-child(1) > .ant-col > .ant-space > [style=""] > .ant-typography').should('contain.text','Payment Reference')
        cy.get('#paymentReference').should('be.visible').type('Single')
        cy.get('.ant-row-end.m-t-20 > .ant-col > .ant-btn').should('be.visible').click()//procee btn
        cy.get('.ant-typography.fs-24px.medium.dark-green').should('contain.text','Payment Confirmation') // confirmation msg
        cy.get("div[class='ant-row ant-row-center m-t-20'] div:nth-child(2) button:nth-child(1)").should('be.visible').click() //pay btn
        cy.get('.ant-typography.ant-typography-success.fs-24px.medium').should('contain.text',' Payment Booked - ') //Success msg
    }
    validateVeiwPayment(){
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > :nth-child(1) > .ant-btn').click()//view payment
        cy.get(':nth-child(1) > .ant-col > .ant-typography').should('contain.text','Payment History')
    }
    validatePaymentHistory(){
        
    }
    checkSettelment(regular,priority){
        cy.get(variable1.newPaymentPageLocators.createAPaymentPageHeading).should('be.visible')
        cy.get(variable1.newPaymentPageLocators.settelmentRegular).should('be.visible').should(regular)
        cy.get(variable1.newPaymentPageLocators.settelmentPeriority).should('be.visible').should(priority)
    }
    proceedflow(fundingCCY,CCYHeading){
        cy.get(variable1.newPaymentPageLocators.loadingIcon).should('not.exist')
        cy.get('.ant-select-selector').eq(0).click().wait(5000).type(fundingCCY)
        cy.get("span[class='ant-select-selection-item'] div[class='ant-space ant-space-horizontal ant-space-align-center']").should('contain.text',CCYHeading)
        cy.get(variable1.newPaymentPageLocators.loadingIcon).should('not.exist')
    }
    addrecipientDetail(amount ,email){
        cy.get(variable1.newPaymentPageLocators.amount).type(amount)
        cy.get('#email').should('contain.value',email ,{force:true})
        //cy.get(variable1.newPaymentPageLocators.reasonForPaymentDropDown).eq(0).click()
        //cy.get(variable1.newPaymentPageLocators.selectReasonForPayment).eq(0).click({force:true})
        cy.get(variable1.newPaymentPageLocators.paymentReferences).type('Single')
    }
    iNRDetails(){
        cy.get(':nth-child(2) > .ant-col-xs-24 > :nth-child(1) > .ant-col > .ant-space > [style=""] > .ant-typography').should('be.visible').should('contain.text','Invoice Number')
        cy.get('#invoiceNumber').type('345210')
        cy.get('.ant-col-xs-24 > :nth-child(3) > .ant-col > .ant-space > [style=""] > .ant-typography').should('be.visible').should('contain.text','Invoice Date')
        cy.get('#invoiceDate').type('2024-06-26')
    }
    selectFundingMethod(fundingMethod){
        cy.get('.ant-row-space-between > :nth-child(1) > :nth-child(1) > .ant-col > .ant-space > [style=""] > .ant-typography').should('contain.text','Funding Method')
        cy.get(variable1.newPaymentPageLocators.loadingIcon).should('not.exist')
        cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector')
        .click().wait(1000)
        cy.contains(fundingMethod).should('be.visible').click()
    }
    validateYapilyFlow(){
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > :nth-child(1) > .ant-btn').click() //fund via asy transfer btn
        cy.get('.mb-3').should('contain.text','Choose your bank:') //heading
        cy.get('[data-test="search-input"]').type('Modelo Sandbox') // search feild
        cy.get('.hover-effect').click()
        cy.wait(2000)
        cy.get('[data-test="footer-continue-button"]').click()
        cy.get('[data-test="header-title"]').should('contain','Approve your payment')
        cy.get('strong').click()     
        cy.get('.ozone-heading-1').should('have.text','Model Bank')
        cy.get('.ozone-heading-3').should('have.text','Please enter your login details to proceed')
        cy.get(':nth-child(1) > .ozone-input').type('mits')
        cy.get('#passwordField').type('mits')
        cy.get('#loginButton').click({force:true})
        cy.get('.ozone-pis-heading-1').should('have.text','Single Domestic Payment Consents (PIS)')
        cy.get("#radio-10000109010102").click()
        cy.get('#confirmButton').click({force:true})
        cy.wait(5000)
        cy.get('[class="ant-typography muli semi-bold fs-24px purple"]').should('contain.text','Funds could take up to 2 hours to be posted.')
        cy.get('.ant-spin-dot').should('not.exist')
        cy.get(':nth-child(2) > .ant-btn').click()      
    }

    cancelPushFunds() {
        // Click on view payment
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > :nth-child(1) > .ant-btn').should('be.visible').click();
        cy.get(variable1.newPaymentPageLocators.loadingIcon).should('not.exist')
        // Click on the 1st row item
        cy.get('[data-row-key="0"] > :nth-child(2)').should('be.visible').click();
    
        // Now check if the 'Cancel Payment' button exists and is visible
        cy.get('body').find('.ant-btn.ant-btn-danger').then($button => {
            if ($button.length > 0) {
                // If the button exists, click on 'Cancel Payment'
                cy.wrap($button).should('contain.text', 'Cancel Payment').and('be.visible').click();
    
                // Verify the confirmation popover
                cy.get('.ant-popover-inner-content')
                  .should('be.visible')
                  .and('contain.text', 'Are you sure you want to cancel this payment');
                
                // Confirm by clicking the primary 'Yes' button
                cy.get('button[class="ant-btn ant-btn-primary ant-btn-sm"]').should('be.visible').click();
    
                // After confirming, check for one of the possible notifications
                cy.get('body').then(($body) => {
                    if ($body.find('.ant-notification-notice-error').length > 0) {
                        // If error notification appears
                        cy.get('.ant-notification-notice.ant-notification-notice-error.ant-notification-notice-closable')
                          .should('be.visible');
                    } else {
                        // If success notification appears
                        cy.get('div[class="ant-notification ant-notification-top"] div')
                          .should('be.visible').and('contain.text','Payment has been successfully cancelled');
                    }
                });
            }
        });
    }

    cancelEasyTransfer() {
        cy.get(variable1.newPaymentPageLocators.loadingIcon).should('not.exist')
        // Click on the 1st row item
        cy.get('[data-row-key="0"] > :nth-child(2)').should('be.visible').click();
        cy.get(variable1.newPaymentPageLocators.loadingIcon).should('not.exist')
        // Now check if the 'Cancel Payment' button exists and is visible
        cy.get('body').find('.ant-btn.ant-btn-danger').then($button => {
            if ($button.length > 0) {
                // If the button exists, click on 'Cancel Payment'
                cy.wrap($button).should('contain.text', 'Cancel Payment').and('be.visible').click();
    
                // Verify the confirmation popover
                cy.get('.ant-popover-inner-content')
                  .should('be.visible')
                  .and('contain.text', 'Are you sure you want to cancel this payment');
                
                // Confirm by clicking the primary 'Yes' button
                cy.get('button[class="ant-btn ant-btn-primary ant-btn-sm"]').should('be.visible').click();
    
                // After confirming, check for one of the possible notifications
                cy.get('body').then(($body) => {
                    if ($body.find('.ant-notification-notice-error').length > 0) {
                        // If error notification appears
                        cy.get('.ant-notification-notice.ant-notification-notice-error.ant-notification-notice-closable')
                          .should('be.visible');
                    } else {
                        // If success notification appears
                        cy.get('div[class="ant-notification ant-notification-top"] div')
                          .should('be.visible').and('contain.text','Payment has been successfully cancelled');
                    }
                });
            }
        });
    }
}
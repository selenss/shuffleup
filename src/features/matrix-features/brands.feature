@brands @matrix(brand,currency,payment)
Feature: Brand pages validation

Background:
  Given I navigate to Mock Casino homepage
  And I login with "username1" and "password1"

Scenario Outline: Brand currency and payment validation

  When I open "<brand>" brand page
  Then I should see "<currency>" currency text
  And I should see "<payment>" payment button

Examples:
<<matrix>>

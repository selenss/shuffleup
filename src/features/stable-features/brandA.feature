@brandA
Feature: Brand A pages validation

Background:
  Given I navigate to Mock Casino homepage
  And I login with "username1" and "password1"
  And I open "brandA" brand page

Scenario Outline: Brand currency deposit validation 
  Then I should see default deposit for currency "<currency>" is "<default_deposit>"
  And I click "<action_button>" button for "<currency>" - balance is "<balance>"
  Then I see current deposit is "<current_deposit>" "<currency>"

Examples:
| currency | default_deposit | action_button | current_deposit | balance  |
| EUR      | 100             | Win           | 110             | 10       |
| USD      | 100             | Loose         | 90              | 10       |
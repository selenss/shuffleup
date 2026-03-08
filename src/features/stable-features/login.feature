@login
Feature: Login to Mock Casino

Background:
    Given I navigate to Mock Casino homepage
    Then I verify login form

Scenario Outline: Complete login
    And I type username "<username>"
    And I type password "<password>"
    And I click on the login button
    Then I verify Brands page title
    Then I verify Brands page URL
    Then I see brand "<brand_name>" button

Examples:
| username  | password  | brand_name |
| username1 | password1 | Brand A    |
| username2 | password2 | Brand B    |
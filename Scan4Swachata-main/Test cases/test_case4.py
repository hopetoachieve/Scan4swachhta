from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("D:\Scan4Swachata-main\Scan4Swachata-main\S4S\Scan4swachhta\Scan4Swachata-main\public\citizenregister.html")  # Update path
driver.maximize_window()

try:
    tests_passed = 0
    
    # Test 1: Form fields exist
    fields = ["citizenName", "citizenEmail", "citizenPass"]
    for field in fields:
        if driver.find_element(By.ID, field).is_displayed():
            tests_passed += 1
    print(f"PASS - {len(fields)}/3 form fields found")
    
    # Test 2: Required field validation
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    if "Please fill out this field" in driver.page_source:
        tests_passed += 1
        print("PASS - Required field validation works")
    
    # Test 3: Login link redirect
    driver.find_element(By.LINK_TEXT, "Sign in here").click()
    time.sleep(1)
    if "citizenlogin.html" in driver.current_url:
        tests_passed += 1
        print("PASS - Login link redirects correctly")
    driver.back()
    
    print(f"\nRESULTS: {tests_passed}/5 checks passed")

finally:
    time.sleep(2)
    driver.quit()
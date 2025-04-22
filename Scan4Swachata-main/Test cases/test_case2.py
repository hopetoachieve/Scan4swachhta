from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# 1. SETUP - Start browser and open landing page
driver = webdriver.Chrome()
driver.get("D:\Scan4Swachata-main\Scan4Swachata-main\S4S\Scan4swachhta\Scan4Swachata-main\public\landing.html")  # Update this path
driver.maximize_window()

# 2. TEST CASES
tests_passed = 0

try:
    # Test 1: Check page title
    if "Scan4Swachhta" in driver.title:
        print("PASS - Correct page title")
        tests_passed += 1
    else:
        print("FAIL - Wrong title")

    # Test 2: Verify logo is displayed
    logo = driver.find_element(By.CSS_SELECTOR, ".logo img")
    if logo.is_displayed():
        print("PASS - Logo visible")
        tests_passed += 1
    else:
        print("FAIL - Logo missing")

    # Test 3: Check loading spinner animation
    spinner = driver.find_element(By.CLASS_NAME, "spinner")
    if spinner.is_displayed():
        print("PASS - Loading spinner visible")
        tests_passed += 1
    else:
        print("FAIL - Spinner missing")

    # Test 4: Verify loading message
    message = driver.find_element(By.CLASS_NAME, "message")
    if "Creating cleaner cities" in message.text:
        print("PASS - Correct loading message")
        tests_passed += 1
    else:
        print("FAIL - Wrong loading message")

    # Test 5: Check auto-redirect (wait 5 seconds)
    time.sleep(5)
    if "index.html" in driver.current_url:
        print("PASS - Auto-redirect worked")
        tests_passed += 1
    else:
        print("FAIL - No redirect happened")

    # 3. RESULTS SUMMARY
    print(f"\nRESULTS: {tests_passed}/5 tests passed")

finally:
    time.sleep(2)  # Keep browser open briefly
    driver.quit()
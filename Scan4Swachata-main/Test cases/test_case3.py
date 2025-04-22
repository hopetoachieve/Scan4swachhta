from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# 1. SETUP - Start browser and open page
driver = webdriver.Chrome()
driver.get("D:\Scan4Swachata-main\Scan4Swachata-main\S4S\Scan4swachhta\Scan4Swachata-main\public\index.html")  # Update this path
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

    # Test 2: Verify navigation links
    nav_links = driver.find_elements(By.CSS_SELECTOR, ".nav-links a")
    if len(nav_links) >= 3:
        print("PASS - Navigation links found")
        tests_passed += 1
    else:
        print("FAIL - Missing navigation links")

    # Test 3: Check main buttons
    buttons = driver.find_elements(By.CSS_SELECTOR, ".btn")
    if len(buttons) >= 3:
        print("PASS - All role buttons present")
        tests_passed += 1
    else:
        print("FAIL - Missing buttons")

    # Test 4: Test theme toggle
    try:
        toggle = driver.find_element(By.CLASS_NAME, "theme-toggle")
        toggle.click()
        time.sleep(1)  # Visual confirmation
        print("PASS - Theme toggle works")
        tests_passed += 1
    except:
        print("FAIL - Theme toggle broken")

    # Test 5: Verify footer
    footer = driver.find_element(By.TAG_NAME, "footer").text
    if "Developed by" in footer:
        print("PASS - Footer content correct")
        tests_passed += 1
    else:
        print("FAIL - Footer missing")

    # 3. RESULTS SUMMARY
    print(f"\nRESULTS: {tests_passed}/5 tests passed")

finally:
    time.sleep(2)  # Keep browser open for 2 seconds
    driver.quit()
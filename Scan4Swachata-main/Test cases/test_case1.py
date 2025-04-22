from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Start browser session
driver = webdriver.Chrome()
driver.get("D:\Scan4Swachata-main\Scan4Swachata-main\S4S\Scan4swachhta\Scan4Swachata-main\public\index.html")  # Replace with actual file path
driver.maximize_window()

try:
    # ✅ 1. Check Page Title
    assert "Scan4Swachhta" in driver.title
    print("✅ Title verified")

    # ✅ 2. Check Navigation Links
    nav_links = ["Home", "About Us", "Contact"]
    for link_text in nav_links:
        assert driver.find_element(By.LINK_TEXT, link_text).is_displayed()
    print("✅ Navigation links verified")

    # ✅ 3. Check Main Buttons
    assert driver.find_element(By.LINK_TEXT, "Citizen Portal").is_displayed()
    assert driver.find_element(By.LINK_TEXT, "Garbage Collector").is_displayed()
    assert driver.find_element(By.LINK_TEXT, "Government Officer").is_displayed()
    print("✅ Main role buttons verified")

    # ✅ 4. Test Theme Toggle
    toggle = driver.find_element(By.CLASS_NAME, "theme-toggle")
    toggle.click()
    time.sleep(1)
    toggle.click()
    print("✅ Theme toggle works")

    # ✅ 5. Check Footer
    footer_text = driver.find_element(By.TAG_NAME, "footer").text
    assert "Developed by" in footer_text
    print("✅ Footer verified")

finally:
    time.sleep(3)
    driver.quit()

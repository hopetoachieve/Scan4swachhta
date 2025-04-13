from selenium import webdriver

try:
    driver = webdriver.Chrome()  # or Firefox(), Edge()
    driver.get("https://www.google.com")
    print("Browser opened successfully!")
    driver.quit()
except Exception as e:
    print("Error:", e)
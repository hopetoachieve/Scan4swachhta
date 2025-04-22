import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class TestLandingPage(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("D:\Scan4Swachata-main\Scan4Swachata-main\S4S\Scan4swachhta\Scan4Swachata-main\public\landing.html")  # Local path to the landing.html
        self.driver.maximize_window()

    def tearDown(self):
        time.sleep(1)
        self.driver.quit()

    def test_page_load(self):
        logo = self.driver.find_element(By.CLASS_NAME, "logo")
        message = self.driver.find_element(By.TAG_NAME, "message")
        self.assertTrue(logo.is_displayed())
        self.assertIn("Creating cleaner cities", message.text)

    def test_auto_redirect(self):
        time.sleep(5)
        self.assertIn("index.html", self.driver.current_url)

    def test_animation(self):
        logo = self.driver.find_element(By.CLASS_NAME, "logo")
        style = logo.get_attribute("style")
        self.assertIn("opacity", style)

    def test_responsive_layout(self):
        self.driver.set_window_size(360, 640)
        container = self.driver.find_element(By.CLASS_NAME, "loader-container")
        self.assertTrue(container.is_displayed())
        self.driver.set_window_size(1024, 768)

    def test_content_display(self):
        content = self.driver.find_element(By.TAG_NAME, "p").text
        self.assertIn("Creating cleaner cities", content)

if __name__ == "__main__":
    unittest.main()

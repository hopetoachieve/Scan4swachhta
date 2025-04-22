import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

import socket

def find_available_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        return s.getsockname()[1]

@pytest.fixture
def base_url():
    port = find_available_port()
    os.system(f"python -m http.server {port} &")
    yield f"http://localhost:{port}"
    os.system("pkill -f 'python -m http.server'")
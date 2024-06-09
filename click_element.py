from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# オプションなしでChromeブラウザを起動
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

def click_privacy_policy_checkbox():
    try:
        # 指定されたURLを開く
        driver.get('https://www.miraxia.com/business/emotion/emotion-app/')
        
        # idを指定して要素を探す
        checkbox = driver.find_element(By.ID, "emotion-app-privacy-policy-input")
        
        # 要素が見つかったらクリック
        checkbox.click()
        
        print("チェックボックスがクリックされました。")
    except Exception as e:
        print(f"エラーが発生しました: {e}")
    finally:
        # お好みでブラウザを閉じる
        while True:
            print("1")
        # driver.quit()

click_privacy_policy_checkbox()
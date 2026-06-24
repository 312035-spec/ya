# 日語學習網站

這是一個純前端日文學習網站原型，支援：

- 直接使用內建單字庫與自訂單字
- 新增個人單字並直接顯示中文翻譯、詞性、例句
- 個人單字儲存在瀏覽器 localStorage 中
- 內建基本單字庫
- 3 種學習模式：翻牌、選擇題、打字練習
- 自動填入單字資訊（從內建詞庫中查詢）

## 專案結構

- `frontend/`
  - `index.html`：網站主頁
  - `style.css`：樣式設計
  - `app.js`：前端互動、Google 登入與資料串接
- `gas/`
  - `Code.gs`：Apps Script 後端邏輯
  - `appsscript.json`：Apps Script 專案設定
- `package.json`：本地測試腳本
- `.gitignore`

## 本地測試

建議使用本地靜態伺服器載入前端檔案：

```bash
cd /workspaces/ya
npm run start
```

啟動後，打開瀏覽器並前往：

```text
http://127.0.0.1:8080
```

若未安裝 Node.js，也可直接使用 Python：

```bash
cd /workspaces/ya/frontend
python3 -m http.server 8080
```

## Google Cloud / Google Apps Script 設定

1. 前往 Google Cloud Console，建立 OAuth 2.0 用戶端 ID。
2. 將 `frontend/app.js` 中的 `CLIENT_ID` 改為你取得的 Client ID。
3. 建立 Google Spreadsheet，取得試算表 ID。
4. 將 `gas/Code.gs` 中的 `SPREADSHEET_ID` 改成你的 Spreadsheet ID。
5. 開啟 [Google Apps Script](https://script.google.com/)，建立新專案，貼上 `gas/Code.gs` 與 `gas/appsscript.json`。
6. 部署為 Web App，設定「任何有 Google 帳號的人」可存取。
7. 將部署後的 Web App URL 填入 `frontend/app.js` 的 `GAS_WEB_APP_URL`。

## 部署到正式網站

前端部分為純靜態網站，可部署到 GitHub Pages、Netlify、Vercel 等平台。部署時務必先完成：

- `CLIENT_ID` 設定
- `GAS_WEB_APP_URL` 設定
- `SPREADSHEET_ID` 設定

## 功能說明

- `Google 登入`：使用 Google OAuth 2.0 ID Token 驗證使用者；登入後即可管理個人單字。
- `新增單字`：使用者可手動輸入日文與中文翻譯，並儲存詞性與例句。
- `自動填入`：呼叫 GAS Web App 的 `lookup` API，從 Jisho API 查詢翻譯內容。
- `資料儲存`：使用者儲存的單字會寫入 Google Spreadsheet，並依 Email 讀取個人資料。
- `學習模式`
  - `翻牌模式`：顯示日文詞彙後點擊顯示翻譯與例句。
  - `選擇題模式`：隨機題目與四個選項。
  - `打字練習`：輸入中文翻譯並檢查答案。

## 注意事項

- `GAS_WEB_APP_URL` 必須使用已部署 Web App 的 URL。
- 本範例採用 `token` URL / POST 參數方式傳遞 ID Token。
- 如遇 CORS 或跨域問題，請確認 Apps Script Web App 的訪問權限和來源設定。
- 若要正式上線，建議將 `CLIENT_ID` 與 `GAS_WEB_APP_URL` 改成正式環境值。

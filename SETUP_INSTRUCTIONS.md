# 日語學習網站部署與資料流程完整教學

本文件詳細記錄如何將候選單字全部放在 Google 試算表中，並讓前端透過 Google Apps Script 讀取第一個工作表的字卡資料；同時在管理頁新增單字後，點擊「儲存」由後端寫入 Google 試算表。

---

## 1. Google 試算表準備

### 1.1 建立試算表

1. 登入 Google 帳號，開啟 https://docs.google.com/spreadsheets/。
2. 建立一個新的試算表，命名為 `JapaneseVocabulary` 或你想要的名稱。
3. 第一個工作表保留做「字卡」資料來源，請命名為 `Sheet1`。
4. 第二個工作表命名為 `管理`，用來紀錄新增與管理單字。

### 1.2 設定欄位

#### `Sheet1` 字卡欄位

| 欄位 | 標題 | 說明 |
|---|---|---|
| A | 日文 | 日文單字 |
| B | 中文翻譯 | 中文意思 |
| C | 例句 | 例句示範 |
| D | 詞性 | 詞性（如：名詞、動詞） |
| E | 讀音 | 假名讀音（可選） |

#### `管理` 欄位

| 欄位 | 標題 | 說明 |
|---|---|---|
| A | 日文 | 日文單字 |
| B | 中文翻譯 | 中文意思 |
| C | 例句 | 例句示範 |
| D | 詞性 | 詞性 |
| E | 讀音 | 假名讀音 |
| F | 狀態 | 記錄是否已儲存 |

> `Sheet1` 用於前端字卡資料，`管理` 用於後端新增紀錄備份與管理。

---

## 2. 建立 Google Apps Script 後端

### 2.1 建立 Apps Script 專案

1. 開啟 Google Apps Script： https://script.google.com/。
2. 建立一個新專案。
3. 刪除預設的 `Code.gs` 內容，並貼上以下完整程式碼：

```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const CARD_SHEET_NAME = 'Sheet1';
const MANAGE_SHEET_NAME = '管理';

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  const action = (e.parameter.action || '').toString();
  try {
    if (action === 'lookup') {
      return lookupWord(e.parameter.word || '');
    }
    if (action === 'getCardWords') {
      return getCardWords();
    }
    if (action === 'saveWord') {
      const data = parsePostData(e);
      return saveWord(data);
    }
    return jsonResponse({ success: false, message: '不支援的 action' });
  } catch (err) {
    return jsonResponse({ success: false, message: err.message || '伺服器錯誤' });
  }
}

function parsePostData(e) {
  const params = e.parameter || {};
  return {
    word: params.word,
    meaning: params.meaning,
    example: params.example,
    pos: params.pos,
    reading: params.reading
  };
}

function getCardWords() {
  const sheet = getSheet(CARD_SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return jsonResponse({ success: true, words: [] });
  }
  rows.shift();
  const words = rows.map((row) => ({
    japanese: row[0] || '',
    meaning: row[1] || '',
    example: row[2] || '',
    pos: row[3] || '',
    reading: row[4] || ''
  }));
  return jsonResponse({ success: true, words });
}

function saveWord(data) {
  if (!data.word || !data.meaning) {
    return jsonResponse({ success: false, message: '日文與中文翻譯為必填欄位。' });
  }
  const cardSheet = getSheet(CARD_SHEET_NAME);
  const manageSheet = getSheet(MANAGE_SHEET_NAME);
  cardSheet.appendRow([data.word, data.meaning, data.example || '', data.pos || '', data.reading || '']);
  manageSheet.appendRow([new Date(), data.word, data.meaning, data.example || '', data.pos || '', data.reading || '', '已儲存']);
  return jsonResponse({ success: true, message: '單字已儲存至字卡與管理工作表。' });
}

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === CARD_SHEET_NAME) {
      sheet.appendRow(['日文', '中文翻譯', '例句', '詞性', '讀音']);
    } else {
      sheet.appendRow(['Timestamp', '日文', '中文翻譯', '例句', '詞性', '讀音', '狀態']);
    }
  }
  return sheet;
}

function lookupWord(word) {
  const query = encodeURIComponent(word || '');
  if (!query) return jsonResponse({ success: false, message: '請提供要查詢的單字。' });
  const url = `https://jisho.org/api/v1/search/words?keyword=${query}`;
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  const data = JSON.parse(response.getContentText());
  if (!data.data || data.data.length === 0) {
    return jsonResponse({ success: false, message: '查無結果。' });
  }
  const entry = data.data[0];
  const japanese = entry.japanese[0] || {};
  const senses = entry.senses[0] || {};
  return jsonResponse({
    success: true,
    japanese: japanese.word || word,
    reading: japanese.reading || '',
    meaning: (senses.english_definitions || []).join(', '),
    pos: (senses.parts_of_speech || []).join(', '),
    example: `${japanese.word || word} ${japanese.reading ? `(${japanese.reading})` : ''}`
  });
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doOptions() {
  return jsonResponse({ success: true });
}
```

### 2.2 取得試算表 ID

1. 開啟你建立的試算表。
2. 從瀏覽器網址列複製中間的 ID：

   `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`
3. 將 `YOUR_SPREADSHEET_ID_HERE` 改成這個 ID。

### 2.3 部署 Web App

1. 在 Apps Script 編輯器，點選 `部署` > `新增部署`。
2. 選擇 `Web 應用程式`。
3. `誰有權存取` 選擇「任何人」或「任何有 Google 帳號的人」。
4. 記下部署後的 Web App URL。

---

## 3. 前端設定

### 3.1 填入 `frontend/app.js` 參數

打開 `frontend/app.js`，填入：

- `CLIENT_ID`：Google Cloud OAuth 2.0 用戶端 ID
- `GAS_WEB_APP_URL`：Apps Script Web App URL

### 3.2 前端需要的欄位

確認 `frontend/index.html` 中有：

- `id="jp-word"`
- `id="cn-meaning"`
- `id="pos"`
- `id="reading"`
- `id="example"`
- `id="auto-fill"`
- `id="save-word"`

### 3.3 讀取與儲存函式

以下前端程式碼已支援：

```javascript
async function loadCardWords() {
  try {
    const url = `${GAS_WEB_APP_URL}?action=getCardWords`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    cardWords = Array.isArray(data.words) ? data.words : [];
    renderVocabList();
  } catch (error) {
    console.error(error);
    showMessage('讀取字卡資料失敗，請稍後重試。', 'error');
  }
}

async function saveWord() {
  if (!user) {
    showMessage('請先登入 Google。', 'error');
    return;
  }
  const word = jpInput.value.trim();
  const meaning = cnInput.value.trim();
  const pos = posInput.value.trim();
  const example = exampleInput.value.trim();
  const reading = readingInput ? readingInput.value.trim() : '';
  if (!word || !meaning) {
    showMessage('請輸入日文與中文翻譯。', 'error');
    return;
  }
  const body = new URLSearchParams();
  body.append('action', 'saveWord');
  body.append('token', user.token);
  body.append('word', word);
  body.append('meaning', meaning);
  body.append('pos', pos);
  body.append('example', example);
  body.append('reading', reading);
  const response = await fetch(GAS_WEB_APP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });
  const data = await response.json();
  if (data.success) {
    showMessage('已儲存單字。');
    jpInput.value = '';
    cnInput.value = '';
    posInput.value = '';
    exampleInput.value = '';
    if (readingInput) readingInput.value = '';
    await loadCardWords();
  } else {
    showMessage(data.message || '儲存失敗', 'error');
  }
}
```

---

## 4. 執行與測試

### 4.1 本地啟動前端

在專案根目錄執行：

```bash
npm run start
```

或：

```bash
cd frontend
python3 -m http.server 8080
```

然後打開：

```text
http://127.0.0.1:8080
```

### 4.2 測試流程

1. 開啟前端頁面。
2. 使用 Google 登入。
3. 點選「自動填入」測試 API 查詢。
4. 輸入日文、中文、詞性、讀音、例句，點選「儲存到個人資料庫」。
5. 檢查 Apps Script 是否成功寫入 `Sheet1` 與 `管理`。
6. 若儲存成功，前端會重新載入字卡資料列表。

---

## 5. 常見問題與補充

- `Sheet1` 必須存在，且首列需為欄位標題。
- `GAS_WEB_APP_URL` 需使用 Apps Script 部署後的 URL。
- 若 Web App 回傳 CORS 錯誤，請確認 Apps Script 的 `jsonResponse()` 已設定 `Access-Control-Allow-Origin: '*'`。
- 若要管理不同使用者資料，建議在 `管理` 試算表中加入 `Email` 欄位，並在儲存時一起寫入。

---

## 6. Apps Script Web App 權限設定

部署 Web App 時，請選擇：

- `執行身分`：`我自己`
- `誰有權存取`：`任何有 Google 帳號的人` 或 `任何人`

---

## 7. 檔案對應

- `frontend/index.html`：前端 UI
- `frontend/style.css`：樣式
- `frontend/app.js`：前端邏輯
- `gas/Code.gs`：Apps Script API
- `SETUP_INSTRUCTIONS.md`：本說明檔

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
    pos: params.pos,
    example: params.example,
    reading: params.reading
  };
}

function lookupWord(word) {
  const query = encodeURIComponent(word || '');
  if (!query) return jsonResponse({ success: false, message: '請提供要查詢的單字。' });
  const jishoUrl = `https://jisho.org/api/v1/search/words?keyword=${query}`;
  const response = UrlFetchApp.fetch(jishoUrl, { muteHttpExceptions: true });
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

function getCardWords() {
  const sheet = getSheet(CARD_SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return jsonResponse({ success: true, words: [] });
  }
  const header = rows.shift();
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
  const cardSheet = getSheet(CARD_SHEET_NAME);
  const manageSheet = getSheet(MANAGE_SHEET_NAME);
  cardSheet.appendRow([data.word || '', data.meaning || '', data.example || '', data.pos || '', data.reading || '']);
  manageSheet.appendRow([new Date(), '', data.word || '', data.meaning || '', data.example || '', data.pos || '', data.reading || '', '已儲存']);
  return jsonResponse({ success: true, message: '單字已儲存至字卡與管理工作表。' });
}

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === CARD_SHEET_NAME) {
      sheet.appendRow(['日文', '中文翻譯', '例句', '詞性', '讀音']);
    } else if (name === MANAGE_SHEET_NAME) {
      sheet.appendRow(['Timestamp', 'Email', '日文', '中文翻譯', '例句', '詞性', '讀音', '狀態']);
    }
  }
  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function doOptions() {
  return jsonResponse({ success: true });
}

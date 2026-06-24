const STORAGE_KEY = 'ya_japanese_vocab';

const vocabCategories = {
  基本: [
    { japanese: '猫', reading: 'ねこ', meaning: '貓', pos: '名詞', example: '猫はかわいいです。' },
    { japanese: '犬', reading: 'いぬ', meaning: '狗', pos: '名詞', example: '犬と散歩する。' },
    { japanese: '食べる', reading: 'たべる', meaning: '吃', pos: '動詞', example: '私はリンゴを食べる。' },
    { japanese: '行く', reading: 'いく', meaning: '去', pos: '動詞', example: '明日、東京に行きます。' },
    { japanese: '見る', reading: 'みる', meaning: '看', pos: '動詞', example: '映画を見る。' },
    { japanese: '来る', reading: 'くる', meaning: '來', pos: '動詞', example: '友達が来る。' },
    { japanese: '学校', reading: 'がっこう', meaning: '學校', pos: '名詞', example: '学校に通っています。' },
    { japanese: '先生', reading: 'せんせい', meaning: '老師', pos: '名詞', example: '先生に質問する。' },
    { japanese: '本', reading: 'ほん', meaning: '書', pos: '名詞', example: '本を読む。' },
    { japanese: '机', reading: 'つくえ', meaning: '桌子', pos: '名詞', example: '机の上にペンがあります。' },
    { japanese: '椅子', reading: 'いす', meaning: '椅子', pos: '名詞', example: '椅子に座る。' },
    { japanese: '車', reading: 'くるま', meaning: '車', pos: '名詞', example: '車を運転する。' },
    { japanese: '電車', reading: 'でんしゃ', meaning: '電車', pos: '名詞', example: '電車で通勤します。' },
    { japanese: '早い', reading: 'はやい', meaning: '早、快', pos: '形容詞', example: '朝は早いです。' },
    { japanese: '遅い', reading: 'おそい', meaning: '慢、晚', pos: '形容詞', example: '電車が遅い。' },
    { japanese: '高い', reading: 'たかい', meaning: '高、貴', pos: '形容詞', example: 'この本は高いです。' },
    { japanese: '安い', reading: 'やすい', meaning: '便宜', pos: '形容詞', example: 'あのお店は安い。' },
    { japanese: '新しい', reading: 'あたらしい', meaning: '新的', pos: '形容詞', example: '新しい靴を買いました。' },
    { japanese: '古い', reading: 'ふるい', meaning: '舊的', pos: '形容詞', example: '古い写真を見る。' },
    { japanese: '大きい', reading: 'おおきい', meaning: '大', pos: '形容詞', example: '大きい犬。' },
    { japanese: '小さい', reading: 'ちいさい', meaning: '小', pos: '形容詞', example: '小さい部屋。' },
    { japanese: '近い', reading: 'ちかい', meaning: '近', pos: '形容詞', example: '駅は近いです。' },
    { japanese: '遠い', reading: 'とおい', meaning: '遠', pos: '形容詞', example: '山は遠い。' },
    { japanese: '暑い', reading: 'あつい', meaning: '熱', pos: '形容詞', example: '今日は暑いです。' },
    { japanese: '寒い', reading: 'さむい', meaning: '冷', pos: '形容詞', example: '冬は寒い。' },
    { japanese: '好き', reading: 'すき', meaning: '喜歡', pos: '形容詞', example: '私は音楽が好きです。' },
    { japanese: '嫌い', reading: 'きらい', meaning: '討厭', pos: '形容詞', example: '納豆が嫌いです。' },
    { japanese: '食べ物', reading: 'たべもの', meaning: '食物', pos: '名詞', example: '好きな食べ物は何ですか。' },
    { japanese: '飲み物', reading: 'のみもの', meaning: '飲料', pos: '名詞', example: '飲み物をください。' },
    { japanese: '休み', reading: 'やすみ', meaning: '休息', pos: '名詞', example: '休みの日はゆっくりする。' },
    { japanese: '友達', reading: 'ともだち', meaning: '朋友', pos: '名詞', example: '友達と映画を見た。' }
  ],
  動物: [
    { japanese: '猫', reading: 'ねこ', meaning: '貓', pos: '名詞', example: '猫は柔らかい。' },
    { japanese: '犬', reading: 'いぬ', meaning: '狗', pos: '名詞', example: '犬と散歩する。' },
    { japanese: '鳥', reading: 'とり', meaning: '鳥', pos: '名詞', example: '鳥が歌う。' },
    { japanese: '魚', reading: 'さかな', meaning: '魚', pos: '名詞', example: '魚を釣る。' },
    { japanese: '馬', reading: 'うま', meaning: '馬', pos: '名詞', example: '馬に乗る。' },
    { japanese: '牛', reading: 'うし', meaning: '牛', pos: '名詞', example: '牛乳を飲む。' },
    { japanese: '羊', reading: 'ひつじ', meaning: '羊', pos: '名詞', example: '羊が草を食べる。' },
    { japanese: '兎', reading: 'うさぎ', meaning: '兔子', pos: '名詞', example: '兎は跳ねる。' },
    { japanese: '象', reading: 'ぞう', meaning: '大象', pos: '名詞', example: '象は大きい。' },
    { japanese: '虎', reading: 'とら', meaning: '老虎', pos: '名詞', example: '虎は強い。' },
    { japanese: '熊', reading: 'くま', meaning: '熊', pos: '名詞', example: '熊が森にいる。' },
    { japanese: '狐', reading: 'きつね', meaning: '狐狸', pos: '名詞', example: '狐は賢いです。' },
    { japanese: '狸', reading: 'たぬき', meaning: '狸貓', pos: '名詞', example: '狸が歩いている。' },
    { japanese: '猿', reading: 'さる', meaning: '猴子', pos: '名詞', example: '猿は木に登る。' },
    { japanese: '蛇', reading: 'へび', meaning: '蛇', pos: '名詞', example: '蛇が日向ぼっこする。' },
    { japanese: '鶏', reading: 'にわとり', meaning: '雞', pos: '名詞', example: '鶏が卵を産む。' },
    { japanese: '豚', reading: 'ぶた', meaning: '豬', pos: '名詞', example: '豚肉が好きです。' },
    { japanese: '亀', reading: 'かめ', meaning: '烏龜', pos: '名詞', example: '亀はゆっくり動く。' },
    { japanese: '鯨', reading: 'くじら', meaning: '鯨魚', pos: '名詞', example: '鯨が海を泳ぐ。' },
    { japanese: '鹿', reading: 'しか', meaning: '鹿', pos: '名詞', example: '鹿が森にいる。' },
    { japanese: '蜂', reading: 'はち', meaning: '蜂', pos: '名詞', example: '蜂が花に集まる。' },
    { japanese: '蛙', reading: 'かえる', meaning: '青蛙', pos: '名詞', example: '蛙が歌う。' },
    { japanese: '鷹', reading: 'たか', meaning: '老鷹', pos: '名詞', example: '鷹が空を飛ぶ。' },
    { japanese: '蝉', reading: 'せみ', meaning: '蟬', pos: '名詞', example: '蝉が夏に鳴く。' },
    { japanese: '狐火', reading: 'きつねび', meaning: '狐火', pos: '名詞', example: '狐火の話を聞く。' },
    { japanese: '鯛', reading: 'たい', meaning: '鯛魚', pos: '名詞', example: '鯛はお祝いに食べる。' },
    { japanese: '亀', reading: 'かめ', meaning: '烏龜', pos: '名詞', example: '亀は甲羅がある。' },
    { japanese: '雉', reading: 'きじ', meaning: '雉', pos: '名詞', example: '雉が山に住む。' },
    { japanese: '燕', reading: 'つばめ', meaning: '燕子', pos: '名詞', example: '燕が巣を作る。' },
    { japanese: '海豚', reading: 'いるか', meaning: '海豚', pos: '名詞', example: '海豚がジャンプする。' }
  ],
  公司用語: [
    { japanese: '会議', reading: 'かいぎ', meaning: '會議', pos: '名詞', example: '明日は重要な会議があります。' },
    { japanese: '報告', reading: 'ほうこく', meaning: '報告', pos: '名詞', example: '上司に報告を出します。' },
    { japanese: '顧客', reading: 'こきゃく', meaning: '客戶', pos: '名詞', example: '顧客の要望に応える。' },
    { japanese: '契約', reading: 'けいやく', meaning: '合約', pos: '名詞', example: '契約書にサインしました。' },
    { japanese: '提案', reading: 'ていあん', meaning: '提案', pos: '名詞', example: '新しい提案を準備します。' },
    { japanese: '専案', reading: 'せんあん', meaning: '專案', pos: '名詞', example: '新規専案がスタートした。' },
    { japanese: '上司', reading: 'じょうし', meaning: '主管', pos: '名詞', example: '上司に相談します。' },
    { japanese: '同僚', reading: 'どうりょう', meaning: '同事', pos: '名詞', example: '同僚と昼食を食べた。' },
    { japanese: '残業', reading: 'ざんぎょう', meaning: '加班', pos: '名詞', example: '今日は残業があります。' },
    { japanese: '休暇', reading: 'きゅうか', meaning: '休假', pos: '名詞', example: '夏休みの休暇を申請した。' },
    { japanese: '会計', reading: 'かいけい', meaning: '會計', pos: '名詞', example: '会計処理を行う。' },
    { japanese: '請求', reading: 'せいきゅう', meaning: '請求', pos: '名詞', example: '請求書を送る。' },
    { japanese: '納期', reading: 'のうき', meaning: '交期', pos: '名詞', example: '納期を守る必要がある。' },
    { japanese: '目標', reading: 'もくひょう', meaning: '目標', pos: '名詞', example: '目標を設定する。' },
    { japanese: '報酬', reading: 'ほうしゅう', meaning: '報酬', pos: '名詞', example: '報酬が支払われた。' },
    { japanese: '進捗', reading: 'しんちょく', meaning: '進度', pos: '名詞', example: '進捗を共有する。' },
    { japanese: '企画', reading: 'きかく', meaning: '企劃', pos: '名詞', example: '企画書を作成した。' },
    { japanese: '戦略', reading: 'せんりゃく', meaning: '策略', pos: '名詞', example: '戦略を練る。' },
    { japanese: '人事', reading: 'じんじ', meaning: '人事', pos: '名詞', example: '人事部に相談する。' },
    { japanese: '研修', reading: 'けんしゅう', meaning: '研習', pos: '名詞', example: '研修に参加する。' },
    { japanese: '会議室', reading: 'かいぎしつ', meaning: '會議室', pos: '名詞', example: '会議室を予約した。' },
    { japanese: '取引', reading: 'とりひき', meaning: '交易', pos: '名詞', example: '新しい取引先と契約した。' },
    { japanese: '資源', reading: 'しげん', meaning: '資源', pos: '名詞', example: '資源を有効活用する。' },
    { japanese: '会議録', reading: 'かいぎろく', meaning: '會議記錄', pos: '名詞', example: '会議録をまとめる。' },
    { japanese: '品質', reading: 'ひんしつ', meaning: '品質', pos: '名詞', example: '品質を検査する。' },
    { japanese: '予算', reading: 'よさん', meaning: '預算', pos: '名詞', example: '予算を調整する。' },
    { japanese: '分析', reading: 'ぶんせき', meaning: '分析', pos: '名詞', example: 'データを分析する。' },
    { japanese: '提案書', reading: 'ていあんしょ', meaning: '提案書', pos: '名詞', example: '提案書を提出した。' },
    { japanese: '指示', reading: 'しじ', meaning: '指示', pos: '名詞', example: '上司からの指示を聞く。' },
    { japanese: '調整', reading: 'ちょうせい', meaning: '調整', pos: '名詞', example: 'スケジュールを調整した。' },
    { japanese: '会食', reading: 'かいしょく', meaning: '宴請', pos: '名詞', example: '会食に参加する。' },
    { japanese: '献立', reading: 'こんだて', meaning: '菜單', pos: '名詞', example: '献立を作成する。' }
  ],
  学校: [
    { japanese: '教室', reading: 'きょうしつ', meaning: '教室', pos: '名詞', example: '教室で授業を受ける。' },
    { japanese: '先生', reading: 'せんせい', meaning: '老師', pos: '名詞', example: '先生が優しく教える。' },
    { japanese: '学生', reading: 'がくせい', meaning: '學生', pos: '名詞', example: '学生は勉強しています。' },
    { japanese: '試験', reading: 'しけん', meaning: '考試', pos: '名詞', example: '試験の準備をしています。' },
    { japanese: '宿題', reading: 'しゅくだい', meaning: '作業', pos: '名詞', example: '宿題を早く終わらせた。' },
    { japanese: '教科書', reading: 'きょうかしょ', meaning: '課本', pos: '名詞', example: '教科書を忘れないでください。' },
    { japanese: '校庭', reading: 'こうてい', meaning: '校園', pos: '名詞', example: '校庭で遊ぶ。' },
    { japanese: '放課後', reading: 'ほうかご', meaning: '放學後', pos: '名詞', example: '放課後に友達と会う。' },
    { japanese: '運動会', reading: 'うんどうかい', meaning: '運動會', pos: '名詞', example: '運動会は楽しかった。' },
    { japanese: '成績', reading: 'せいせき', meaning: '成績', pos: '名詞', example: '成績が上がった。' },
    { japanese: '黒板', reading: 'こくばん', meaning: '黑板', pos: '名詞', example: '黒板に書く。' },
    { japanese: '鉛筆', reading: 'えんぴつ', meaning: '鉛筆', pos: '名詞', example: '鉛筆で書く。' },
    { japanese: '消しゴム', reading: 'けしごむ', meaning: '橡皮擦', pos: '名詞', example: '間違いを消す。' },
    { japanese: 'ノート', reading: 'のーと', meaning: '筆記本', pos: '名詞', example: 'ノートにメモする。' },
    { japanese: '試験勉強', reading: 'しけんべんきょう', meaning: '考試準備', pos: '名詞', example: '試験勉強を始める。' },
    { japanese: '図書館', reading: 'としょかん', meaning: '圖書館', pos: '名詞', example: '図書館で本を借りる。' },
    { japanese: '授業', reading: 'じゅぎょう', meaning: '課程', pos: '名詞', example: '授業を欠席した。' },
    { japanese: '校則', reading: 'こうそく', meaning: '校規', pos: '名詞', example: '校則を守る。' },
    { japanese: '制服', reading: 'せいふく', meaning: '制服', pos: '名詞', example: '制服を着る。' },
    { japanese: '体育', reading: 'たいいく', meaning: '體育', pos: '名詞', example: '体育の授業がある。' },
    { japanese: '化学', reading: 'かがく', meaning: '化學', pos: '名詞', example: '化学の実験をする。' },
    { japanese: '数学', reading: 'すうがく', meaning: '數學', pos: '名詞', example: '数学のテストを受けた。' },
    { japanese: '英語', reading: 'えいご', meaning: '英文', pos: '名詞', example: '英語を勉強する。' },
    { japanese: '音楽', reading: 'おんがく', meaning: '音樂', pos: '名詞', example: '音楽が大好きです。' },
    { japanese: '理科', reading: 'りか', meaning: '理科', pos: '名詞', example: '理科の実験が面白い。' },
    { japanese: '社会', reading: 'しゃかい', meaning: '社會', pos: '名詞', example: '社会の授業を聞く。' },
    { japanese: '試験日', reading: 'しけんび', meaning: '考試日', pos: '名詞', example: '試験日を確認する。' },
    { japanese: '図書', reading: 'としょ', meaning: '圖書', pos: '名詞', example: '図書を読む。' },
    { japanese: '学期', reading: 'がっき', meaning: '學期', pos: '名詞', example: '新しい学期が始まる。' },
    { japanese: '成績表', reading: 'せいせきひょう', meaning: '成績單', pos: '名詞', example: '成績表が届いた。' }
  ],
  美食: [
    { japanese: 'ご飯', reading: 'ごはん', meaning: '米飯', pos: '名詞', example: 'ご飯を食べる。' },
    { japanese: '麺', reading: 'めん', meaning: '麵', pos: '名詞', example: 'おいしい麺を食べた。' },
    { japanese: 'パン', reading: 'ぱん', meaning: '麵包', pos: '名詞', example: '朝ごはんにパンを食べる。' },
    { japanese: '果物', reading: 'くだもの', meaning: '水果', pos: '名詞', example: '果物は体にいい。' },
    { japanese: 'デザート', reading: 'でざーと', meaning: '甜點', pos: '名詞', example: 'デザートを楽しみにしている。' },
    { japanese: 'コーヒー', reading: 'こーひー', meaning: '咖啡', pos: '名詞', example: '朝はコーヒーを飲む。' },
    { japanese: 'お茶', reading: 'おちゃ', meaning: '茶', pos: '名詞', example: 'お茶を一緒に飲む。' },
    { japanese: '肉', reading: 'にく', meaning: '肉', pos: '名詞', example: '焼き肉を食べたい。' },
    { japanese: '魚', reading: 'さかな', meaning: '魚', pos: '名詞', example: '魚料理は新鮮です。' },
    { japanese: '寿司', reading: 'すし', meaning: '壽司', pos: '名詞', example: '寿司が大好きです。' },
    { japanese: '刺身', reading: 'さしみ', meaning: '生魚片', pos: '名詞', example: '刺身を食べる。' },
    { japanese: '天ぷら', reading: 'てんぷら', meaning: '天婦羅', pos: '名詞', example: '天ぷらが揚げたてです。' },
    { japanese: '味噌汁', reading: 'みそしる', meaning: '味噌湯', pos: '名詞', example: '味噌汁を飲む。' },
    { japanese: 'おにぎり', reading: 'おにぎり', meaning: '飯糰', pos: '名詞', example: 'おにぎりを持って行く。' },
    { japanese: 'ラーメン', reading: 'らーめん', meaning: '拉麵', pos: '名詞', example: 'ラーメンが好きです。' },
    { japanese: '牛丼', reading: 'ぎゅうどん', meaning: '牛丼', pos: '名詞', example: '牛丼を食べる。' },
    { japanese: '餃子', reading: 'ぎょうざ', meaning: '餃子', pos: '名詞', example: '餃子を焼く。' },
    { japanese: 'お好み焼き', reading: 'おこのみやき', meaning: '大阪燒', pos: '名詞', example: 'お好み焼きを作る。' },
    { japanese: 'たこ焼き', reading: 'たこやき', meaning: '章魚燒', pos: '名詞', example: 'たこ焼きを食べる。' },
    { japanese: 'うどん', reading: 'うどん', meaning: '烏龍麵', pos: '名詞', example: 'うどんが温かい。' },
    { japanese: 'そば', reading: 'そば', meaning: '蕎麥麵', pos: '名詞', example: 'そばを食べる。' },
    { japanese: 'カレー', reading: 'かれー', meaning: '咖哩', pos: '名詞', example: 'カレーが辛い。' },
    { japanese: '唐揚げ', reading: 'からあげ', meaning: '炸雞', pos: '名詞', example: '唐揚げは美味しい。' },
    { japanese: '焼き魚', reading: 'やきざかな', meaning: '烤魚', pos: '名詞', example: '焼き魚を食べる。' },
    { japanese: '味噌', reading: 'みそ', meaning: '味噌', pos: '名詞', example: '味噌は発酵食品です。' },
    { japanese: 'お弁当', reading: 'おべんとう', meaning: '便當', pos: '名詞', example: 'お弁当を広げる。' },
    { japanese: 'かき氷', reading: 'かきごおり', meaning: '刨冰', pos: '名詞', example: 'かき氷が冷たい。' },
    { japanese: '和食', reading: 'わしょく', meaning: '和食', pos: '名詞', example: '和食を楽しむ。' },
    { japanese: '洋食', reading: 'ようしょく', meaning: '洋食', pos: '名詞', example: '洋食レストランに行く。' }
  ]
};

let cardWords = [];
let selectedCategory = '基本';
let currentMode = null;
let practiceTimeout = null;

const authArea = document.getElementById('auth-area');
const appShell = document.getElementById('app');
const messageBox = document.getElementById('message');
const vocabList = document.getElementById('vocab-list');
const modePanel = document.getElementById('mode-panel');
const jpInput = document.getElementById('jp-word');
const cnInput = document.getElementById('cn-meaning');
const posInput = document.getElementById('pos');
const exampleInput = document.getElementById('example');
const readingInput = document.getElementById('reading');
const autoFillBtn = document.getElementById('auto-fill');
const saveWordBtn = document.getElementById('save-word');
const modeButtons = document.querySelectorAll('.mode-btn');

function showMessage(text, type = 'success') {
  messageBox.textContent = text;
  messageBox.style.color = type === 'error' ? '#dc2626' : '#16a34a';
  setTimeout(() => { messageBox.textContent = ''; }, 3000);
}

function renderAuthArea() {
  authArea.innerHTML = '';
  const hint = document.createElement('div');
  hint.className = 'auth-hint';
  hint.textContent = '本頁面已移除登入，直接使用單字分類與練習功能。';
  authArea.appendChild(hint);
}

function getCurrentVocabulary() {
  if (selectedCategory === '我的單字') {
    return cardWords.length ? cardWords : [];
  }
  return vocabCategories[selectedCategory] || [];
}

function renderCategoryTabs() {
  const categories = ['基本', '動物', '公司用語', '學校', '美食', '我的單字'];
  const tabContainer = document.getElementById('category-tabs');
  if (!tabContainer) return;
  tabContainer.innerHTML = categories.map((category) => {
    const activeClass = category === selectedCategory ? 'active' : '';
    return `<button type="button" class="category-tab ${activeClass}" data-category="${category}" onclick="window.selectCategory && window.selectCategory('${category}')">${category}</button>`;
  }).join('');
  tabContainer.querySelectorAll('.category-tab').forEach((button) => {
    button.addEventListener('click', () => selectCategory(button.dataset.category));
  });
}

function selectCategory(category) {
  clearPracticeTimeout();
  selectedCategory = category;
  renderCategoryTabs();
  renderVocabList();
  if (currentMode) {
    renderMode(currentMode);
  }
}

window.selectCategory = selectCategory;

function clearPracticeTimeout() {
  if (practiceTimeout) {
    clearTimeout(practiceTimeout);
    practiceTimeout = null;
  }
}

function getSavedWords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveWords(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

function loadCardWords() {
  cardWords = getSavedWords();
  renderVocabList();
  if (currentMode && selectedCategory === '我的單字') {
    renderMode(currentMode);
  }
}

function addSavedWord(word) {
  const saved = getSavedWords();
  const existingIndex = saved.findIndex((item) => item.japanese === word.japanese);
  if (existingIndex >= 0) {
    saved[existingIndex] = word;
  } else {
    saved.push(word);
  }
  saveWords(saved);
  cardWords = saved;
}

function removeSavedWord(japanese) {
  cardWords = getSavedWords().filter((item) => item.japanese !== japanese);
  saveWords(cardWords);
}

function handleVocabListClick(event) {
  const button = event.target;
  if (!button.classList.contains('delete-btn')) return;
  const japanese = button.dataset.japanese;
  if (!japanese) return;
  removeSavedWord(japanese);
  renderVocabList();
  if (selectedCategory === '我的單字' && currentMode) {
    renderMode(currentMode);
  }
  showMessage(`已刪除「${japanese}」。`);
}

function renderVocabList() {
  const combined = getCurrentVocabulary();
  if (combined.length === 0) {
    const emptyText = selectedCategory === '我的單字'
      ? '目前尚無我的單字，請新增單字以建立個人資料庫。'
      : `目前尚無「${selectedCategory}」分類單字，請切換分類或新增。`;
    vocabList.innerHTML = `<p class="empty-state">${emptyText}</p>`;
    return;
  }
  vocabList.innerHTML = combined.map((word) => {
    return `<div class="vocab-item">
      <h3>${word.japanese} <span class="vocab-meta">${word.reading || ''}</span></h3>
      <div class="vocab-meta">${word.pos || ''} | ${word.meaning || ''}</div>
      <p>${word.example || ''}</p>
      ${selectedCategory === '我的單字' ? `<button class="delete-btn" data-japanese="${word.japanese}">刪除</button>` : ''}
    </div>`;
  }).join('');
}

function findBuiltinWord(keyword) {
  const normalized = keyword.trim().toLowerCase();
  for (const category of Object.values(vocabCategories)) {
    const found = category.find((item) => item.japanese === keyword || item.reading === keyword || item.japanese.toLowerCase() === normalized || item.reading.toLowerCase() === normalized);
    if (found) {
      return found;
    }
  }
  return null;
}

function autoFill() {
  const keyword = jpInput.value.trim();
  if (!keyword) {
    showMessage('請輸入日文單字。', 'error');
    return;
  }

  const data = findBuiltinWord(keyword);
  if (!data) {
    showMessage('查無結果，請手動輸入。', 'error');
    return;
  }

  cnInput.value = data.meaning || '';
  posInput.value = data.pos || '';
  exampleInput.value = data.example || '';
  readingInput.value = data.reading || '';
  showMessage('已完成自動填入。');
}

function saveWord() {
  const word = jpInput.value.trim();
  const meaning = cnInput.value.trim();
  const pos = posInput.value.trim();
  const example = exampleInput.value.trim();
  const reading = readingInput ? readingInput.value.trim() : '';
  if (!word || !meaning) {
    showMessage('請輸入日文與中文翻譯。', 'error');
    return;
  }

  saveWordBtn.disabled = true;
  addSavedWord({ japanese: word, meaning, pos, example, reading });
  renderVocabList();
  if (selectedCategory === '我的單字') {
    renderMode(currentMode);
  }
  jpInput.value = '';
  cnInput.value = '';
  posInput.value = '';
  exampleInput.value = '';
  if (readingInput) readingInput.value = '';
  saveWordBtn.disabled = false;
  showMessage('已儲存單字。');
}

function renderMode(mode) {
  clearPracticeTimeout();
  currentMode = mode;
  modeButtons.forEach((button) => button.classList.toggle('active', button.dataset.mode === mode));
  const combined = getCurrentVocabulary();
  if (combined.length === 0) {
    modePanel.innerHTML = '<p>請先新增或載入單字。</p>';
    return;
  }
  if (mode === 'flashcard') {
    renderFlashcard(combined);
  } else if (mode === 'multiple') {
    renderMultipleChoice(combined);
  } else if (mode === 'typing') {
    renderTypingPractice(combined);
  }
}

function renderFlashcard(vocab) {
  const index = Math.floor(Math.random() * vocab.length);
  const data = vocab[index];
  modePanel.innerHTML = `
    <div class="vocab-item">
      <h3>${data.japanese}</h3>
      <p>讀音：${data.reading || '—'}</p>
      <button id="flip-card">顯示中文與例句</button>
      <div id="flashcard-answer" class="hidden">
        <p>翻譯：${data.meaning}</p>
        <p>詞性：${data.pos}</p>
        <p>例句：${data.example}</p>
      </div>
    </div>
  `;
  document.getElementById('flip-card').addEventListener('click', () => {
    document.getElementById('flashcard-answer').classList.toggle('hidden');
  });
}

function renderMultipleChoice(vocab) {
  clearPracticeTimeout();
  const item = vocab[Math.floor(Math.random() * vocab.length)];
  const choices = [item.meaning];
  while (choices.length < 4) {
    const candidate = vocab[Math.floor(Math.random() * vocab.length)].meaning;
    if (!choices.includes(candidate)) choices.push(candidate);
  }
  const shuffled = choices.sort(() => Math.random() - 0.5);
  modePanel.innerHTML = `
    <div class="vocab-item">
      <h3>請選出「${item.japanese}」的中文意思</h3>
      <div class="mode-buttons">${shuffled.map((choice) => `<button class="choice-btn">${choice}</button>`).join('')}</div>
      <div id="choice-result" class="message"></div>
    </div>
  `;
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const result = document.getElementById('choice-result');
      buttons.forEach((btn) => { btn.disabled = true; });
      if (button.textContent === item.meaning) {
        result.style.color = '#16a34a';
        result.textContent = '答對了！3 秒後出下一題...';
        practiceTimeout = setTimeout(() => renderMultipleChoice(vocab), 3000);
      } else {
        result.style.color = '#dc2626';
        result.textContent = `答案：${item.meaning}`;
        buttons.forEach((btn) => { btn.disabled = false; });
      }
    });
  });
}

function renderTypingPractice(vocab) {
  clearPracticeTimeout();
  const item = vocab[Math.floor(Math.random() * vocab.length)];
  modePanel.innerHTML = `
    <div class="vocab-item">
      <h3>請問「${item.japanese}」的中文翻譯是？</h3>
      <input id="typing-answer" placeholder="輸入中文意思" />
      <button id="check-typing">檢查答案</button>
      <div id="typing-result" class="message"></div>
    </div>
  `;
  const answerInput = document.getElementById('typing-answer');
  const checkButton = document.getElementById('check-typing');
  checkButton.addEventListener('click', () => {
    const answer = answerInput.value.trim();
    const result = document.getElementById('typing-result');
    if (answer === item.meaning) {
      result.style.color = '#16a34a';
      result.textContent = '答對了！3 秒後出下一題...';
      answerInput.disabled = true;
      checkButton.disabled = true;
      practiceTimeout = setTimeout(() => renderTypingPractice(vocab), 3000);
    } else {
      result.style.color = '#dc2626';
      result.textContent = `答案：${item.meaning}`;
    }
  });
}

autoFillBtn.addEventListener('click', autoFill);
saveWordBtn.addEventListener('click', saveWord);
modeButtons.forEach((button) => {
  button.addEventListener('click', () => renderMode(button.dataset.mode));
});
vocabList.addEventListener('click', handleVocabListClick);

window.addEventListener('DOMContentLoaded', () => {
  renderCategoryTabs();
  renderAuthArea();
  loadCardWords();
});

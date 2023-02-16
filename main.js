import './lib/uPlot.min.css';
import uPlot from 'uplot';

function $(id) {
  return document.getElementById(id);
}

// 定義儲存時間資料的陣列
let data_time = [Date.now() / 1000];

// 定義儲存資料1與資料2的陣列
let data_value1 = [];
let data_value2 = [];

// 定義圖形資料陣列，包含前面定義的時間、資料1與資料2陣列
let data_plot = [data_time, data_value1, data_value2];

// 定義圖表參數，用來設定圖表各項顯示
let chart_config = {
  // 寬與高，加入判斷式使其在桌面與手機網頁上顯示符合螢幕大小
  width: window.innerWidth > 1080 ? window.innerWidth / 2 : 380,
  height: window.innerWidth > 1080 ? window.innerWidth / 2 - 200 : 380,

  // 與鼠標在圖表上行為相關設定
  cursor: {
    lock: true,
    focus: {
      prox: 16,
    },
  },

  // XY軸的屬性與範圍設定
  scales: {
    x: {
      time: true,
    },
    y: {
      range: [0, 100],
    },
  },
  // 資料點的屬性與標籤設定
  series: [
    {
      label: 'Time',
    },
    {
      label: 'Value1',
      stroke: '#2196f3',
      fill: '#2196f333',
    },
    {
      label: 'Value2',
      stroke: '#4caf50',
      fill: '#4caf5033',
    },
  ],

  // 資料點範圍，依據資料點種類設定即可
  bands: [
    {
      series: [0, 2],
    },
  ],

  // 網格屬性設定
  axes: [
    {
      stroke: '#333333',
      grid: {
        width: 1 / devicePixelRatio,
        stroke: '#2c3235',
      },
      ticks: {
        width: 1 / devicePixelRatio,
        stroke: '#2c3235',
      },
    },
    {
      stroke: '#333333',
      grid: {
        width: 1 / devicePixelRatio,
        stroke: '#2c3235',
      },
      ticks: {
        width: 1 / devicePixelRatio,
        stroke: '#2c3235',
      },
    },
  ],
};

// 檢查當 id 為 chart 的物件存在時清空，防止重複定義出錯
if ($('chart')) $('chart').innerHTML = '';

// 建立 uPlot 物件，帶入參數為 圖表參數、資料陣列、對應id物件
let plot = new uPlot(chart_config, data_plot, $('chart'));

// 更新資料顯示
function updatePlot() {
  // 僅留下最後100筆資料顯示, shift方法可以將陣列最前面的數值移出
  if (data_time.length > 50) {
    data_time.shift();
    data_value1.shift();
    data_value2.shift();
  }

  // 抓取目前時間加入時間陣列中， Date.now() 取得 UTC時間(毫秒)
  data_time.push(Date.now() / 1000);

  // 產生隨機資料加入資料陣列中
  data_value1.push(getRandomInt(0, 50));
  data_value2.push(getRandomInt(50, 100));

  // 更新圖形資料陣列內容
  data_plot = [data_time, data_value1, data_value2];

  // 將資料更新於圖表上
  plot.setData(data_plot);
}

// 隨機產生數值
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// 每 500 毫秒執行一次內部的程式
setInterval(function () {
  updatePlot();
}, 500);

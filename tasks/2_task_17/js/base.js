/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
};

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

// 存储 option.text 为数组
function countOptions(sourceData) {
  var options = [];
  var count   = 0;
  for (key in sourceData) {
    options[count++] = key;
  }
  return options;
}
var options = countOptions(aqiSourceData);
console.log("options: "+options);

// 计算总共天数
function countDays(cityData) {
  var count = 0;
  for (key in cityData) {
    count++;
  }
  return count;
}
var days = countDays(aqiSourceData["北京"]);

// 颜色
var colors = ["#000066", "#003366", "#006666", "#009966", "#009999", "#00cc99", "#00cccc", "#00ffcc", "#99ffcc", "#77dd77"];

/**
 * 渲染图表
 */
function renderChart(colNum, cityName) {
  // 获取图标高度
  var aqiChart    = document.getElementById("aqi-chart-wrap");
  var chartWidth  = aqiChart.clientWidth;
  var chartHeight = aqiChart.clientHeight;

  // 计算柱状图宽度
  var pieceWidth = chartWidth/colNum;
  var piece      = pieceWidth/chartWidth*100;

  // 转换 JSON 对象并提取 aqi 值为数组
  var cityData = aqiSourceData[cityName];
  cityData = Object.keys(cityData).map(function(key) {
    return cityData[key];
  });
  var cityAqi  = cityData[0];

  // 初始化外部框宽度、内部框高度，以及颜色
  var colWidth = piece,
      height   = 0,
      color    = colors[0];

  var items = "";

  for (i=0; i<colNum; i++) {
    // 取余选取颜色
    color  = colors[i%10];
    // 计算高度百分比
    height = cityData[i]/10;

    // 柱状外部框
    items += "<div style='position: relative;\
          display: inline-block;\
          width: "+colWidth+"%;\
          height: 100%;'>";
    // 柱状内部框
    items += "<div class='box'\
          style='position: absolute;\
          bottom: 0;\
          margin-left: 20%;\
          width: 60%;\
          height: "+height+"%;\
          background-color:"+color+";'>";
    items += "</div></div>";
  }
  aqiChart.innerHTML = items;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化
  var change = true;
  var nowGraTime = pageState["nowGraTime"];
  console.log("Time: "+nowGraTime);

  if ( value === nowGraTime ) {
    change = false;
  };

  // 设置对应数据
  var col = 0;

  if ( change ) {
    if (value == "day") { // 日
      // 检查此条件是否执行
      console.log("ri");
      col = days;
      // 重置当前时间状态
      pageState["nowGraTime"] = "day";

    } else if (value == "week") { // 周
      // 检查此条件是否执行
      console.log("zhou");
      col = parseInt(days/7);
      // 重置当前时间状态
      pageState["nowGraTime"] = "week";

      if ((days%7) > 0) {
        col++;
      }
    } else if (value == "month") { // 月
      // 检查此条件是否执行
      console.log("yue");
      // 此处具体算月份还不够严谨, 这里 hard code 了
      col = parseInt(days/30);
      // 重置当前时间状态
      pageState["nowGraTime"] = "month";
    }
    // 调用图表渲染函数
    renderChart(col,"北京");
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var timeType = document.getElementById("form-gra-time");

  timeType.onclick=function(e) {
    // e = e || event;
    var target = e.target || e.srcElement;
    if (target.nodeName.toLowerCase() == "input") {
      graTimeChange(target.value);
    }
  };
};

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cities = document.getElementById("city-select");
  var selColls = cities.options;
  // console.log(selColls);
  // 获取选择的索引值
  var selIndex = selColls.selectedIndex;
  // console.log(selIndex);
  // 根据所引致获取选项
  var selItem  = selColls[selIndex];
  // console.log(selItem);
  // 获取选项的 value
  var selValue = selItem.value;
  // console.log(selValue);

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  cities.onclick = function(e) {
    var target = e.target || e.srcElement;
    if (target.nodeName.toLowerCase == "option") {
      console.log("yes");
      console.log(target.value);
    }
  };
};

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式



  // 处理好的数据存到 chartData 中
  graTimeChange();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();

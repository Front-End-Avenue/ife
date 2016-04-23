/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  // 获取新输入内容
  var cityName  = document.getElementById("aqi-city-input").value;
  var cityValue = document.getElementById("aqi-value-input").value;

  // 判断输入值是否符合要求
  var judgeEn    = /^[a-zA-Z\s]+$/;
  var judgeCn    = /^[\u4e00-\u9fa5\s]+$/;
  var judgeInt   = /^[0-9]\d*$/;
  // var judgeSpace = /(^\s*)|(\s*$)/;

  // 删除首尾空格
  function lTrim(s) {
    return s.replace(/(^\s*)/g,"");
  }
  function rTrim(s) {
    return s.replace(/(\s*$)/g,"");
  }

  cityName=lTrim(cityName);
  cityName=rTrim(cityName);
  cityValue=lTrim(cityValue);
  cityValue=rTrim(cityValue);

  var isEn  = (judgeEn.test(cityName));
  var isCn  = (judgeCn.test(cityName));
  var isStr = (isEn || isCn);

  var isInt = judgeInt.test(cityValue);

  // 根据输入值执行写入列表与否
  if ( isStr && isInt ) {
    aqiData[cityName] = cityValue;
    console.log(aqiData);
  } else if ( !isStr && !isInt ) {
    alert("请输入正确的城市名称以及空气质量指数 \n\n Please input a current city's name & index of air quality!");
  } else if ( !isStr ) {
    alert("请输入正确的城市名称! \n\n Please input a current city's name!")
  } else if ( !isInt ) {
    alert("请输入正确的空气质量指数! \n\n Please input a current index of air quality!")
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqiTable = document.getElementById("aqi-table");
  var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for (var city in aqiData) {
    items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
  }
  aqiTable.innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener("click",addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqiTable= document.getElementById("aqi-table");
  // 事件代理
  aqiTable.onclick=function(e) {
    e = e || event;
    //
    var target = e.target || e.srcElement;
    //
    if (target.nodeName.toLowerCase() == "button") {
      delBtnHandle.call(null, target.dataset.city);
    }
  }
}

init();

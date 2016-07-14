/*

*/

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


function $$id(id){//获取id 元素
	return document.getElementById(id);		
}

function $$name(name){//获取name 元素
	return document.getElementsByName(name);		
}

function creatEle(tage){//创建元素
	return document.createElement(tage);
}
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
}
// 用于渲染图表的数据
var chartData = {};
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
chartData['day'] = aqiSourceData

// 空气指数：
function aqiPMFn (val){
	if(val<=150){
		return '#00FF00'; //'优';
	}else if(val>150 && val <=200){
		return '#00A7D1'; //'良';
	}else if(val>200 && val <=250){
		return '#999';//'轻度污染';
	}else if(val>250 && val <=300){
		return '#666' //'中度污染';
	}else if(val>300 && val <=400){
		return '#EF0804';//'重度污染';
	}else if(val>400){
		return 'red'//'严重污染';
	}	
}



// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  // 调用图表渲染函数
  if(pageState.nowGraTime != this.value){
		pageState.nowGraTime = this.value;	
		initAqiChartData();
  }				
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
	
  // 设置对应数据

  // 调用图表渲染函数
  if(pageState.nowSelectCity != this.value){
		pageState.nowSelectCity = this.value;
		initAqiChartData();
  }			
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var graTimes = $$name('gra-time');
	for(var i = 0, l = graTimes.length; i <l ; i++){
		var graTimeEle = graTimes[i]
		if(!!graTimeEle.checked){
			pageState.nowGraTime  = graTimeEle.value;
		}
		
		(function(ele){//添加事件
			graTimeEle.onchange = function(){					
				graTimeChange.call(this);				
			}			
		})(graTimeEle);
		
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	var  city = $$id('city-select');
	for(var key in aqiSourceData){
		var opt = creatEle('option')
			opt.value = key;
			opt.innerHTML = key
		city.appendChild(opt)
	}
	pageState.nowSelectCity  = 	city.value;
	city.onchange = function(){		
		citySelectChange.call(this);		
	}
	
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
	var city = pageState.nowSelectCity,
		time = pageState.nowGraTime,
		data = {};
	if(chartData[time] && chartData[time][city]){
		data = chartData[time][city]
	}else{
		var dayDatas = chartData['day'][city];		
		if(time =='week'){		
			var k = 0, m =0, w =1; 
			for(var i in dayDatas){
				k++;
				m += dayDatas[i]; 
				if(k%7 ==0){
					data[w] =  parseInt(m/7);
					w++
					m = 0;
				}else{
					data[w] =  parseInt(m/(k%7));
					m = 0;
				}
			}			
		}else if(time =='month'){
			var arr = [31, 29, 31],
				k = 0,
				d = 0,
				m = 0;
			for(var i in dayDatas){
				k ++;
				d += dayDatas[i];
				if(k==arr[m]){
					m++;
					data[m] =  parseInt(d/k);
					k = 0;
					d = 0;
				}
			}			
		}		
		if(typeof chartData[time]  == 'undefined'){
			chartData[time] = {}
		}
		chartData[time][city] = data
	} 
	renderChart(data)	
}
/**
 * 渲染图表
 */
function renderChart(data) {
	var ul = creatEle('ul'),
		time = pageState.nowGraTime;
		for( var i in data){
			var val = data[i];
			var li = creatEle('li');
			li.style.height = val+'px';
			li.style.backgroundColor = aqiPMFn (val);
			if(time =='week'){
				li.title= '第'+ i +'周空气指数：'+val
				li.style.width = '30px';
			}else if(time =='month'){
				li.title= i +'月空气指数：'+val
				li.style.width = '60px';
			}else{
				li.title= i +'空气指数：'+val
				li.style.width = '10px';
			}			
			ul.appendChild(li);
		}
	$$id('aqi-chart-view').innerHTML = '';
	$$id('aqi-chart-view').appendChild(ul);
}

/**
 * 初始化函数
 */
function init() {
	initCitySelector();//1,生成城市
	initGraTimeForm();//2,获取日期粒度 
    initAqiChartData();//3，渲染图表
}
init();
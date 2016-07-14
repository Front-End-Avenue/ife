function $$id(id){//获取id 元素
	return document.getElementById(id);		
}
function $$class(id){//获取id 元素
	return document.getElementsByClassName(id);		
}
function $$tage(name){//获取tagename 元素
	return document.getElementsByTagName(name);		
}

function $$name(name){//获取name 元素
	return document.getElementsByName(name);		
}

function creatEle(tage){//创建元素
	return document.createElement(tage);
}
/* function trim(val){
	val.trim()
} */

(function(){
	var $input = $$id('edited');
	var $btns  = $$tage('button');
	var $boxNum = $$id('box-word');
	var search = $$id('search');
	var arr = []
	$btns[0].onclick = function(){//插入
		var node = creatNode(0);
		if(node){
			$boxNum.insertBefore(node, $boxNum.firstChild);	
		}
		
	}
	$btns[1].onclick = function(){// 查询btn
		var val = search.value;
		var reg = new RegExp(val+'+', 'g');
		$boxNum.innerHTML ='';
		
		for(var i = 0,l=arr.length; i<l;i++){
			var eleStr = arr[i];
			var html  = eleStr.replace(reg, function(match, pos, originalText){
				//console.log(match, pos, originalText) //match 匹配到的值， pos 位置； originalText 原始字符串
				return '<b>'+ match +'</b>'
			});	
			var span = creatEleSpan(html)
			$boxNum.appendChild(span);
		}
	}
	
	// 删除节点
	function delNode(node){
		if(node!=null){
			$boxNum.removeChild(node);
		}		
	}
	
	// 验证 填写的数据合格不
	function testVal(val){
		if(val ==''){
			alert('数据不能为空');
			return false
		}
		return true;
	}	
	
	//创建节点 1, 存入数据（ type 0: unshift()， 1 :push），2，创建元素。;
	function creatNode(type){
		var val = $input.value.trim();
		if(testVal(val)){			
			saveData(type, val);
			return creatEleSpan(val);			
		}else{
			return false;
		}		
	}
	
	//存入数据
	function saveData(type, val){//
		type == 0 ? arr.unshift(val) : arr.push(val);
	}
	
	//创建元素
	function creatEleSpan(val){
		var span  = creatEle('span');
			span.innerHTML = val;
		return span;	
	}
})();		



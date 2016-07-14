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
	var $inputTag = $$id('editd-tag');
	var $boxTag = $$id('box-word');
	var $btns  = $$tage('button');
	var $inputLove = $$id('edited-love');
	var $boxLove = $$id('box-love');
	var arr_tag = [];
	var arr_love = [];
	
	$inputTag.onkeydown = function(){ 
		console.log(this.value, 'down')
	}
	$inputTag.onkeypress= function(){
			console.log(this.value)
	}
	$inputTag.onkeyup = function(e){	
		var val = this.value.trim();	
		
		if(e.keyCode==188){		//188 逗号	
			val = val.substr(0, val.length-1);				
		}
		
		//32 空格 13 enter键
		if((e.keyCode==32||e.keyCode == 13 || e.keyCode==188) && val !=''){	
			this.value = '';
			dataTageCreat(val);
			
		}
	}
	
	/*  */
	$boxTag.onclick = function(e){
		var e = e || window.event;
		var node = e.target || e.srcElement
		
		if(node.nodeName.toLocaleLowerCase() =='span'){
			var spans = $boxTag.getElementsByTagName('span');			
			for(var i = 0 , l =spans.length; i<l; i++ ){			
				if(spans[i]==node){
					arr_tag.splice(i,1);
					break;
				}			
			}
			
			$boxTag.removeChild(node)
			
		}
	}
	$boxTag.onmouseover = function(e){
		var e = e || window.event;
		var node = e.target || e.srcElement
		console.log(1, node)
		if(node.nodeName.toLocaleLowerCase() =='span'){
			var html = node.innerHTML;
			node.innerHTML = '删除'+ html;
			node.className = 'del';
		}
	}
	$boxTag.onmouseout = function(e){
		var e = e || window.event;
		var node = e.target || e.srcElement
		if(node.nodeName.toLocaleLowerCase() =='span'){
			var html = node.innerHTML.substr(2);
			node.innerHTML = html
			node.className = '';
		}
	}
	
	//创建元素
	function creatEleSpan(val){
		var span  = creatEle('span');
			span.innerHTML = val;
		return span;	
	}
	function dataTageCreat(val){ //创建tag
		if(arr_tag.indexOf(val)==-1){
			if(arr_tag.length==10){
				arr_tag.shift();
				$boxTag.removeChild($boxTag.firstChild)
			}
			arr_tag.push(val);
			var span = creatEleSpan(val);		
			$boxTag.appendChild(span);				
		}
	}
	
	
	
	//二、 添加爱好
	$inputLove.onkeyup = function(e){
		var val = this.value;
		var l =  val.length-1
			console.log(e.keyCode)
		
		
		 this.value = val;
		
	}
	
	$btns[0].onclick = function(){//插入
		$boxLove.innerHTML='';
		var val = $inputLove.value.trim();
		var arr = val.split(/\s|;|,/);
		for( var i in arr){
			if(arr_love.indexOf(arr[i]) == -1&& arr[i] !=''){
				
				arr_love.push(arr[i]);
				
			}
		}
		if(arr_love.length>10){
			arr_love.splice(0, arr_love.length-10);
		}
		for(var i in arr_love){
			$boxLove.appendChild(creatEleSpan(arr_love[i]));
		}
	}
	
	/* $btns[1].onclick = function(){// 查询btn
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
	} */
	
	/*
	} */
	
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
	
	
	
	
	
})();		



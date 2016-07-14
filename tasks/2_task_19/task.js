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
	var arr = [];
	var $input = $$id('edited');
	var $btns  = $$tage('button');
	var $boxNum = $$id('box-num');
	$btns[0].onclick = function(){
		var node = creatNode(0);
		if(node){
			$boxNum.insertBefore(node, $boxNum.firstChild);	
		}
		
	}
	$btns[1].onclick = function(){
		var node = creatNode(1);	
		if(node){	
			$boxNum.appendChild(node);		
		}	
	}
	
	$btns[2].onclick = function(){
		delNode($boxNum.firstChild);			
	}
	$btns[3].onclick = function(){	
		delNode($boxNum.lastChild);			
	}
	$btns[4].onclick = function(){	
		if(arr[0]>arr[arr.length-1]){
			arr = arr.sort();
		}else{
			arr = arr.sort(function(a,b){
				if(a<b){
					return 1;
				}
				if(a==b){
					return 0;
				}
				if(a>b){
					return -1;
				}
			 });
		}
		charAtView()	
	}	
	$boxNum.onclick = function(e){
		var e = e || window.event;
		var node = e.target || e.srcElement
		if(node.nodeName.toLocaleLowerCase() =='span'){
			delNode(node)
		}
	}
	
	// 删除节点
	function delNode(node){
		if(node!=null){			
			var spans = $boxNum.getElementsByTagName('span');			
			for(var i = 0 , l =spans.length; i<l; i++ ){			
				if(spans[i]==node){
					arr.splice(i,1);
				}			
			}
			$boxNum.removeChild(node);
		}		
	}

	
	// 验证 填写的数据合格不
	function testVal(val){
		if(val ==''){
			alert('数据不能为空');
			return false
		}
		if(!/^\d+$/g.test(val)){
			alert('数据格式不正确，必须为数字');
			return false
		}else{
			if(!(val>=10 && val<=100)){
				alert('数据只可以输入10到100')
				return false
			}
		}
		return true;
	}
	
	
	function creatNode(type){//创建节点 type {0:'unshift' ,1 'push'}
		if(arr.length==60){
			alert('添加数量最多为60个');
			return false
		}
		var val = $input.value.trim();
		if(testVal(val)){
			if(type == 0){
				arr.unshift(val)
			}else if(type == 1){
				arr.push(val)
			}	
			var span = creatEle('span');
				span.style.height = val +'px';	
				span.title ='数值为'+ val
			return span;
		}else{
			return false;
		}		
	}
	function charAtView(){
		$boxNum.innerHTML='';
		for(var i = 0 , l =arr.length; i<l; i++){
			var val = arr[i];
				span = creatEle('span');
				
				span.style.height =  val +'px';
				span.title ='数值为'+ val
			$boxNum.appendChild(span)		
		}		
	}
})();		

// 替换 玩玩
(function(){
	var $btn = $$tage('input')[1];
	var $box = $$class('relacebox')[0];
	var $childs = $box.children;
	$btn.onclick = function(){
		var span  = creatEle('span');
		span.innerHTML = $childs[0].innerHTML
		
		var b  = creatEle('b');
		b.innerHTML = $childs[1].innerHTML
		//替换a为span
		$box.replaceChild(span,$childs[0])
		$box.replaceChild(b,$childs[1])
	} 
	
})()
// 复制节点 不会复制他的 帮定事件的

//$box.cloneNode(true) //深层复制 （包括子类节点 一堆东西<div class="box"><a href="http://www.baidu.com">baidu</a></div>）
//$box.cloneNode(false) //浅层复制 (只有自己一个元素 <div class="box"></div>)

//element.childElementCount 回传 element 子代 (child) 元素的数量。
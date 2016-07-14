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
/* 二叉树的遍历有三种方式，如下：

（1）前序遍历（DLR），首先访问根结点，然后遍历左子树，最后遍历右子树。简记根-左-右。

（2）中序遍历（LDR），首先遍历左子树，然后访问根结点，最后遍历右子树。简记左-根-右。

（3）后序遍历（LRD），首先遍历左子树，然后遍历右子树，最后访问根结点。简记左-右-根。 
 */

(function(){
	
	//一直半截的理解了二叉树 上算法 抄的	
	
	var input = $$tage('input')[0];
	var btn = $$tage('button')[0];
	var sele = $$tage('select')[0];
	var divs = $$tage('div');
	var root = divs[0];
	var divList = [];
	var timer = null;
	var findArr = [];
	btn.onclick = function(){
		var val = input.value.trim();
		if(val.length>0){
			findArr = val.split('|');
		}
		var num = sele.options.selectedIndex || 0;
		if(divList.length>0){
			resetfn();
		}
		switch(num){
			case 1:{
				inOrder(root);
			}
			break;
			case 2:{				
				postOrder(root)
			}
			break;
			default:{
				preOrder(root);
			}			
		}
		changeColor();
	}
	
	function resetfn(){		
		divList = [];
		timer && clearInterval(timer);
		
		for(var i = 0, l = divs.length; i < l; i++){
			divs[i].style.background = '#fff';
		}
	}
	function changeColor(){

		var i = 0, l = divList.length;
		var isFind = false;
		 timer = setInterval(function(){
				if(i>0)	{
					var divPev = divList[i-1];
					var fistSpan = divPev.getElementsByTagName('span')[0];
					var firSpanVal = fistSpan.innerHTML.trim();
					var ishas = false;
					for(var j = 0, k = findArr.length; j<k; j++){
						if(firSpanVal == findArr[j]){
							ishas = true;
							isFind = true;
						}
					}
					if(ishas){
						divPev.style.background = '#78a300';
					}else{
						divPev.style.background = '#fff';
					}				
				}				
				if(i==l || divList.length ==0){
					clearInterval(timer);	
					if(!isFind){
						alert('辛辛苦苦，一个也没找到。')
					}
					return false;	
				}
				divList[i].style.background = '#8677a7';				
				
			i++;
		}, 1000); 
		
	}
	
	/* 
		二叉遍历 在之前22基础上 修改了 。因为添加了一个span 标签和内容。
		如果不用 span 可以用 只是文字的话 $div.childNodes[0]  或者 $div.firstChild利用节点 
		清除.nodeValue两边的空白 可以与查询文字对比

	*/
	//前序遍历
	function preOrder(node) {
		if (!(node == null)) {
			var childs = node.children; // 返回子节点 
			var l = childs.length;
			divList.push(node);	
			if(childs[1]&&childs[1].tagName =='DIV'){
				preOrder(childs[1]);		
			}
			if(childs[l-1].tagName =='DIV'){
				preOrder(childs[l-1]);
			}			
		}
	}

	//中序遍历
	function inOrder(node) {
		if (!(node == null)) {
			var childs = node.children; // 返回子节点 
			var l = childs.length;
			if(childs[1] &&childs[1].tagName =='DIV'){	
				inOrder(childs[1]);	
			}
			divList.push(node);
			if(childs[l-1].tagName =='DIV'){			
				inOrder(childs[l-1]);
			}
			
		}
	}

	//后序遍历
	function postOrder(node) {
		if (!(node == null)) {
			var childs = node.children; // 返回子节点 
			var l = childs.length;
				
			if(childs[1]&&childs[1].tagName =='DIV'){
				postOrder(childs[1]);		
			}
			if(childs[l-1].tagName =='DIV'){
				postOrder(childs[l-1]);
			}	
			divList.push(node);
		}
	}	
})();		



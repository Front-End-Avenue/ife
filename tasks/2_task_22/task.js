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
	
	var btn = $$tage('button')[0];
	var sele = $$tage('select')[0];
	var divs = $$tage('div');
	var root = divs[0];
	var divList = [];
	var timer = null;

	btn.onclick = function(){
		var val = sele.options.selectedIndex || 0;
		if(divList.length>0){
			resetfn();
		}
		switch(val){
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
		console.log(l)
		 timer = setInterval(function(){
				if(i>0)	{
					divList[i-1].style.background = '#fff';
				}				
				if(i==l || divList.length ==0){
					clearInterval(timer);	
					return false;	
				}
				divList[i].style.background = '#8677a7';				
				
			i++;
		}, 1000); 
		
	}
	//前序遍历
	function preOrder(node) {
		if (!(node == null)) {
			divList.push(node);
			preOrder(node.firstElementChild);
			preOrder(node.lastElementChild);
		}
	}

	//中序遍历
	function inOrder(node) {
		if (!(node == null)) {
			inOrder(node.firstElementChild);
			divList.push(node);
			inOrder(node.lastElementChild);
		}
	}

	//后序遍历
	function postOrder(node) {
		if (!(node == null)) {
			postOrder(node.firstElementChild);
			postOrder(node.lastElementChild);
			divList.push(node);
		}
	}	
})();		



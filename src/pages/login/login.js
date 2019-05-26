require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		//拖拽验证码
	function getPagePos(ele) {
		var sum = ele.offsetLeft;
		//获取到 body时offsetLeft返回值为0，查找body的父级返回为null ,循环结束
		if (!ele) {
			throw new Error("ele参数有问题，无法获取位置");
		}
		var _left = ele.offsetLeft;
		var _top = ele.offsetTop;
		while (ele.offsetParent) {
			_left += ele.offsetParent.offsetLeft;
			_top += ele.offsetParent.offsetTop;
			ele = ele.offsetParent;
	
		}
		return {
			x: _left,
			y: _top
		};
	
	}
	
	$("#number").keydown(function(){
		console.log("456");
		$("#code-reg").removeClass("visiblility-hidden");
		
	})
	var moveBtn = document.getElementsByClassName("verify-move")[0];
	var oImg = document.getElementsByClassName("verify-img")[0];
	var slic = document.getElementsByClassName("verify-slice")[0];
	
	
	//鼠标点击验证按钮时，上方的拼图显示出来
	$(".btn-left").click(function(){
		
		//进行手机号验证
		let reg = /^1[34578]\d{9}$/; 
		if(!reg.test($("#number")[0].value)){
			alert("手机号输入有误");
			$(".tip-font")[0].innerText = "手机号输入有误";
			$("#vis").removeClass("visiblility-hidden");
		}else{
			$("#verify").removeClass("visiblility-hidden");
			console.log("bbAAsd");
		}
		
		console.log($("#verify"));
	});
		
		var start = 20;
		//鼠标划入滑块位置时 上方的拼图显示出来
		moveBtn.onmousedown = function(e) {			
			e = e || event;
			var offsetX = e.offsetX;
			var offsetY = e.offsetY;
			document.onmousemove = function(e) {
				e = e || event;
				var _left = Math.min(Math.max(e.pageX - getPagePos(moveBtn.parentNode).x - offsetX, 0), moveBtn.parentNode.offsetWidth - moveBtn.offsetWidth);
				moveBtn.style.left = _left + "px";
				slic.style.left = start + _left + "px";
			}
		}
		
		document.onmouseup = function() {
			document.onmousemove = "";
			if (Math.abs(slic.offsetLeft - 157) < 5) {
				$("#verify").addClass("visiblility-hidden");
				 //$("#verify").css('display','none');
				console.log("ssss")
			}
				moveBtn.style.left = 0;
				slic.style.left = "20px";
		}
	
	
	
})
})



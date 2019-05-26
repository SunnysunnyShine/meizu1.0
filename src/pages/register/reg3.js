require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		let reg_click = false;
		let arr = JSON.parse(window.localStorage.userArr);
		let index = arr.length - ;
		
		//输入框点击变色
		$("#number").click(function(){
			$("#numberInput").css("border-color","#3058df");
			return false; //阻止事件冒泡
		})		
		
		// 密码格式验证
		$("#pw").blur(function(){
			let v= $(".pw")[0].value;
			console.log(v);
			let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,20}$/;
			//console.log(reg.test(v));
			console.log(reg.test(v));
			if(!reg.test(v)){
			$("#vis").removeClass("visiblility-hidden");
			}else{
				
			arr[index].password = v;
			console.log(arr);
			window.localStorage.userArr = JSON.stringify(arr);
			$("#vis").addClass("visiblility-hidden");
			$("#reg-btn").attr('href', 'http://localhost:9999/pages/home/home.html');		
			}
		})
		
		
		$(".close-ico").click(function(){
			$("#vis").addClass("visiblility-hidden");
		})
		
		
	});
	
})
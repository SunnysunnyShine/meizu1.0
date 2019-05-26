require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		let reg_click = false;
		let arr = JSON.parse(window.localStorage.userArr);
		let last = arr.length-1;
		console.log(arr[last].username);
		$(".shengming > a")[0].innerHTML = arr[last].username;
		
		//输入框点击变色
		$("#number").click(function(){
			$("#numberInput").css("border-color","#3058df");
			return false; //阻止事件冒泡
		})		
		//验证码计时
		$("#get-code").click(function(){		
			alert("验证码为123456");
			let time = 60;
			
			var t = setInterval(function(){
				$("#get-code")[0].innerText = "验证码";
				$("#sec")[0].innerText = time+"s";
				time --;
				if(time == 0){
					$("#get-code")[0].innerHTML = "获取验证码";
					clearInterval(t);
					$("#sec")[0].innerText = "";
				}
			},1000);
		});
		// 验证码界面验证
		$(".btn-next").click(function(){		
			let v= $(".code_input")[0].value;
			let reg = /^\d{6}$/;
			console.log(reg.test(v));
			if(!reg.test(v)){
				$(".tip-font")[0].innerText = "验证码输入错误";
				$("#vis").removeClass("visiblility-hidden");
		}else if(reg.test(v)){
				$("#vis").addClass("visiblility-hidden");
				
				$("#reg-btn").attr('href','http://localhost:9999/pages/register/reg3.html');
				console.log("dwad");
			}
	
		});
		$(".close-ico").click(function(){
			$("#vis").addClass("visiblility-hidden");
		})
		
		
	});
	
})
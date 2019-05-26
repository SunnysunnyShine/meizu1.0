require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		let reg_click = false;
		let flag1 = false;
		let flag2 = false;
		let index = 0;

		//创建对象
		//先获取所有用户的对象//变成数组    
		if (window.localStorage.userArr) {
			//判断是否存在        
			var array = JSON.parse(window.localStorage.userArr);
		} else {
			var array = []; //创建一个新数组    
		}
		let dom = $(".content").not($("#numberReg"));

		//绑定单击事件
		//console.log($("#btn-left"));
		$("#btn-left").bind("click", function() {
			var username = $("#numberReg").val();
			//console.log("avd");
			var nameReg = /^1[34578]\d{9}$/;
			if (nameReg.test(username)) {
				for (var i = 0; i < array.length; i++) {
					//判断是否有相同账号            
					if (username == array[i].username) {
						console.log("该账号已存在");
						return;
					}
				}
				//如果账号合法且不存在，创建新用户
				var obj = {
					username: username
					//password: "a"
				}
				array.push(obj);
				console.log(array);
				flag1 = true;
				//$("#numberReg").value = "";
				window.localStorage.userArr = JSON.stringify(array);
				$("#btn-left").removeClass("left-blue").addClass("left-green");
				//css("border-color","#18A452");
				$("#btn-left > span").removeClass("b-span").addClass("g-span");
				$("#reg-btn").attr('href', 'http://localhost:9999/pages/register/reg2.html');
				$(".btn-mid")[0].innerText = "验证成功";
				console.log("用户创建成功");
				return;
			} else {
				alert("手机号输入有误");
			}

		})
		//输入框点击变色
		$("#numberReg").click(function() {
			$("#numberInput").css("border-color", "#3058df");
			return false; //阻止事件冒泡
		})

		dom.click(function() {
			$("#numberInput").css("border-color", "#dadada");
		});
		$(".close-ico").click(function() {
			$("#vis").addClass("visiblility-hidden");
		})

		$("#reg-btn").click(function() {
			if (!flag1) {
				console.log("login")
				$(".tip-font")[0].innerText = "请输入手机号码";
				$("#vis").removeClass("visiblility-hidden");

			}

		})

		console.log("ssssssssss");
	});

})

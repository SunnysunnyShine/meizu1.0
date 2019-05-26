require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		//模板解析
		function template(id, data) {
			let template = document.getElementById(id).innerHTML;
			template = 'print(`' + template + '`)';
			template = template.replace(/<%=(.+?)%>/g, '`) \n print($1) \n print(`');
			template = template.replace(/<%(.+?)%>/g, '`) \n $1 \n print(`');
			var codestr =
				`
				(function(data){
					let htmlstr = "";
					function print(val){
						htmlstr += val;
					}
					${template}
					return htmlstr;
				})
					`;
			return eval(codestr)(data);
		}
		$(".user-center").mouseenter(function(){
			$(".down-person").removeClass("visiblility-hidden");
		})
		
// 		$(".user-center").mouseleave(function(){
// 			$(".down-person").addClass("visiblility-hidden");
// 		})
// 		$(".down-person").mouseenter(function(){
// 			$(".down-person").removeClass("visiblility-hidden");
// 		})
		$(".down-person").mouseleave(function(){
			$(".down-person").addClass("visiblility-hidden");
		})
		let nav_search = Array.from($(".nav-top > input"));
		//获取数据并保存
		$.ajax({
			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267",
			dataType: 'jsonp',
			success: function(msg) {
				//导航栏部分
				let index_nav = msg.block_266;
				//获取导航栏的placeholder
				let index_sear = msg.block_233[0].placeholder;
				nav_search[0].placeholder = index_sear;
				//导航栏列表生成及赋值
				let nav_data = [];
				for (let i = 0; i < index_nav.length; i++) {
					nav_data.push(index_nav[i].name);

				}
				$(".nav-list")[0].innerHTML = template("nav-top-list", nav_data);
				//console.log(index_nav[0].floorAllocations);
				//导航列表项 a标签
				//划入显示的商品列表	
				let product_show = []
				let all_msg = {
					img: "",
					name: "",
					price: ""
				}
				let nav_hover = $("._hover"); //导航按钮
				//let hov_list = Array.from($(".nav-hover-list")); 
				//console.log(nav_hover);
				//应该是5个
				for (let j = 0; j < 4; j++) {
					//鼠标划入时
					nav_hover[j].onmouseover = function() {

						let index = $(this).index();
						//if (index < 4 || index == 8) {
							$(".nav-list > a").removeClass("white").addClass("black");
							$(".nav-hover-list").show();

							$(".img-logo").attr("src", "../../img/logo2.png");
							console.log($("._bac"));
							$("#_bac").removeClass("bac").addClass("b_hover");
							$(".user-center").css("background-image", "url('../../../img/pc_hui.png')");
							$(".user-car").css("background-image", "url('../../../img/car.png')");
							//对应生成列表
							if (index < 4) {
								for (let i = 0; i < index_nav[index].floorAllocations.length; i++) {
									all_msg.img = index_nav[index].floorAllocations[i].img;
									all_msg.name = index_nav[index].floorAllocations[i].name;
									all_msg.price = index_nav[index].floorAllocations[i].skuprice;
									product_show.push(all_msg);
									all_msg = {};
								}

								//console.log(product_show);
								$(".nav-product1")[0].innerHTML = template("product_show", product_show);
								$(".nav-hover-list").stop().animate({
									height: 191
								}, 500)
							}
						}

					nav_hover[j].onmouseout = function() {
						$("#_bac").removeClass("b_hover").addClass("bac");
						$(".nav-list > a").removeClass("black").addClass("white");
						$(".nav-hover-list").hide();
						$(".nav-product1").html("");
						$(".nav-hover-list").css({
							height: 0
						})
						$(".img-logo").attr("src", "../../img/logo.png");
						$(".user-center").css("background-image", "url('../../../img/pc.png')");
						$(".user-car").css("background-image",
							"url('https://www3.res.meizu.com/static/cn/index/images/shopping-cart-white@2x_bdcf50b.png')");
						product_show = [];
					}

				}
			
			},
			error: function() { //失败 
				alert('Error loading document');
			}
		})
		// 轮播图的区域
		var mySwiper = new Swiper('.swiper-container', {
			loop: true, // 循环模式选项
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
			},
			observer:true,//修改swiper自己或子元素时，自动初始化swiper
			observeParents:true,//修改swiper的父元素时，自动初始化swiper
			autoplay : true
			
		})
		//轮播图触发事件后继续轮播
		$(".swiper-container").mouseleave(function() {
			mySwiper.autoplay.start();
		})
		console.log("bdvd");
		
		$.ajax({
			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=268,269,363,298,299,274,352,358,359,360",
			dataType: 'jsonp',
			success: function(msg) {
				console.log(msg);
				//保存轮播图手机的信息
				let phone_msg = msg.block_268;
				let phone_data1 = [];
				let all_msg = {
					img: "",
					name: "",
				}
				//console.log(phone_msg);
				for(let i = 0; i < phone_msg.length ; i++){
					all_msg.img = phone_msg[i].img;
					all_msg.name = phone_msg[i].name;
					phone_data1.push(all_msg);
					all_msg = {};
				}
				//console.log(phone_data1);
				//console.log($(".swiper-wrapper")[0]);
				$(".swiper-wrapper")[0].innerHTML = template("banner_show",phone_data1);
				
				//轮播图下商品模板
				let phone_msg2 = msg.block_269;
				console.log(phone_msg2)
				let phone_data2 = [];
				let all_msg2 = {
					img: "",
					title: "",
					desc: ""
				}
				for(let i = 0; i < phone_msg2.length ; i++){
					all_msg2.img = phone_msg2[i].imgRetina;
					all_msg2.title = phone_msg2[i].title;
					all_msg2.desc = phone_msg2[i].desc;
					phone_data2.push(all_msg2);
					all_msg2 = {};
				}
				console.log(phone_data2);
				//console.log($(".phone-list > ul")[0]);
				$(".phone-list >ul")[0].innerHTML = template("banner_down_produce",phone_data2);
				//商品
				let phone_msg3 = msg.block_363;
				//console.log(phone_msg3)
				let phone_data3 = [];
				let all_msg3 = {
					skuLable : "",
					img: "",
					name : "",
					title: "",
					price : "",
					color : "",
					aindex : ""
				}
				for(let i = 0; i < phone_msg3.length ; i++){
					all_msg3.skuLable = phone_msg3[i].skuLable;
					all_msg3.img = phone_msg3[i].img;
					all_msg3.name = phone_msg3[i].name;
					all_msg3.title = phone_msg3[i].title;
					all_msg3.price = phone_msg3[i].skuprice.substr(1);
					all_msg3.color = phone_msg3[i].skuLableColor;
					all_msg3.aindex = "p" + i;
					//console.log(all_msg3.price)
					phone_data3.push(all_msg3);
					all_msg3 = {};
				}
				console.log(phone_data3);
				//console.log($(".phone-list > ul")[0]);
				$(".new-phone")[0].innerHTML = template("new_produce_phone",phone_data3);
				//改边距
				$(".new-goods-big:last").removeClass("bor-r");
				$(".p5").removeClass("s-bor-r"); 
				$(".p9").removeClass("s-bor-r");
				
				//魅族声学数据
				let phone_msg4 = msg.block_358;
				//console.log(phone_msg3)
				let phone_data4 = [];
				let all_msg4 = {
					color:"a",
					img: "",
					name : "",
					title: "",
					price : "",
					aindex : ""
				}
				for(let i = 0; i < phone_msg4.length ; i++){
					
					if(i%4==0){
						all_msg4.color = phone_msg4[i].fontColor;
						all_msg4.img = phone_msg4[i].setImg;
						all_msg4.price = phone_msg4[i].skuprice
					}
					else{
						all_msg4.img = phone_msg4[i].img;
						all_msg4.price = phone_msg4[i].skuprice.substr(1);
					}
					all_msg4.name = phone_msg4[i].name;
					all_msg4.title = phone_msg4[i].title;
					
					//all_msg4.color = phone_msg4[i].skuLableColor;
					all_msg4.aindex = "p" + i;
					//console.log(all_msg3.price)
					phone_data4.push(all_msg4);
					all_msg4 = {};
				}
				console.log(phone_data4);
				//console.log($(".phone-list > ul")[0]);
				$(".new-sound")[0].innerHTML = template("new_produce_all",phone_data4);
				
				//魅族配件
				let phone_msg5 = msg.block_359;
				//console.log(phone_msg3)
				let phone_data5 = [];
				let all_msg5 = {
					color:"a",
					img: "",
					name : "",
					title: "",
					price : "",
					aindex : ""
				}
				for(let i = 0; i < phone_msg5.length ; i++){
					
					if(i%4==0){
						all_msg5.color = phone_msg5[i].fontColor;
						all_msg5.img = phone_msg5[i].setImg;
						all_msg5.price = phone_msg5[i].skuprice
					}
					else{
						all_msg5.img = phone_msg5[i].img;
						all_msg5.price = phone_msg5[i].skuprice.substr(1);
					}
					all_msg5.name = phone_msg5[i].name;
					all_msg5.title = phone_msg5[i].title;
					
					//all_msg5.color = phone_msg4[i].skuLableColor;
					all_msg5.aindex = "p" + i;
					//console.log(all_msg3.price)
					phone_data5.push(all_msg5);
					all_msg5 = {};
					
				}
				console.log(phone_data5)
				$(".new-config")[0].innerHTML = template("new_produce_all",phone_data5);
				// 生活周边
				let phone_msg6 = msg.block_360;
				//console.log(phone_msg6)
				let phone_data6 = [];
				let all_msg6 = {
					color:"a",
					img: "",
					name : "",
					title: "",
					price : "",
					aindex : ""
				}
				for(let i = 0; i < phone_msg6.length ; i++){
					
					if(i%4==0){
						all_msg6.color = phone_msg6[i].fontColor;
						all_msg6.img = phone_msg6[i].setImg;
						all_msg6.price = phone_msg6[i].skuprice
					}
					else{
						all_msg6.img = phone_msg6[i].img;
						all_msg6.price = phone_msg6[i].skuprice.substr(1);
					}
					all_msg6.name = phone_msg6[i].name;
					all_msg6.title = phone_msg6[i].title;
					all_msg6.aindex = "p" + i;
					//console.log(all_msg3.price)
					phone_data6.push(all_msg6);
					all_msg6 = {};
					
				}
				//console.log(phone_data6)
				$(".new-life")[0].innerHTML = template("new_produce_all",phone_data6);
				
				//评论区
				let phone_msg7 = msg.block_298;
				//console.log(phone_msg6)
				let phone_data7 = [];
				let all_msg7 = {
					imgShow:"a",
					userComment: "",
					tips: "",
					aindex : ""
				}
				for(let i = 0; i < 8 ; i++){
					all_msg7.imgShow = phone_msg7[i].img;
					//all_msg7.userImg = phone_msg8[i].setImg;
					//all_msg7.userId = phone_msg6[i].skuprice		
					all_msg7.userComment = phone_msg7[i].description;
					all_msg7.tips = phone_msg7[i].tips;
					//all_msg6.title = phone_msg6[i].title;
					all_msg7.aindex = "p" + i;
					phone_data7.push(all_msg7);
					all_msg7 = {};
					
				}
				console.log(phone_data7)
				$(".comment")[0].innerHTML = template("com-msg",phone_data7);
				$(".p3").removeClass("a_right"); 
				$(".p7").removeClass("a_right");
				
				
			},
			error: function() { //失败 
				alert('Error loading document');
			}
			
		});
		
// 		$.ajax({
// 			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=268,269,363,298,299,274,352,358,359,360",
// 			dataType: 'jsonp',
// 			success: function(msg) {
// 		},
// 			error: function() { //失败 
// 				alert('Error loading document');
// 			}
// 		})
		
		
		
		
		
	})

})

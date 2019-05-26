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
		
		
		// getcookie和addcookie
		//添加和取出cookie
		function addCookie(key,value,days) {
			var now = new Date();
			now.setDate(now.getDate() + days);
			document.cookie = key+"="+value+"; expires="+now+ ";path="+"/";
		}
		
		function getCookie(key) {
			var str = document.cookie; 
			//若果不是以 ; 号结尾的
			var reg1 = new RegExp(key+"=([^;]+)$");
			//如果以逗号结尾的
			var reg2 = new RegExp(key+"=([^;]+);");
			
			if(reg1.test(str)) {
				//返回属性名
				return str.match(reg1)[1];
			} else if(reg2.test(str)){
				return str.match(reg2)[1];
			}else{
				//刚进入的时候传入是空，就返回null
				return null;
			}
		}
		
		
		
		
		
		
		
		
		
		$(".user-center").mouseenter(function() {
			$(".down-person").removeClass("visiblility-hidden");
		})

		$(".down-person").mouseleave(function() {
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

				//导航列表项 a标签
				//划入显示的商品列表	
				let product_show = []
				let all_msg = {
					img: "",
					name: "",
					price: ""
				}
				let nav_hover = $("._hover"); //导航按钮

				for (let j = 0; j < 4; j++) {
					//鼠标划入时
					nav_hover[j].onmouseover = function() {

						let index = $(this).index();

						$(".nav-hover-list").show();

						$("#_bac").removeClass("bac").addClass("b_hover");

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
						$(".nav-hover-list").hide();
						$(".nav-product1").html("");
						$(".nav-hover-list").css({
							height: 0
						})
						product_show = [];
					}

				}

			},
			error: function() { //失败 
				alert('Error loading document');
			}
		})
		console.log("ssss");
		
		var url = window.location.href;
		console.log(url);
		var intPattern = /[0-9]{1,2}$/;
		console.log((intPattern.exec(url)[0]));
		var jsonUrl =  intPattern.exec(url)[0] ;
		console.log( jsonUrl);
		var i_index = Number(jsonUrl);
		console.log(i_index);
		$.ajax({
			url: "meizu01.json",
			type: 'get', //数据发送方式 
			dataType: 'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
			error: function() { //失败 
				alert('Error loading document');
			},
			success: function(msg) { //成功 
				console.log(msg);
				var goodsList = {};
				var goodsArr = [];
				// for (var i = 0; i < msg.block_363.length; i++) {
					goodsList.name = msg.block_363[i_index].name;
					goodsList.imgUrl = msg.block_363[i_index].img;
					goodsList.pir = msg.block_363[i_index].skuprice;
					goodsList.title = msg.block_363[i_index].title;
					goodsArr.push(goodsList);
					// goodsList = {};	
				// }
				console.log(goodsArr);
				$(".container").html(template("goodMsg", goodsArr));
			
			// 立即购买绑定事假
			
			console.log($(".property-buy-action").find("a"));
			$(".property-buy-action").find("a").click(function(){
				console.log("a");
// 				
// 				var proname =  1;
// 				var proimg = 1;
// 				var propir = 1;
				
				
				var proname =  msg.block_363[i_index].name;
				var proimg = msg.block_363[i_index].img;
				var propir = msg.block_363[i_index].skuprice;
				console.log(propir);
				
				// 定义数组存放数据
				var pl = {
					"pname": proname,
					"pmoney": propir,
					// "pcode": pcode,
					"pnumber": 1,
					"pimg":proimg
				}
				var str = getCookie("product"); //取出cookie里面的内容
				
					if(str == null){//如果cookie是空的,表示第一次保存商品信息
						var arr = [];
						//写下面，因为有判断,不是同一个元素才推进数组,否则就数量加一
						//将对象里面的东西放进去
						// arr.push(pl);
						
						//写下面，全部判断结束后才放入
						//将数组的东西存入cookie
						// addCookie("plist", JSON.stringify(arr));
					}else{//cookie中已存在商品信息
						//取出数组里面的东西先放进数组在
						var arr = JSON.parse(str);
						//写下面，因为有判断,不是同一个元素才推进数组,否则就数量加一
						//将对象里面的东西放进去
						// arr.push(pl);
						
						//写下面，全部判断结束后才放入
						//再将数组的东西存入cookie
						// addCookie("plist", JSON.stringify(arr));
					}
					
					//但是,如果点击同一个商品,只会在cookie里面再推入一个,所以要在对象设置一个数量的属性,当检查到是同样元素的时候,就给数量加一
					var check = arr.find(function (item){
						//find()方法是返回判断结果为true 的元素,找编号相同的元素
						return item.pname == pl.pname;
					})
					//如果check存在,
					if(check){
						//找到编号一样的数量就加1
						//数组是引用变量,这里改变,数组的值也会改变
						check.pnumber++;
					}else{
						//没有一样的就推入数组
						arr.push(pl);
					}
					
					//全部判断结束后才放入
					addCookie("product", JSON.stringify(arr));
				
				console.log(getCookie("product"))
				
			})
			
			}
		});
		
		
		
		
		
		


	})
});

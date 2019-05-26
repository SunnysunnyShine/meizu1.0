"use strict";

require(["../../static/conf/config.js"], function () {
  require(["jquery", "sw"], function ($, Swiper) {
    refresh(); //模板解析

    function template(id, data) {
      var template = document.getElementById(id).innerHTML;
      template = 'print(`' + template + '`)';
      template = template.replace(/<%=(.+?)%>/g, '`) \n print($1) \n print(`');
      template = template.replace(/<%(.+?)%>/g, '`) \n $1 \n print(`');
      var codestr = "\n\t\t\t\t\t\t(function(data){\n\t\t\t\t\t\t\tlet htmlstr = \"\";\n\t\t\t\t\t\t\tfunction print(val){\n\t\t\t\t\t\t\t\thtmlstr += val;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t".concat(template, "\n\t\t\t\t\t\t\treturn htmlstr;\n\t\t\t\t\t\t})\n\t\t\t\t\t\t\t");
      return eval(codestr)(data);
    } // 刷新函数


    function refresh() {
      $(".goods-car").html(""); //取出ciikie里面存储的东西

      var lists = JSON.parse(getCookie("product"));

      if (lists) {
        console.log(lists); //遍历数组

        var shopcarList = {};
        var shopcarArr = [];
        lists.forEach(function (item) {
          console.log(item);
          shopcarList.name = item.pname;
          shopcarList.pir = item.pmoney.substr(1);
          shopcarList.num = item.pnumber;
          shopcarList.imgUrl = item.pimg;
          shopcarArr.push(shopcarList); //console.log("a");
          //console.log(shopcarList);
          // 			table.children[0].appendChild(newtr);
          // $("#gwcMsg").append(template("shopcarMsg", shopcarList));

          $(".goods-car").append(template("goodsMsg", shopcarList));
        });
      }
    }

    refresh(); // getcookie和addcookie
    //添加和取出cookie

    function addCookie(key, value, days) {
      var now = new Date();
      now.setDate(now.getDate() + days);
      document.cookie = key + "=" + value + "; expires=" + now + ";path=" + "/";
    }

    function getCookie(key) {
      var str = document.cookie; //若果不是以 ; 号结尾的

      var reg1 = new RegExp(key + "=([^;]+)$"); //如果以逗号结尾的

      var reg2 = new RegExp(key + "=([^;]+);");

      if (reg1.test(str)) {
        //返回属性名
        return str.match(reg1)[1];
      } else if (reg2.test(str)) {
        return str.match(reg2)[1];
      } else {
        //刚进入的时候传入是空，就返回null
        return null;
      }
    }

    refresh(); //1.减号
    //如果类名中有reduce,就说明找到了减号按钮
    //console.log($(".pnum-add"));

    $(".pnum-add").click(function () {
      //console.log("a");
      //用商品编号来确定找到的是哪一个商品
      //找到点击按钮下一个元素中的商品编号
      var pcode_find = $(this).parent().parent().siblings(".phone-msg").find(".goods-name").html(); //先获取cookie中所有的元素,就行对比找到点击的是哪一个元素

      var lists = JSON.parse(getCookie("product")); //findIndex()方法返回返回结果为ture的下标

      var index = lists.findIndex(function (item) {
        return item.pname == pcode_find;
      }); //找到下标之后数量减一,但是要进行判断不能少于一

      --lists[index].pnumber;

      if (lists[index].pnumber <= 1) {
        lists[index].pnumber = 1;
        alert("该宝贝不能再减少了哦");
      } //修改后,再将内容写入cookie


      addCookie("product", JSON.stringify(lists));
      refresh();
      window.location.reload();
    }); //2.加号

    $(".pnum-red").click(function () {
      console.log("a"); // 
      //核心思想:先找到点的哪个商品,拿出来给数加一，然后再写回去
      //用商品编号来确定找到的是哪一个商品
      //找到点击按钮上一个元素中的商品编号

      var pcode_find = $(this).parent().parent().siblings(".phone-msg").find(".goods-name").html(); //先获取cookie中所有的元素,就行对比找到点击的是哪一个元素

      var lists = JSON.parse(getCookie("product")); //findIndex()方法返回返回结果为ture的下标

      var index = lists.findIndex(function (item) {
        return item.pname == pcode_find;
      }); //找到下标之后数量加1

      lists[index].pnumber++; //修改后,再将内容写入cookie

      addCookie("product", JSON.stringify(lists));
      refresh();
      window.location.reload();
    });
  });
});
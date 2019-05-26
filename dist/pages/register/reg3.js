"use strict";

require(["../../static/conf/config.js"], function () {
  require(["jquery", "sw"], function ($, Swiper) {
    var reg_click = false;
    var arr = JSON.parse(window.localStorage.userArr); //输入框点击变色

    $("#number").click(function () {
      $("#numberInput").css("border-color", "#3058df");
      return false; //阻止事件冒泡
    }); // 密码格式验证

    $("#pw").mouseleave(function () {
      var v = $(".pw")[0].value;
      console.log(v);
      var reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,20}$/; //console.log(reg.test(v));

      console.log(reg.test(v));

      if (!reg.test(v)) {
        $("#vis").removeClass("visiblility-hidden");
      } else {
        $("#vis").addClass("visiblility-hidden");
        $("#reg-btn").attr('href', 'http://localhost:9999/pages/login/login.html');
      }
    });
    $(".close-ico").click(function () {
      $("#vis").addClass("visiblility-hidden");
    });
  });
});
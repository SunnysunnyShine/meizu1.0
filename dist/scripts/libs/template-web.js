"use strict";

//模板解析
function template(id, data) {
  var template = document.getElementById(id).innerHTML;
  template = 'print(`' + template + '`)';
  template = template.replace(/<%=(.+?)%>/g, '`) \n print($1) \n print(`');
  template = template.replace(/<%(.+?)%>/g, '`) \n $1 \n print(`');
  var codestr = "\n\t\t(function(data){\n\t\t\tlet htmlstr = \"\";\n\t\t\tfunction print(val){\n\t\t\t\thtmlstr += val;\n\t\t\t}\n\t\t\t".concat(template, "\n\t\t\treturn htmlstr;\n\t\t})\n\t\t\t");
  return eval(codestr)(data);
}
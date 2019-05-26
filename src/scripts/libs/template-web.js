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

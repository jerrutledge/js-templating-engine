function add_code (line, is_code) {
	is_code ? code += 'r.push('+line+');' :
		code += 'r.push("'+line+'");';
}

var template_engine = function (template, data) {
	var re = new RegExp("{{(([^}]|}(?!}))*)}}", "g");

	var code = "var r = [];";

	function add_code (line, is_code) {
		is_code ? code += 'r.push('+line+');' :
			code += 'r.push("'+line+'");';
	}

	var remaining_string = template, string_index, new_match;
	new_match = template.match(re);
	console.log(new_match);
	for (var i = 0; i <= new_match.length - 1; i++) {
		console.log(new_match[i].substr(2, new_match[i].length - 4));
		string_index = remaining_string.indexOf(new_match[i]);
		var string_non_code = remaining_string.substr(0, string_index);
		var string_code = new_match[i].substr(2, new_match[i].length - 4);
		console.log("Non-code : " + string_non_code);
		console.log("Code-code: " + string_code);
		add_code(string_non_code, false);
		add_code(string_code, true);
		remaining_string = remaining_string.substr(string_index + 
			new_match[i].length, remaining_string.length);
	};

	add_code(remaining_string, false);
	code += 'return r.join("");';

	console.log(code);
}

var template = '<p>Hello, my name is {{name}}. I\'m {{age}} years old.</p>';
template_engine(template, {
    name: "Krasimir Tsonev",
    profile: { age: 29 }
});
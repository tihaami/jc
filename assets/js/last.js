var cart = JSON.parse(sessionStorage.getItem("cart"));
function setup(){
	$(".container").fadeIn(1000,function () {
	});
}

window.onload = function(){
	setup();
}

$("#submitButton").on("click",function() {
	$("form").on("submit",function(e){
		e.preventDefault();
		var serialNo;
		$.when($.ajax({
			url:"https://script.google.com/macros/s/AKfycbxK7B1rZs2swnQl3hwJxnjjzYwhcZ3M6HEaipa7p4RZ-YSu2fnt/exec?req=JSON",
			success: function (data) {
				serialNo = JSON.parse(data).serialNo;
				console.log(serialNo);
				for(var i=0;i<cart.length;i++){
					cart[i].serialNo = "CL-"+serialNo;
					cart[i].fullName = $("#name").val();
					cart[i].address = $("#address").val();
					cart[i].city = $("#city").val();
					cart[i].contactNo = $("#cno").val();
					cart[i].email = $("#email").val();
					cart[i].formula = cart[i].serialNo+"-"+cart[i].nameOnProduct+"-"+cart[i].nameLanguage+"-"+cart[i].productType+" "+
										cart[i].product+"-"+cart[i].city;
					$.ajax({
					    url: "https://script.google.com/macros/s/AKfycby0bS6wsX9aEcdKq5XvUUGWsGbopPNoAeOaw9rBYtiFf8q08YQ/exec",
					    method: "GET",
					    dataType: "json",
					    data: cart[i]
					});
				}
				$.ajax({
					async:false,
					url: "https://script.google.com/macros/s/AKfycbxK7B1rZs2swnQl3hwJxnjjzYwhcZ3M6HEaipa7p4RZ-YSu2fnt/exec",
					method: "GET",
					dataType: "json",
					data: {"serialNo": serialNo+1}
				});
				sessionStorage.setItem("cart",JSON.stringify(cart));
			}
		})).then(
			$(".form").fadeOut(2000,function(){
				window.location.assign("receipt.html");
			})
		);
	});
});
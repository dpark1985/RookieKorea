$(document).ready(function() {
	var isLogin = $("#isLogin").html();


	if(isLogin.trim() != ""){
		$('#isLogin').hide();
		$('#noLogin').hide();
		$('#yesLogin').show();

	} else{
		$('#isLogin').hide();
		$('#noLogin').show();
		$('#yesLogin').hide();
	}
});


$(document).ready(function(){
  var userName = $('#isLogin').html();
  
  /* 로그인 되었을때 */
  if(userName != "Please login"){
    alert('test');
    $('#userLogin').html("");
    $('#userLogin').html("Hi, <%= user %> <a href='/logout' id='logout'>Logout</a>");
  } else{

  }

  /* 로그아웃 클릭 되었을때 */
  $('#logout').click(function(){
    $('#userLogin').html("");
    $('#userLogin').html("<a href='/login' class='navbar-link'>login</a> or <a href='/register' class='navbar-link'>register</a>");
  });
});
jQuery(function(){
	// 生成随机验证码并写入页面
	var randomCode ='';
	$num = $('#num')
    function randomC(){
        for(let i=0;i < 6;i++){
             randomCode += parseInt(Math.random()*10);
        };
        $num.text(randomCode);
    };
    randomC();
	$yzm = $('#yzm')
	$login = $('#login')
	$tishi = $('.tishi')
	console.log($login)
	$login.on('click',function(){
		if($yzm.val() !== $($num[0]).text()){
			$tishi.text('验证码错误')
		}else if($yzm.val() == $($num[0]).text()){
			$tishi.text('')
		}else if($('#password1').val() && $('#password2').val() == ''){
			$('.pass').html('密码不能为空')
		}else if($('#password1').val() != $('#password2').val()){
			$('.pass2').html('密码不一致')
		}else{
			alert('注册成功')
		}
	})
	
	
	
	
	
	
});

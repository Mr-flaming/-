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
	$phone = $('#phone')
	console.log($login)
	$('input').on('blur',function(){
		if($yzm.val() !== $($num[0]).text()){
			$tishi.text('验证码错误')
			$yzm.css({background:'red'})
		}else if($yzm.val() == $($num[0]).text()){
			$tishi.text('')
			$yzm.css({background:'#fff'})
		}
		var res = /^1[3|4|5|8][0-9]\d{4,8}$/
		if(!res.text($phone)){
			$('.tishi').text('手机号码格式不正确请修改')
		}
		
	})
		

	
	
	
	
});

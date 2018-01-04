jQuery(function($){
	$('.box').smCarousel({
		imgs:['css/img/nav1.jpg','css/img/nav2.jpg','css/img/nav3.jpg','css/img/nav4.jpg','css/img/nav5.jpg','css/img/nav6.jpg'],
		buttons:true
	});
	$.post('http://127.0.0.1:1996/src/api/box3.php',function(res){
		var _res = res;
		
		$box31 = $('.box31').html(function(){
			return $(_res).map(function(){
				return `<li class="${this.id}">
					<a href="#"><img src ="${this.img}"></a>
				</li>`
			}).get().join('');
		});
	},"json");
	//box3的生成商品
	//
	$.post('http://127.0.0.1:1996/src/api/goodslist1.php',function(res){
		var _res = res;
		
		$goodslist = $('.goodslist_ul').html(function(){
			return $(_res).map(function(){
				return `<li class="${this.id}">
					<a href="#"><img src ="${this.img}"></a>
				</li>`
			}).get().join('');
		});
	},"json");
	//goodslist1的生成商品
	$.post('http://127.0.0.1:1996/src/api/goodslist2.php',function(res){
		var _res = res;
		
		$goodslist2 = $('.goodslist2_ul').html(function(){
			return $(_res).map(function(){
				return `<li class="${this.id}">
					<a href="#"><img src ="${this.img}"></a>
				</li>`
			}).get().join('');
		});
	},"json");
	//goodslist2的生成商品
	$.post('http://127.0.0.1:1996/src/api/goodslist3.php',function(res){
		var _res = res;
		
		$goodslist3 = $('.goodslist3_ul').html(function(){
			return $(_res).map(function(){
				return `<li class="${this.id}">
					<a href="#"><img src ="${this.img}"></a>
				</li>`
			}).get().join('');
		});
	},"json");
	//goodslist3的生成商品
});

jQuery(function(){
	//解传参
	var params = location.search
	params = decodeURI(params);
	//问号后开始
	params = params.slice(1);
	//拆分成数组
	params = params.split('&');
//	console.log(params)
	//遍历数组，还原成对象
	var data ={};
	params.forEach(function(item){
		var arr = item.split('=');
		data[arr[0]] = arr[1];
		
	})
//		console.log(data)
	//获取小图片
	var arrs = data.simg.split(',');
	
	$min_ul = $('.min_ul').html(function(){
//		console.log(arrs)
		return arrs.map(function(item){
			return `<li>
				<img src ="${item}">
			</li>`
		}).join('');
	});
	
	//获取大图片
	var arrb = data.bigimg.split(',');
	$max_ul = $('.max_ul').html(function(){
		return arrb.map(function(item){
			return `<li>
				<img src ="${item}">
			</li>`
		}).join('');

	});
	
	//切换
	var $min_ul = $('.min_ul');
	var $min_li = $min_ul.find('li');
	var $max_ul = $('.max_ul');
	var $max_li = $max_ul.find('li');
	//隐藏除了第一个之外
	$max_li.slice(1).hide();
	//默认第一个高亮
	$min_li.first().addClass('active');
	//点击切换
	$min_ul.on('mouseover','img',function(){
		
		//添加高亮删除其他的
		$(this).addClass('active').parent().siblings().find('img').removeClass('active');
		
		//获取当前索引
		var idx = $(this).parent().index();
		//淡入淡出
		$max_li.eq(idx).stop(true,true).fadeIn(100).siblings().fadeOut(100);
	})
	
	
	
	
	
	
	//放大镜--------------------------------
	var $fangdajing = $('.fangdajing');
	//大图小图比例
	var ratio;
	
	//事件
	$max_ul.on('mouseenter','img',function(){
		
		//生成img获取事件img的src
		$img = $('<img/>').attr('src',$(this).attr('src'));
		//每次移入后删除节点
		$fangdajing.html('');
		//超大图的css
		$img.css({width:800,height:800})
		//插入父级
		$img.appendTo($fangdajing);
		//移入显示
		$fangdajing.show();
		//创建半透明div
		$div = $('<div/>').addClass('zoom');
		//div的样式
		$div.css({width:200,height:200,position:'absolute',left:0,top:0,backgroundColor: 'rgba(0,0,255,0.4)',filter:'alpha(Opacity=10)'});
		$div.appendTo($max_ul);
		
		//移出中图片时候隐藏
	}).on('mouseleave',function(){
		$fangdajing.hide();
		$max_ul.find($div).hide();
	}).on('mousemove',function(e){
			$img = $('<img/>').attr('src',$(this).attr('src'));
			var left = e.pageX - $max_ul.offset().left - $div.outerWidth()/2;
			var top = e.pageY - $max_ul.offset().top  - $div.outerHeight()/2;

			if(left < 0){
					left = 0;
				}else if(left > $max_ul.outerWidth()-$div.outerWidth()){
					left = $max_ul.outerWidth()-$div.outerWidth();
				}
				if(top < 0){
					top = 0;
				}else if(top > $max_ul.outerHeight()-$div.outerHeight()){
					top = $max_ul.outerHeight()-$div.outerHeight();
				}
		//大图$img/中图
		ratio = $('.fangdajing img').outerWidth()/$('.max_ul').outerWidth();
		
//		console.log($('.fangdajing img').outerWidth(),$max_ul.find('img').outerWidth())
		
		// 设置放大镜尺寸
		// 跟放大区域成比例
		$('.zoom').css({
			width:$fangdajing.width/ratio,
			height:$fangdajing.height/ratio
		});
			$('.zoom').css({left:left,top:top});
            $('.fangdajing').children().css({position:'relative',left:-left*ratio,top:-top*ratio});
//			console.log($('.fangdajing').left)
		})
		
		
		
	//cookie---------------------------------------------------------------------	
		//点击商品颜色与size
		$size = $('.sizes');
		$color = $('.colors');
		$size_li = $size.find('li');
		$color_li = $color.find('li');
		$color_li.last().addClass('active');
		$color_li.on('mousedown',function(){
//			console.log(this)
			$(this).addClass('active').siblings().removeClass('active');
			
		})
		$size_li.on('mousedown',function(){
//			console.log(this)
			$(this).addClass('active').siblings().removeClass('active');
			
		});

		
	//cookie---------------------------------------------------------------------
			
		   	$shop = $('#shop');
			var arr = [];
			var carlist = [];
			
			$shop.on('mousedown',function(){	
			//第二步用于保存购物车中的商品信息
	        var cookies = document.cookie;
	        if(cookies.length){
	        	cookies = cookies.split('; ');
	//      	console.log(cookies)
	        	cookies.forEach(function(item){
	        		var res = item.split('=');
	        		if(res[0] === 'list'){
	        			carlist = JSON.parse(res[1]);
	        		}
	        	})
	        }
        
			for(var i=0;i<$color_li.length;i++){
				if($color_li[i].className.toLowerCase() == 'active'){
					var currentC = $($color_li[i]).last().text();
				}
			}
			for(var i=0;i<$size_li.length;i++){
				if($size_li[i].className.toLowerCase() == 'active'){
					var currentS = $($size_li[i]).text();
				}
			}
			var currentV = $('select').val()
			data.qty = currentV
			data.color = currentC
			data.size = currentS
			//创建时间保存cookie
			var time = new Date();
			time.setDate(time.getDate()+10);
			
			//现判断有商品的情况下
			if(cookies.length){
				for(var i=0;i<carlist.length;i++){
					//有相同商品的情况
					console.log(carlist[i].color == currentC && carlist[i].size == currentS);
					if(carlist[i].color == currentC && carlist[i].size == currentS){
						carlist[i].qty = currentV*1 + carlist[i].qty*1
//						console.log(carlist[i]);
						break
					}
				
				}
//				console.log(i,carlist.length)
				//判断无相同商品的情况
				if(i==carlist.length){
					var goods = {
						id:carlist[0].id,
						bigimg:carlist[0].bigimg,
						simg:carlist[0].simg,
						oldPrice:carlist[0].oldPrice,
						img:carlist[0].img,
						name:carlist[0].name,
						Price:carlist[0].newPrice,
						size:currentS,
						color:currentC,
						qty:currentV,
						num:carlist[0].qty*carlist[0].newPrice
					}
					carlist.push(goods);
				}
				document.cookie = 'list=' + JSON.stringify(carlist) + ';expires='  + time.toUTCString();
			}
			else{
				console.log('第一次');
				//原cookie没商品的时候，第一次加入商品
				arr.push(data);
				document.cookie = 'list=' + JSON.stringify(arr) + ';expires='  + time.toUTCString();
			}			
		});

		
	
	
	
	
	
});

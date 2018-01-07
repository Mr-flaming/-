jQuery(function(){
	//读取cookie
	var carlist;
	var cookies = document.cookie;
	console.log(cookies)
	if(cookies.length){
		cookies = cookies.split('; ');
		cookies.forEach(function(item){
			var arr = item.split('=');
			if(arr[0] == 'list'){
				carlist = JSON.parse(arr[1]);
			}
		})
		$car_goods = $('.car_goods').html(function(){
		return carlist.map(function(item){
//			console.log(carlist.id = item.color+item.size)
			
			$('em').html(carlist[0].qty*carlist[0].newPrice)
			$('.totalQty').text(carlist[0].qty)
			return `<li data-id='${item.color+item.size}'>
				<span class='car_1'><input type="checkbox" name="goods_box" checked class="check"/></a></span>
				<span class='car_2'><img src="../css/img/cartupian.jpg" alt="" /></span>
				<span class='car_3'><a href="">${item.name}${item.color}</a></span>
				<span class='car_4'>${item.size}</span>
				<span class='car_5'>￥<em>${item.newPrice}</em></span>
				<span class='car_6'><a href=""><img src="../css/img/jian.bmp" class="minus"/></a><input type="text" value="${item.qty}" id="qty"/><a href=""><img src="../css/img/jia.bmp" class="add" /></a></span>
				<span class='car_7'>-</span>
				<span class='car_8'>￥${item.qty*item.newPrice}</span>
				<span class="car_9"><a href="" id="btn">删除</a></span>
			</li>`
		})
	})
	}
	
//		carlist = carlist.simg.split(',');
		console.log(carlist);
		
	
	//封装时间
	function time(){
		var time = new Date();
		time.setDate(time.getDate()+10);
        document.cookie = 'list=' + JSON.stringify(carlist) + ';expires' + time.toUTCString();
	}
	function settime(){
		var now = new Date();
        now.setDate(now.getDate()-100);
        document.cookie = 'list=x;expires=' + now.toUTCString();
	}
	//点击增加数量和价钱
	$add = $('.add');
	$('.car_goods').on('mousedown','.add',function(){
		//获取该元素父级id
		var currentLi = $(this).closest('li')[0].dataset.id;
		console.log(currentLi)
		$(carlist).each(function(i,item){
			if(item.id == currentLi){
				item.qty++;
			}
		})
		time();
	})
	//点击减少数量和价钱
	$minus = $('.minus');
	$('.car_goods').on('mousedown','.minus',function(){
		var currentLi = $(this).closest('li')[0].dataset.id;
		$(carlist).each(function(i,item){
			if(item.id == currentLi){
				item.qty--;
			}
		})
		time();
	})
	//点击删除单个商品
	$btn = $('#btn')
	$btn.on('mousedown',function(){
		$(this).parent().parent().remove();
		settime();
		$('.totalQty').text('0');
        $('.total').text('0')
	})
	
	
	//点击删除所以商品+判断全选
	// 创建事件，使全选按钮状态与所有按钮状态一致
    var all = document.querySelector('#all');
    var check = document.querySelectorAll('.check');
    all.onclick = function(){
        for(var i = 0;i < check.length;i++){
            check[i].checked = all.checked;
            if(all.checked == false){
            	$('.totalQty').text('0');
            	$('.total').text('0')
            }else if(all.checked == true){
				$('.totalQty').text(carlist[0].qty);
				$('em').text(carlist[0].qty*carlist[0].newPrice)  	
            }
        }
    }


    // 循环各个按钮，设定所有按钮点击成功触发全选按钮；
    for(var i=0;i<check.length;i++){
        check[i].onclick = function(){
            all.checked = isCheckAll();
        }
    }
    function isCheckAll(){
        var res = true;
        for(var i=0;i<check.length;i++){
            if(!check[i].checked){
                res = false;
                break;
            }
        }
        return res;
    }
    //----------------------------------------反选

	
	//删除全部
	$btn = $('.btn')
	$car_goods = $('.car_goods')
	$btn.on('mousedown',function(){
		$car_goods.html('');
		settime();
		$('.totalQty').text('0');
        $('.total').text('0')
	})
	
	
	//生成总价 总数量
	
	
	
	
	
});

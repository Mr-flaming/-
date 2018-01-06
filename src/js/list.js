jQuery(function(){
	var pageN = document.querySelector('.pageN');
	var pageNo = 1;
	var qty = 15;
	$.post('../api/list.php',{pageNo:pageNo,qty:qty},function(res){
		function arr(res){
			var _res = res;
			$goodslist_ul = $('.goodslist_ul').html(function(){
			
			return _res.data.map(function(item){
				   
				return `<li data-id='${item.id}'>
						<a href="#"><img src ="${item.img}"></a>
						<a href="#"><p>${item.name}</p></a>
						<p>售价￥：<del>${item.oldPrice}</del></p>
					</li>`
				
			}).join('');
			
			
			});
			var pageQty = Math.ceil(_res.total/qty);
//			var i = document.querySelector('i');
			for(var i=1;i<=pageQty;i++){
				var li = document.createElement('li')
				li.innerHTML = i
//				console.log(i,pageNo)
				if(i == pageNo){
					li.className = 'active';
				}
				pageN.appendChild(li);
			
			}
		}
		arr(res);
		
		//点击列表页事件
		
		$('.pageN').on('click','li',function(){
			pageN.innerHTML = ''
			li = pageNo = this.innerText*1;
			$.post('../api/list.php',{pageNo:li,qty:qty},function(res){
				arr(res);
			},"json");
		})
		
		console.log(res)
		
			$('.goodslist_ul').on('click','li',function(){
                var id = $(this).attr('data-id');
//              console.log(res.data[id]);
                var params = '?';
//              console.log(res.data)
                $(res.data).each(function(i,item){
                	if(item.id == id){
                		for(var attr in item){
                    		params += attr + '=' + item[attr] + '&';
                		}
//              		console.log(1)
                		//删除多余&
                		params = params.slice(0,-1);
                		//跳转页面
                		location.href = 'detail.html' + encodeURI(params);
                	}
                	
                })
                
                
            });
		
		
		
		
		
	},"json");

		
		
	
	
	
	
	
	
});

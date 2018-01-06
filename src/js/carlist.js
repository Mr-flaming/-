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
	}
		console.log(carlist);
		
//	$car_goods = $('.car_goods').html(function(){
//		return carlist.map(function(item){
//			return `<li data-id='${item.id}'>
//				<span class='car_2'>${item.simg[0]}</span>
//				<span class='car_3'>${item.name}</span>
//				<span class='car_31'>${item.color}</span>
//				<span class='car_4'>${item.size}</span>
//				<span class='car_5'>${item.price}</span>
//				
//				
//			</li>`
//		})
//	})
//	
	
	
	
	
	
	
	
	
	
	
	
	
});

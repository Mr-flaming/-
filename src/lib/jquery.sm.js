;(function($){
	// $.prototype.lxCarousel = function(options){
	$.fn.smCarousel = function(option){
		var defaults = {
			//宽
			width:1200,
			//高
			height:535,
			//是否自动播放
			autoPlay:true,
			//索引
			index:0,
			//页码
			page:true,
			//左右按钮
			buttons:false,
			//轮播类型(horizontal,seamless,fade,vartical)
			type:'vertical',
			//延迟时间
			duration:3000,
		}
		
		this.each(function(idx,ele){
			var $self = $(ele);
			// console.log(this)
			console.log($self)
			// console.log($self[0])
			var opt = $.extend({},defaults,option);
			//这里的this指向html结构的box
			$self.addClass('sm-carousel');
			//设置宽高
			$self.css({
				width:opt.width,
				height:opt.height
			});
			var lx = {
				init:function(){
					//创建一个ul
					$ul = $('<ul/>');

					$ul.html(opt.imgs.map(item=>{
						return `<li>
							<img src="${item}"/>
						</li>`
					}).join(''));
					//插入box
					$self.append($ul);
					//判断结构里的button：是true还是false，如果是true才走以下；
					if(opt.buttons){
						// $('<span/>').addClass('btn-prev').html('&lt;').addendTo($self);
						// $('<span/>').addClass('btn-next').html('&gt;').addendTo($self);
						$('<span/>').addClass('btn-prev').html('&lt;').appendTo($self);
						$('<span/>').addClass('btn-next').html('&gt;').appendTo($self);
					};
					//移入移出
					$self.hover(function(){
						clearInterval($self.timer);
					},function(){
						lx.move();
					}).on('click','.btn-prev',function(){
						opt.index--;
						lx.show();
					}).on('click','.btn-next',function(){
						opt.index++;
						lx.show();
					})
					opt.len = opt.imgs.length;
					this.show();
					this.move();
					return this
				},
				move:function(){
					$self.timer = setInterval(function(){
						opt.index++;
						this.show();
					}.bind(this),opt.duration);
					return this;
				},
				show:function(){	
					//处理index
					if(opt.index >= opt.len){
						opt.index=0;
					}else if(opt.index < 0){
						opt.index=opt.len-1;
					}
					var $ul = $self.find('ul');
					$ul.animate({top:-opt.index*opt.height})
					return this;
				}
			}
			lx.init();

		});
		return this;
	};
})(jQuery);
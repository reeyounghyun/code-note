
$(function(){
	mainFunc();
});


function mainFunc(){
	var main_flow = null;
	var main_banner = null;
	var main_banner_slide_length = 0;
	var mc_imgthum_container = $(".mc_imgthum_container");
	var btn_custom_auto = $(".btn_custom_auto");
	var mc_quick_wrap= $(".mc_quick_wrap");
	var btn_custom_auto_toggle_text = btn_custom_auto.text();
	if($(".mc_quick_container .swiper-slide").length>1){
		main_flow = new Swiper(".mc_quick_container", {
			speed : 800,
            navigation: {
                nextEl: '.btn_mc_quick_control.next_control',
                prevEl: '.btn_mc_quick_control.prev_control',
            },
			scrollbar: {
				el: ".mc_quick_container .swiper-scrollbar",
				draggable : true
			},
			breakpoints: {
				// 1280px 보다 클 경우
				1023: {
					speed : 500
				}
			}
		});
		main_flow.on("slideChange",function(){
			if(main_flow.realIndex==0){
				mc_quick_wrap.removeClass("type2");
			}else{
				mc_quick_wrap.addClass("type2");
			}
		});
	}
	if(mc_imgthum_container.length){
		main_banner_slide_length = $(".mc_imgthum_container .swiper-slide").length;
		$(".custom_control_layer .current_length").text(main_banner_slide_length);
		if($(".mc_imgthum_container .swiper-slide").length>1){
			main_banner = new Swiper(".mc_imgthum_container", {
				speed : 800,
				navigation: {
					nextEl: '.btn_custom_control.next_move',
					prevEl: '.btn_custom_control.prev_move',
				},
				 autoplay: {
					delay: 5000,
					disableOnInteraction : false
				},
				on : {
					slideChange : function(){
						// realIndex
						$(".custom_control_layer .current_index").text(main_banner.realIndex+1);
					}
				},
				effect: 'fade',
				keyboard: {
					enabled: true,
					onlyInViewport: false,
				},
				fadeEffect: {
					crossFade: true
				}
			});
		}else{
			$(".mc_imgthum_banner_zone").addClass("type2");
		}
		main_banner.on("slideChange",function(){
			setTimeout(function(){
				$(".mc_imgthum_container .swiper-slide.swiper-slide-active").find(".mc_link_obj").focus();
			},20);
		});
		$(".btn_custom_auto").on("click",function(e){
			e.preventDefault();
			var $t = $(this);
			var $t_hidden = $t.children(".hdtext");
			var $t_toggle_text = $t.attr("data-play");
			$t.toggleClass("type2");
			if($t.hasClass("type2")){
				$t_hidden.text($t_toggle_text);
				main_banner.autoplay.stop();
			}else{
				$t_hidden.text(btn_custom_auto_toggle_text);
				main_banner.autoplay.start();
			}
		});
	}


	var enterKeyPress = false;
	$(window).on("keydown",function(e){
		var keycode = e.keyCode || e.which;
		var btn_auto = $(".btn_custom_auto");
		if(keycode == 13){
			enterKeyPress = true;
		}else{
			enterKeyPress = false;
		}

		btn_auto.addClass("type2");
		if(btn_auto.hasClass("type2")){
			btn_auto.children(".hdtext").text(btn_auto.attr("data-play"));
			main_banner.autoplay.stop();
		}
	});
}

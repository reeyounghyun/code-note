if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
var focusGlobalItem = "a,button,textarea,input[type='button'],input[type='image'],input[type='input'],input[type='password'],input[type='checkbox'],input[type='radio'],select,[tabindex]";
var userAgent=navigator.userAgent.toLowerCase();
var resizePartWidth = 1023;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
$(function(){
	commonInit();
	dimLayerControl();
	// subContentsTogglefunc();
	scform();
	datePicker();
	//alert($("html").attr("class"))
});
$(window).on("load",function(){
	submapMenu();
	// localLayer();
	commonResize();
	headerFunc();
});

/* pc헤더 */
function headerFunc(){
	var header_wrap = $(".header_wrap");
	var head_group = $(".head_group");
	var headgnb_list = $(".headgnb_list");
	var headgnb_li = $(".headgnb_list > li");
	var hgm = $(".hgm");
	var htm_vlist_z = $(".htm_vlist_z");
	var currentMenu = null;
	var animated = false;
	var firstTouch = false;
	var maincheck = $(".main_wrap").length ? true : false;

	// init
	getMenuHeight();
	head_group.find(".htm").last().addClass("head_focus_last");

	// event
	$(window).on("resize",function(){
		if($(window).width()>1024){
			getMenuHeight();
		}
	});
	headgnb_li.hoverIntent({
		over : function(){
			var $t = $(this);
			activeMemu($t);
		},
		out : function(){
		
		},
		interval : 30
	});
	head_group.hoverIntent({
		over : function(){
			
		},
		out : function(){
			beactiveMemu();
		},
		interval : 30
	});
	hgm.on("focusin",function(){
		var $t = $(this),
			$t_p = $t.parent();
		activeMemu($t_p);
	});
	$(".head_focus_last").on("focusout",function(){
		beactiveMemu();
	});

	// action
	function getMenuHeight(){
		header_wrap.addClass("get_mode");
		headgnb_li.each(function(){
			var $t = $(this),
				$t_vlist_z = $t.find(".htm_vlist_z");
			if($t_vlist_z.length){
				$t.attr("data-height",$t_vlist_z.outerHeight());
			}
		});
		header_wrap.removeClass("get_mode").addClass("ready");
	}

	function activeMemu(target){
		var $target = target;
		var $target_hgm = $target.children(".hgm");
		var setTimeValue = 0;
		if(animated){return;}
		animated = true;
		if(maincheck){
			header_wrap.addClass("active");
		}
		if(currentMenu){
			currentMenu.removeClass("active");
			currentMenu.children(".hgm").removeClass("active");
		}
		$target.addClass("active");
		$target_hgm.addClass("active");
		if(setTimeValue){clearTimeout(setTimeValue)}
		setTimeValue = setTimeout(function(){
			htm_vlist_z.css({height : Number($target.attr("data-height")) });
			htm_vlist_z.one("transitionend",function(){
				if($target.hasClass("active")){
					
				}
			});
			currentMenu = $target;
			animated = false;
		},30);
	}

	function beactiveMemu(){
		var setTimeValue = 0;
		animated = false;
		htm_vlist_z.css({height : 0});
		if(maincheck){
			header_wrap.removeClass("active");
		}
		if(setTimeValue){clearTimeout(setTimeValue)}
		if(currentMenu){
			currentMenu.children(".hgm").removeClass("active");
		}
		setTimeValue = setTimeout(function(){
			if(currentMenu){
				currentMenu.removeClass("active");
			}
		},510);
	}
	
}

/* 공통리사이즈 호출 */
function commonResize() {
	var $window_width = 0;
	var mobile_mainmenu_zone = $(".mobile_mainmenu_zone");
	$(window).on("resize", function () {
		if ($window_width == $(window).width()) {
			return;
		}

		subForm();
		reformFunc();
		maxLabel();
		responTable();
		if ($(window).width() < resizePartWidth) {

		} else {
			if (mobile_mainmenu_zone.length){
				mobile_mainmenu_zone.trigger("closeTotal");
			}
		}
	}).resize();
}


/* menu rock(모바일) */
function mobileMenuRock(target){
	$(function(){
		var $target = $(target),
			$t_p = $target.parents(".mbmenu_vlist > li"),
			$t_togone = $t_p.find(".mbmenu_one");
			$t_two = $t_p.find(".mbmenu_two_vlist_w");
		$t_p.addClass("active");
		$target.addClass("active");
		$t_togone.addClass("active");
		if($t_two.length){
			$t_two.show();
		}
	});
}


/* max label width 값 세팅 */
function maxLabel(){
	var $reslabel_parent = $(".reslabel_parent");
	$(".reslabel").css({"min-width":""});
	$reslabel_parent.each(function(){
		var $this = $(this);
		var $this_label = $this.find(".reslabel");
		var max_wid = [];
		$this_label.each(function(){
			max_wid.push($(this).outerWidth());
		});
		if($(window).width()>1023){
			if($this_label.hasClass("pc_elsewid")){
				return;
			}
		}
		$this_label.css({ "min-width" : Math.max.apply(null,max_wid) });
	});
}

/* 스크롤 넓이 구하기 */
function getScrollBarWidth() {
	var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};

function responTable(){
	var $respon_list = $(".respon_list");
	$respon_list.each(function(){
		var $respon_tr = $(this).find("tbody tr");
		var $respon_td_label = $respon_tr.find(".mbtd_fxlabel");
		var max_wid = [];
		$(".mbtd_fxlabel").css({"min-width":""});
		$respon_td_label.each(function(){
			$(this).each(function(){
				max_wid.push($(this).outerWidth());
			});
		});
		$respon_td_label.css({"min-width" : Math.max.apply(null,max_wid)});
	});
}



/* submap 공통ui */
function submapMenu() {
	var submap_zone_parent = $(".submap_zone_parent");
	var submap_zone_parent_pos = submap_zone_parent.length ? submap_zone_parent.offset().top : 0;
	var submap_zone = $(".submap_zone");
	var map_toggle_current = $(".map_toggle_current");
	var sub_map_fxitem = $(".sub_map_fxitem");
	$(window).on("resize",function(){
		submap_zone_parent_pos = submap_zone_parent.length ? submap_zone_parent.offset().top : 0;
	});

	$(window).on("scroll",function(e){
		submap_zone_parent_pos = submap_zone_parent.length ? submap_zone_parent.offset().top : 0;
		if ($(window).scrollTop() > submap_zone_parent_pos){
			submap_zone.addClass("fixed");
		}else{
			submap_zone.removeClass("fixed");
		}
	});
	if($(window).scrollTop()>0){
		$(window).trigger("scroll");
	}

	map_toggle_current.on("click",function(){
		var $this = $(this);
		var $t_p = $this.parents(".sub_map_fxitem");
		var $t_c = $this.siblings(".map_depth_vlist_wrap");
		var $g_item = $(".sub_map_fxitem").not($t_p);
		var $g_map = $(".map_depth_vlist_wrap").not($t_c);
		if($this.hasClass("not_toggle")){return;}
		if($g_item.hasClass("active")){
			$g_item.removeClass("active");
			$g_map.slideUp();
		}
		$t_p.toggleClass("active");
		$t_c.slideToggle();
	});

	$(document).on("click",function(e){
		if (!$(e.target).parents(".sub_map_fxwrap").length && !$(e.target).is(".map_toggle_current")){
			$(".sub_map_fxitem").removeClass("active");
			$(".map_depth_vlist_wrap").hide();
		}
	});
	map_toggle_current.on("focus",function(){
		var $this = $(this);
		var $t_p = $this.parents(".sub_map_fxitem");
		var $t_c = $this.siblings(".map_depth_vlist_wrap");

		$t_p.siblings(".sub_map_fxitem").removeClass("active");
		$t_p.siblings(".sub_map_fxitem").find(".map_depth_vlist_wrap").slideUp();
	});
	sub_map_fxitem.last().find(".map_depth").last().on("focusout",function(){
		var $this = $(this);
		var $t_p = $this.parents(".sub_map_fxitem");
		var $t_c = $t_p.find(".map_depth_vlist_wrap");

		$t_p.removeClass("active");
		$t_c.slideUp();
	});
}

function loginTabFunc(){
	var $sf_intab = $(".sf_intab");
	var $sf_inboxcont = $(".sf_inboxcont");
	var $mid_contents = $(".mid_contents");
	var midfocusOut = false;
	var clickis = false;

	$sf_intab.last().addClass("last");
	$sf_intab.on("click",function(e){
		clickis = true;
		var $t = $(this);
		var $t_t = $($t.attr("href"));
		e.preventDefault();
		$t.siblings(".sf_intab").removeClass("active");
		$t.siblings(".sf_intab").removeAttr("title");
		$t.addClass("active");
		if($t_t.length){
			$t_t.siblings(".sf_inboxcont").removeClass("active");
			$t_t.addClass("active");
		}
		$t.attr("title","선택됨");
	});
	// $(window).on("keydown",function(e){
    //     clickis = false;
    // });
	// $sf_intab.on("focusout", function (e) {
	// 	if(clickis){return;}
	// 	var $this = $(this);
	// 	if ($this.hasClass("active")) {
	// 		$sf_inboxcont.find("a,button,input,select").first().focus();
	// 	} else {
	// 		if ($this.hasClass("last")) {
	// 			$(".ctout_item").focus();
	// 		}
	// 	}
	// });
	// $mid_contents.on("focusout",function(){
	// 	midfocusOut = true;
	// });
	// $mid_contents.on("focusin",function(){
	// 	midfocusOut = false;
	// });
	// $(".ctout_item").on("focus",function(){
	// 	if (midfocusOut){
	// 		$(".sf_intab.active").next().focus();
	// 	}
	// });
}

function subContentsTabFunc(tablist,cont){
	var $sctab_contents = $(cont);
	var $tablist = $(tablist);
	var $sctab = $tablist.find(".sctab");
	var $scdep_tab = $sctab_contents.find(".scdep_tab");
	var $mid_contents = $(".mid_contents");

	// $sctab_contents.each(function () {
	// 	var focusable = [];
	// 	var el_lastFocus = null;
	// 	var el_lastPrevFocus = null;
	// 	$(this).find("*").each(function (i, val) {
	// 		if (val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
	// 			focusable.push(val);
	// 		}
	// 		if ((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
	// 			focusable.push(val);
	// 		}
	// 	});

	// 	el_lastFocus = focusable[focusable.length - 1];
	// 	el_lastPrevFocus = focusable[focusable.length - 2];
	// 	if ($(el_lastFocus).prop("disabled")) {
	// 		$(el_lastPrevFocus).addClass("last_focus");
	// 	} else {
	// 		$(el_lastFocus).addClass("last_focus");
	// 	}
	// });

	

	$sctab.last().addClass("last");
	$scdep_tab.last().addClass("last");
	$sctab.on("focusout", function (e) {
		if($(this).parents(".sctab_hlist_w").hasClass("fixed")){return;}
		if($(e.type) == "click"){return;}
		if ($(this).parents("li").hasClass("active")) {
			$sctab_contents.find("a,button,input,select").first().focus();
		} else {
			if ($(this).hasClass("last")) {
				$(".ctout_item").focus();
			}
		}
	});
	// $sctab_contents.find(".last_focus").on("focusout", function (e) {
	// 	$("li.active",$tablist).next().find(".sctab").focus();
	// });
	var midfocusOut = false;
	$mid_contents.on("focusout",function(){
		midfocusOut = true;
	});
	$mid_contents.on("focusin",function(){
		midfocusOut = false;
	});
	$(".ctout_item").on("focus",function(){
		if (midfocusOut){
			$("li.active", $tablist).next().find(".sctab").focus();
		}
	});
}


/* 공통 레이아웃 호출 */
function commonInit(){
	// touchmode 식별
	if(touchstart){
		$("html").addClass("touchmode");
	}else{
		$("html").removeClass("touchmode");
	}
	
	if(userAgent.indexOf('samsung')>-1){
		$("html").addClass("samsung");
	}

	var enterKeyPress = false;
	$(window).on("keydown",function(e){
        var keycode = e.keyCode || e.which;
        
        if(keycode == 13){
            $("body").addClass("focus_mode");
			enterKeyPress = true;
        }else{
			$("body").addClass("focus_mode");
			enterKeyPress = false;
        }
    });
	
	$(window).on("click",function(e){
		if(!enterKeyPress){
			$("body").removeClass("focus_mode");
		}
    });


	var $midcontents = $(".mid_contents");
	if($midcontents.length){
		// if($midcontents.next()[0].nodeName == "SCRIPT"){
		// 	console.log($midcontents.next().next("div,footer,section"));
		// 	$midcontents.next().next("div,footer,section").find(focusGlobalItem).first().addClass("ctout_item");
		// }else{
		// 	$midcontents.next("div,footer,section").find(focusGlobalItem).first().addClass("ctout_item");
		// }
		// if($midcontents.next()[0].nodeName == "SCRIPT"){
		// }else{
		// 	$midcontents.next().find(focusGlobalItem).first().addClass("ctout_item");
		// }
		$midcontents.nextAll("div,footer,section").first().find(focusGlobalItem).first().addClass("ctout_item");
	}

	/* 스킵메뉴 접근성 이동 스크립트 */
	var $skipitem = $(".skiplist");
	if($skipitem.length){
		$('.skiplist a').blur(function(){
			setTimeout(function(){
				var $focused = $(':focus');
				if( !$('.skiplist a').is(':focus') ) {
					$('body').removeClass('skip');
				}
			},10);			
		}).click(function(ev){
			var target = $( $(this).attr('href') );
			target.attr('tabindex', 0).focus();
		});
	}

	relativeSite();
	headerAction();
	
	// mobile total
	function mbTotal() {
		var $btn_mbmenucall = $(".btn_mbmenucall"),
			$mobile_mainmenu_zone = $(".mobile_mainmenu_zone"),
			$mainmenu_dim = $(".mainmenu_dim"),
			$btn_mbmenuclose = $(".btn_mbmenuclose"),
			$mbmenu_low = $(".mbmenu_low"),
			$mobile_mainmenu_wrap = $(".mobile_mainmenu_wrap"),
			$mbmenu_one = $(".mbmenu_one"),
			$mbmenu_two_vlist_w = $(".mbmenu_two_vlist_w"),
			$mbmenu_vli = $(".mbmenu_vlist > li"),
			$mb_skip = $(".mb_skip"),
			$phtotalObj = null;
		// init 
		if ($mbmenu_low.length) {
			$phtotalObj = new IScroll(".mbmenu_low", {
				mouseWheel: true,
				preventDefault: false
			});
			$mbmenu_one.on("click", function (e) {
				var $this = $(this),
					$t_p = $this.parents("li"),
					$t_pw = $t_p.find(".mbmenu_two_vlist_w");
				e.preventDefault();
				if ($mbmenu_two_vlist_w.length) {
					$mbmenu_vli.not($t_p).removeClass("active");
					$mbmenu_two_vlist_w.not($t_pw).slideUp();
				}
				$t_pw.slideToggle(function () {
					$phtotalObj.refresh();
				});
				$t_p.toggleClass("active");
			});
			$mobile_mainmenu_zone.on("refresh", function () {
				$phtotalObj.refresh();
			});
			$mobile_mainmenu_zone.on("closeTotal", function () {
				totalClose();
			});
			$btn_mbmenucall.on("click", function (e) {
				e.preventDefault();
				totalOpen();
			});
			$mb_skip.on("click", function (e) {
				totalOpen();
			});
			$btn_mbmenuclose.on("click", function (e) {
				e.preventDefault();
				totalClose();
				$btn_mbmenucall.focus();
			});
			$mainmenu_dim.on("click", function (e) {
				e.preventDefault();
				totalClose();
				$btn_mbmenucall.focus();
			});
			function totalOpen() {
				$mobile_mainmenu_zone.show();
				setTimeout(function () {
					$mobile_mainmenu_zone.addClass("active");
					$phtotalObj.refresh();
					setTabControl($mobile_mainmenu_wrap);
				}, 30);
				if (touchstart) {
					document.ontouchmove = function (e) { e.preventDefault(); };
					$("body,html").addClass("touchDis2").on("touchmove", function (e) {
						e.preventDefault();
					});
				}
			}
			function totalClose() {
				$mobile_mainmenu_zone.removeClass("active");
				setTimeout(function () {
					$mobile_mainmenu_zone.hide();
					if (touchstart) {
						document.ontouchmove = function (e) { return true; };
						$("body,html").removeClass("touchDis2").off("touchmove");
					}
				}, 500);
			}
		}
	}
	
	$(window).on("load",function(){
		mbTotal();
	});
}

/* 달력호출 */
function datePicker(){
	var $datepicker = $(".define_calendar");
	if($datepicker.length){
		$datepicker.each(function(){
			var $dateThis = $(this);
			$(this).datepicker({
				monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				changeMonth: true,
				changeYear: true,
				dateFormat: 'yy-mm-dd'
			});
		});
		var $windowWidth = 0;
		$(window).on("resize",function(){
			if($windowWidth == $(window).width() && touchstart){return;}
			$datepicker.datepicker("hide");
			$windowWidth = $(window).width();
		});
		/*$datepicker.on("focus",function(){
			$(window).off("resize");
		});
		$datepicker.on("focusout",function(){
			$(window).on("resize");
		});*/
	}
}

// 푸터 연관사이트
function relativeSite(){
	var friend_site = $(".friend_site");
	var btn_related_go = $(".btn_related_go");
	friend_site.on("change",function(){
		var $this = $(this),
			$t_opt = $this.children("option:selected"),
			$t_opt_value = $t_opt[0].value;
		if ($t_opt_value == ""){
			$v_data = "javascript:;";
			btn_related_go.attr({ "href": "javascript:;" });
			btn_related_go.removeAttr("target");
			// alert("사이트를 선택해 주세요");
		}else{
			btn_related_go.attr({ "href": $t_opt[0].value, "target": "_blank" });
		}
	});
	btn_related_go.on("click",function(){
		var $friend_site_opt = friend_site.children("option:selected"),
			$friend_site_value = $friend_site_opt[0].value;
		if ($friend_site_value == ""){
			alert("사이트를 선택해 주세요");
			friend_site.focus();
		}
	});
}

// 상단헤더 액션
function headerAction(){
	var dimd = null;
	var $header_wrap = $(".header_wrap");
	var btn_headsearch = $(".btn_headsearch");
	var btn_headsearch_hdtext = btn_headsearch.find(".hdtext");
	var btn_headsearch_opentext = btn_headsearch_hdtext.text();
	var btn_headsearch_closetext = btn_headsearch.attr("data-closeText");
	var search_toplayer = $(".search_toplayer");
	var $page_wrap = $(".page_wrap");
	if($page_wrap.length===0){return;}
	$header_wrap.next("div,footer,section").find(focusGlobalItem).first().addClass("hdout_item");
	$page_wrap.append("<div class='bg_dim' />");
	dimd = $(".bg_dim");

	$(window).on("resize",function(){
		if($header_wrap.length){
			search_toplayer.css({"top" : $header_wrap.outerHeight() , "max-height" : $(window).height() - ($header_wrap.outerHeight() + $header_wrap.offset().top) });
		}
	}).resize();

	var searchfocusOut = false;
	search_toplayer.on("focusout",function(){
		searchfocusOut = true;
	});
	search_toplayer.on("focusin",function(){
		searchfocusOut = false;
	});

	
	
	btn_headsearch.on("click",function(){
		openCloseAction();
	});
	dimd.on("click",function(){
		if(search_toplayer.hasClass("active")){
			closeAction();
		}
	});
	// openCloseAction();

	
	// $(".hdout_item").on("focus",function(){
	// 	if(search_toplayer.hasClass("active") && btn_headsearch.hasClass("mode_del") && searchfocusOut){
	// 		btn_headsearch.focus();
	// 	}
	// });

	$header_wrap.next().on("focusin",function(){
		if(search_toplayer.hasClass("active") && btn_headsearch.hasClass("mode_del") && searchfocusOut){
			btn_headsearch.focus();
		}
	});


	function openCloseAction(){
		$header_wrap.toggleClass("search_active");
		search_toplayer.toggleClass("active");
		btn_headsearch.toggleClass("mode_del");
		dimd.fadeToggle();
		if(search_toplayer.hasClass("active")){
			$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()})
			$("html").addClass("touchDis");
			btn_headsearch_hdtext.text(btn_headsearch_closetext);
		}else{
			$("html,body").removeClass("touchDis touchDis2");
			$("body").css({"margin-top":0});
			window.scrollTo(0,Number($("body").data("data-scr")));
			btn_headsearch_hdtext.text(btn_headsearch_opentext);
		}
	}

	function closeAction(){
		$header_wrap.removeClass("search_active");
		search_toplayer.removeClass("active");
		btn_headsearch.removeClass("mode_del").focus();
		dimd.fadeOut();
		$("html,body").removeClass("touchDis touchDis2");
		$("body").css({"margin-top":0});
		window.scrollTo(0,Number($("body").data("data-scr")));
	}
}

// 레이어
function localLayer(){
	var subcont_zone = $(".subcont_zone");
	var local_layercall = $(".local_layercall");
	var deptail_layer = $(".deptail_layer");
	var deptail_layer_active = $(".deptail_layer.active");
	var btn_lyskin_close = $(".btn_lyskin_close");
	var datapositem = null;

	$(window).on("resize",function(){
		if (deptail_layer_active.length && deptail_layer_active.attr("data-positem") !== undefined){
			datapositem = $(deptail_layer_active.attr("data-positem"));
			if (datapositem.length){
				deptail_layer_active.css({"top" : "" });
				deptail_layer_active.css({ "top": datapositem.position().top });
			}
		}
	});

	local_layercall.on("click",function(e){
		e.preventDefault();
		var $this = $(this),
			$t_pos = $($this.attr("data-postarget")),
			$t_t = $($this.attr("data-layertarget"));
		if(subcont_zone.length){
			subcont_zone.append(deptail_layer);
		}
		if($t_t.length){
			deptail_layer.removeClass("active");
			$t_t.css({
				"top": $t_pos.position().top
			})
			$t_t.addClass("active").attr("data-positem", $this.attr("data-postarget"));
			setTabControl($t_t);
		}
		deptail_layer_active = $(".deptail_layer.active");
	});

	btn_lyskin_close.on("click",function(e){
		e.preventDefault();
		var $this = $(this),
			$t_p = $this.parents(".deptail_layer"),
			$t_btn = $("[data-layertarget='#"+$t_p.attr("id")+"']");
		$t_p.removeClass("active");
		setTimeout(function(){
			$t_btn.focus();
		},30);
	});
	$(document).on("click",function(e){
		if (!$(e.target).parents(".btn_deptailcall").length && !$(e.target).parents(".deptail_layer").length && !$(e.target).is(".local_layercall")){
			deptail_layer_active.removeClass("active");
		}
	});
}

/* form 아이템 */
function scform(){
	$(document).on("change",".form_select",function(){
		var $t = $(this),
			$t_option = $t.children("option:selected");
		if($t_option[0].value === "0"){
			$t.addClass("ready_select");
		}else{
			$t.removeClass("ready_select");
		}
	});
}

function subContentsTogglefunc(obj){
	$(function(){
		action();
	});
	function action(){
		var btn_call = $(".btn_deptailcall");
		btn_call.each(function(){
			var toggleIs = false;
			$(this).on("click",function(e){
				e.preventDefault();
				var toggleis = false;
				var $t = $(this),
					$t_t = $($t.attr("data-toggleTarget")),
					$t_hdtext = $t.find(".hdtext"),
					$t_p = $t.parents(".subdep3_vtitle_fxwrap");
				if ($t_t.length){
					$t_p.toggleClass("active");
					$t_t.slideToggle();
				}
				if(toggleIs){
					$t_hdtext.text(obj.openText);
				}else{
					$t_hdtext.text(obj.closeText);
				}
				toggleIs = !toggleIs;
			});
		});
	}
}

/* form */
function reformFunc(){
	var $resitem = $("[data-pcwid]");
	if($resitem.length===0){return;}
	$resitem.each(function(){
		var $this = $(this);
		if($(window).width()<=1023){
			$this.css({"width":""});
		}else{
			$this.css({ "width": $this.attr("data-pcwid")});
		}
	});
}
function subForm(){
	$(function(){
		var $datambcols = $("[data-mbcols]");
		var $dataplaceholder = $("[data-placeholder]");
		$datambcols.each(function(){
			var $t = $(this),
				$t_attri = $t.attr("data-mbcols");
			
			if($(window).width()<=1023){
				$t.attr("colspan", $t_attri);
			}else{
				$t.attr("colspan", $t.attr("data-origin"));
			}
		});
		$dataplaceholder.each(function(){
			var $t = $(this),
				$t_attri = $t.attr("data-placeholder");

			if ($(window).width() <= 1023) {
				$t.removeAttr("placeholder");
			} else {
				$t.attr("placeholder", $t_attri);
			}
		});
	});
}

/* layer popup event */
function dimLayerControl(){
	var touchIs = "ontouchstart" in window,
		$modal = $(".dimlayer_z");
	if($modal.length===0){return;}
	
	var readywidth = $(window).width();
	
	var objThis = this;
	$modal.on("click",".btn_layerclose,.closetrigger,.fullpop_dim,.pop_dim",function(e){
		var $this = $(this),
			$t_p = $this.parents(".dimlayer_z"),
			$t_back = $($t_p.attr("data-closefocus")),
			$t_back_class = $($t_p.attr("data-closeClass")),
			$t_back_class_index = $t_p.attr("data-closeClassIndex");
		e.preventDefault();
		objThis.dimLayerHide({ 
			target : $t_p,
			closeCallback : function(){
				setTimeout(function(){
					if($t_back.length){
						$t_back.focus();
					}
					if($t_back_class.length){
						$t_back_class.eq($t_back_class_index).focus();
					}
				},40);
			}
		});
	});
};
/* layer popup show */
function dimLayerShow(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_td = null,
		$page_wrap = null,
		$fullpop_item = null,
		$fullpop_titlow = null,
		$fullpop_contlow = null,
		$page_wrap = null,
		$t_tpt = 0,
		$t_tpb = 0,
		$res_value = 0;
	
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".norpop_modal");
		$t_box_cont = $target.find(".layer_cont");
		$page_wrap = $(".page_wrap");
		
		
		if($modal.length===0){return;}
		$modal.removeClass("active");
		$target.addClass("active");
		
		var boxzoneHeight = $t_box.outerHeight(); 
		$t_box.css({"top" : 0});

		
		$page_wrap.css({"z-index":0});
		$page_wrap.append($target);
		heightcheck();

		// fullContHeight();

		normalCont();
		
		if ($target.hasClass("fulltype")) {
			$fullpop_titlow = $target.find(".fullpop_titlow");
			$fullpop_contlow = $target.find(".fullpop_contlow");
			$fullpop_item = $target.find(".fullpop_item");
		}


		setTimeout(function(){
			if ($target.hasClass("fulltype")) {
				setTabControl($fullpop_item);
			}else{
				setTabControl($t_box);
			}
		},50);
		if("openCallback" in option){
			option.openCallback();
		}
		function fullContHeight(){
			if ($target.hasClass("fulltype")) {
				$fullpop_titlow = $target.find(".fullpop_titlow");
				$fullpop_contlow = $target.find(".fullpop_contlow");
				$fullpop_item = $target.find(".fullpop_item");
				if ($fullpop_titlow.length) {
					$fullpop_contlow.css({height : ""});
					if ($(window).width() > 1023) {
						$res_value = 60;
					} else {
						$res_value = 40;
					}
					$fullpop_contlow.css({
						height: $fullpop_item.outerHeight() - $fullpop_titlow.outerHeight() - $res_value
					});
				}
			}
		}
		function heightcheck(){
			if(touchIs){
				if(option.scrollCheck == undefined){
					$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
				}
				$("html").addClass("touchDis");
			}else{
				normalCont();
			}
		}
		var $windowWid = 0;
		$(window).on("resize", function () {
			if ($windowWid == $(window).width() && touchIs) {
				return;
			}
			normalCont();
			$windowWid = $(window).width();
		});


		function normalCont(){
			boxzoneHeight = $t_box.outerHeight();
			if(boxzoneHeight > $(window).height()){
				$("html").addClass("touchDis2");
				$target.addClass("atype2");
			}else{
				$target.removeClass("atype2");
			}
		}
	});
};
/* layer popup hide */
function dimLayerHide(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_box_duration = 0;
		
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		
		if($modal.length===0){return;}
		var boxzoneHeight = $t_box.outerHeight()+$t_tpt+$t_tpb; 
		var varheight = 0;
		
		if(boxzoneHeight > $(window).height()){
			varheight = boxzoneHeight;
		}else{
			varheight = $(window).height();
		}
		
		$target.removeClass("active");
		$(".page_wrap").css({"z-index":""});
		$("html,body").removeClass("touchDis touchDis2");
		scrollEnd();
		
		if("closeCallback" in option){
			option.closeCallback();
		}
		
		function scrollEnd(){
			if(touchIs){
				$("body").css({"margin-top":0});
				window.scrollTo(0,Number($("body").data("data-scr")));
			}
		}
	});
}


/* tab */
function tabModul(){
	var $ctab = $("[data-tabTargetgroup]").find(".d_ctab");
	$ctab.on("click",function(e){
		e.preventDefault();
		var $this = $(this),	
			$t_t = $($this.attr("href")),
			$t_p = $($this.parents("[data-tabTargetgroup]")),
			$t_p_g = $($t_p.attr("data-tabTargetgroup"));


		if($t_p_g.length){
			$t_p_g.find(".d_ctabcont").hide();
		}
		if($t_t.length){
			$t_t.show();
		}
		$t_p.find(".d_ctab").removeClass("active");
		$this.addClass("active");
	});
}

/* 레이어 포커스 머물게 하는 함수 */
function setTabControl(element){
    var focusable = [];
    $(element).attr("tabIndex","0");
    $(element).find("*").each(function(i, val) {
        if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
            focusable.push(val);
        }
        if((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
            focusable.push(val);
        }
    });

    el_firstFocus = focusable[0];
    el_lastFocus = focusable[focusable.length-1];

    $(el_firstFocus).on("keydown",function(e){
        if(e.target == this){
            var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
                if(e.shiftKey){
                    $(el_lastFocus).focus();
                    e.preventDefault();
                }
            }
        }
    });
    $(el_lastFocus).on("keydown",function(e){
        if(e.target == this){
            var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
                if(!e.shiftKey){
                    $(el_firstFocus).focus();
                    e.preventDefault();
                }
            }
        }
    });
    $(element).find($(el_firstFocus)).focus();
}


function accodianFunc(){
	var $acc_bar = $(".acc_bar");
	var $acc_vitem = $(".acc_vitem");
	var $submap_zone_fixed = $(".submap_zone");
	var $submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
	var height_respon_data = $(window).width()>1023 ? $submap_zone_height : 0;
	$acc_bar.on("click",function(e){
		e.preventDefault();
		var $t = $(this);
		var $t_p = $t.parents(".acc_vitem");
		var $t_pz = $t.closest(".accodian_ui_wrap");

		$submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
		height_respon_data = $(window).width()>1023 ? $submap_zone_height : 0;

		if($acc_vitem.not($t_p).hasClass("active")){
			$acc_vitem.not($t_p).removeClass("active");
		}
		$t_p.toggleClass("active");
		if($t_pz.hasClass("d_scroll")){
			$("html,body").animate({"scrollTop" : ($t_p.offset().top - height_respon_data)-20 },500);
		}
	});
}

function tableScrollCall(option){
	var window_wid = 0;
	$(function(){
		action();
		$(window).on("resize",function(){
			if(window_wid == $(window).width()){
				return;
			}
			action();
			window_wid = $(window).width();
		});
	});

	function action(){
		var target = $(option.target);
		var fake_tbody_scroll_zone = target.find(".fake_tbody_scroll_zone");
		var fake_thead_fxwrap = target.find(".fake_thead_fxwrap");
		var fake_tbody_tr = fake_tbody_scroll_zone.find(".fake_td_tr");
		// var fake_tbody_tr_get = fake_tbody_tr.eq(heightVaule+1).position().top;
		var heightVaule = 0;
		var fakte_tbody_pos = "100%";
		var fake_tbody_scroll_zone_wid = fake_tbody_scroll_zone.outerWidth() || 0;
		var fake_tbody_tr_wid = fake_tbody_tr.outerWidth() || 0;
		var getScrollBar = fake_tbody_scroll_zone_wid - fake_tbody_tr_wid;
		fake_thead_fxwrap.css({
			"padding-right" : getScrollBar
		});
		fake_tbody_scroll_zone.css({
			"max-height" : ""
		});
		if($(window).width()<1024){
			heightVaule = Number(option.rowpos)-3;
		}else{
			heightVaule = Number(option.rowpos);
		}
		setTimeout(function(){
			fakte_tbody_pos = fake_tbody_tr.eq(heightVaule).length ? fake_tbody_tr.eq(heightVaule).position().top : "100%";
			fake_tbody_scroll_zone.css({
				"max-height" : fakte_tbody_pos
			});
		},30);
		// fake_tbody_scroll_zone.css({
		// 	"height" : fake_tbody_tr_get
		// });
	}
}


function toggleUI(){
	var $toggle_vitem = $(".toggle_vitem");
	var $toggle_vbar = $(".toggle_vbar");
	var $submap_zone_fixed = $(".submap_zone");
	var $submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
	var height_respon_data = $(window).width()>1023 ? $submap_zone_height : 0;
	$toggle_vbar.on("click",function(e){
		$submap_zone_fixed = $(".submap_zone.fixed");
		$submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
		height_respon_data = $(window).width()>1023 ? $submap_zone_height : 0;
		e.preventDefault();
		var $this = $(this),
			$t_p = $this.parents(".toggle_vitem"),
			$g_item = $toggle_vitem.not($t_p),
			$t_c = $t_p.find(".toggle_vcont");
		
		if($g_item.hasClass("active")){
			$g_item.removeClass("active");
		}
		$t_p.toggleClass("active");
		$("html,body").animate({"scrollTop" : ($t_p.offset().top - height_respon_data)-20 },500);
	});
}


function maxHeightFunc(target){
	var $target = $(target);
	var window_width = 0;
	action();
	$(window).on("resize",function(){
		if(window_width === $(window).width()){return;}
		if($(window).width()>1023){
			action();
		}else{
			$target.css({"min-height" : "" });
		}
		window_width = $(window).width();
	});

	function action(){
		var heightArray = [];
		$target.css({"min-height" : "" });
		if($target.length){
			$target.each(function(){
				heightArray.push($(this).height());
			});
			$target.css({"min-height" : Math.max.apply(null,heightArray)});
		}
	}
	
}


function scrollTab(target){
	var $scroll_ui = $(target);
	var $scdep_tab_hlist_parent = $scroll_ui.find(".scdep_tab_hlist_parent");
	var $scdep_tab_hlist_parent_pos = $scdep_tab_hlist_parent.offset().top || 0;
	var $scdep_tab_hlist = $scdep_tab_hlist_parent.find(".scdep_tab_hlist");
	var $scdep_tab = $scdep_tab_hlist_parent.find(".scdep_tab");
	var $scdep_tab_hlist_z = $scdep_tab_hlist_parent.find(".scdep_tab_hlist_z");
	var $scdep_tab_hlist_height = $scdep_tab_hlist.length ? $scdep_tab_hlist.outerHeight() : 0;
	var $submap_zone_fixed = $(".submap_zone");
	var $submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
	var height_respon_data = $(window).width()>1023 ? $submap_zone_height : 0;
	posUpdate();


	$(window).on("resize",function(){
		posUpdate();
		
	});

	$(window).on("scroll",function(){
		var $scroll = $(window).scrollTop();

		posUpdate();


		if($scroll > $scdep_tab_hlist_parent_pos+$submap_zone_height){
			if($(window).width() > 1023){
				$scdep_tab_hlist_z.css({top : $submap_zone_height})
			}
			$scdep_tab_hlist_z.addClass("fixed");
		}else{
			$scdep_tab_hlist_z.css({top : 0})
			$scdep_tab_hlist_z.removeClass("fixed");
		}
		
	});
	$scdep_tab.on("click",function(e){
		e.preventDefault();
		var $this = $(this),
			$t_p = $this.parent("li"),
			$t_t = $($this.attr("href")),
			$t_t_pos = $t_t.offset().top || 0;
		
		$t_p.siblings("li").removeClass("active");
		$t_p.addClass("active");


		if($t_t.length){
			$("html,body").animate({"scrollTop" : $t_t_pos - $scdep_tab_hlist_height - height_respon_data},function(){
				// focusGlobalItem
				$t_t.find(focusGlobalItem).first().focus();
			});
			
		}
	});

	function posUpdate(){

		$scdep_tab_hlist_parent.css({"min-height" : ""});
		$scdep_tab_hlist_parent.css({"min-height" : $scdep_tab_hlist_parent.children().outerHeight()});

		$submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
		height_respon_data = $(window).width()>1100 ? $submap_zone_height : 0;
		$scdep_tab_hlist_parent_pos = $scdep_tab_hlist_parent.offset().top || 0;
		$scdep_tab_hlist_height = $scdep_tab_hlist.length ? $scdep_tab_hlist.outerHeight() : 0;

		// console.log($submap_zone_height , $scdep_tab_hlist_parent_pos);
		// console.log($scdep_tab_hlist_z.hasClass("fixed"))
	}
}

function totalsearchFunc(){
	var $d_totalsearch_ui = $(".d_totalsearch_ui");
	var $sctab_hlist_z = $d_totalsearch_ui.find(".sctab_hlist_z");
	var $sctab_hlist_z_pos = $sctab_hlist_z.offset().top || 0;
	var $sctab_hlist_w = $d_totalsearch_ui.find(".sctab_hlist_w");
	var $sctab_hlist_w_height = $sctab_hlist_w.length ? $sctab_hlist_w.outerHeight() : 0;
	var $sctab = $d_totalsearch_ui.find(".sctab");
	var $submap_zone_fixed = $(".submap_zone");
	var $submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
	var height_respon_data = $(window).width()>1023 ? $submap_zone_height : 0;
	posUpdate();

	$(window).on("resize",function(){
		posUpdate();
	});

	$(window).on("scroll",function(){
		var $scroll = $(window).scrollTop();
		posUpdate();
		if($scroll > $sctab_hlist_z_pos-$submap_zone_height){
			if($(window).width() > 1023){
				$sctab_hlist_w.css({top : $submap_zone_height})
			}
			$sctab_hlist_w.addClass("fixed");
		}else{
			$sctab_hlist_w.css({top : 0})
			$sctab_hlist_w.removeClass("fixed");
		}
	});
	$sctab.on("click",function(e){
		e.preventDefault();
		var $this = $(this),
			$t_p = $this.parent("li"),
			$t_t = $($this.attr("href")),
			$t_t_pos = 0;
			
		$t_p.siblings("li").removeClass("active");
		$t_p.addClass("active");
		
		if($this.hasClass("d_top")){
			$("html,body").animate({"scrollTop" : 0});
		}else{
			if($t_t.length){
				$t_t_pos = $t_t.offset().top || 0;
				$("html,body").animate({"scrollTop" : $t_t_pos - $sctab_hlist_w_height - height_respon_data - 20},function(){
					// focusGlobalItem
					$t_t.find(focusGlobalItem).first().focus();
				});
			}
		}
	});

	function posUpdate(){
		$sctab_hlist_z.css({"min-height" : ""});
		$sctab_hlist_z.css({"min-height" : $sctab_hlist_z.children().outerHeight()});

		$sctab_hlist_w_height = $sctab_hlist_w.length ? $sctab_hlist_w.outerHeight() : 0;
		$sctab_hlist_z_pos = $sctab_hlist_z.offset().top || 0;
		$submap_zone_height = $submap_zone_fixed.length ? $submap_zone_fixed.outerHeight() : 0;
		height_respon_data = $(window).width()>1100 ? $submap_zone_height : 0;

		if($(window).width() > 1023){
			$sctab_hlist_w.css({top : $submap_zone_height})
		}else{
			$sctab_hlist_w.css({top : ""})
		}
	}
}
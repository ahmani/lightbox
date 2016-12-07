var jq1 = {
	modules : {}
};

jq1.modules.text = (function()
{
	var items, scroller = $('#scroller');
  
    scroller.css('width', $(window).width());

	return{
		showModal : function()
		{
			$('.lightbox  #content').width($(window).width())
			$('.lightbox  #content').height($(window).height())
			var data = $(this).data('img');
			$(this).parent().addClass("current")
			$('.lightbox').show();
			$('#content').append('<img src=' + data + '/>')	
			$('#textImg').text($(this).next('.text').text())
			$('.shownComments').append($(this).next().next())
			$('.before').hide();
		},
		closeModal : function ()
		{
			$('.lightbox').hide();
			$('.current').removeClass("current")
			$('#content img').remove();	
		},
		nextImg : function ()
		{
			
			var nextdiv = $('.current').next();
			$('.before').show();
			if(nextdiv.hasClass('vignette') == true)
			{
				$('#content img').remove();
				$('.shownComments div').remove()
				var nextdata = nextdiv.children('img').data('img');
				$('.current').removeClass('current')
				nextdiv.addClass('current')
				$('.shownComments').append($('.current .scrollerComments'))
				$('#textImg').text($('.current .text').text())
				$('#content').append('<img src=' + nextdata + '/>')
				if($('.current').next().hasClass('vignette') == false)
					$('.next').hide();
			}
		},
		prevImg : function ()
		{
			
			var prevdiv = $('.current').prev();
			if(prevdiv.hasClass('vignette') == true)
			{
				$('#content img').remove();
				$('.shownComments div').remove()
				var prevdata = $('.current').prev().children('img').data('img');
				$('.current').removeClass('current')
				prevdiv.addClass('current')
				$('.shownComments').append($('.current .scrollerComments'))
				$('#content').append('<img src=' + prevdata + '/>')
				if($('.current').prev().hasClass('vignette') == false)
					$('.before').hide();
			}
		},
		slidecomments : function ()
		{
			$('.comments').slideToggle();
		},
		scroll : function(){
	        items = scroller.children();
	        var scrollWidth = items.eq(0).outerWidth();
	        scroller.animate({'left' : 0 - scrollWidth}, scrollWidth * 100 / 5, 'linear', jq1.modules.text.changeFirst);
    	},
    	changeFirst : function(){
	        scroller.append(items.eq(0).remove()).css('left', 0);
	        jq1.modules.text.scroll();
    	},
		init : function()
		{
			$('div.vignette img').click(jq1.modules.text.showModal)
			$('.close').click(jq1.modules.text.closeModal)
			$('.next').click(jq1.modules.text.nextImg)
			$('.before').click(jq1.modules.text.prevImg)
			$('.addComment').click(jq1.modules.text.slidecomments)

			}
		
	}
})();
$(document).keypress(function(e) {
	 if (e.keyCode == 39)
	  {
	  	jq1.modules.text.nextImg()
	  }
	  if (e.keyCode == 37)
	  {
	  	jq1.modules.text.prevImg()
	  }
});

$(document).ready(function() {
	jq1.modules.text.init();  
    jq1.modules.text.scroll();
    
    
});

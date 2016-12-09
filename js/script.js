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
			//Mettre à la lightBox la même hauteur et largeur de la Fenêtre
			$('.lightbox  #content').width($(window).width())
			$('.lightbox  #content').height($(window).height())
			//Récupérer data-img
			var data = $(this).data('img');
			//Ajouter la classe current à la div parente (vignette)
			$(this).parent().addClass("current")
			//Afficher la lightbox
			$('.lightbox').show();
			//Attacher au content de la box l'image
			$('#content').append('<img src=' + data + '/>')
			//Rajouter le titre
			$('#textImg').text($(this).next('.text').text())
			//Afficher les commentaires (les commentaires sont enregistré statiquement dans le html)
			$('.shownComments').append($(this).next().next())
			//Emballer la liste des commentaires par la balise marquee, qui est une balise HTML5 qui permet de faire défiler un texte
			$('.shownComments ul').wrap('<marquee behavior="scroll" scrollamount="4" direction="left" width="70%"></marquee>')
			//Cacher le bouton précedement qu'on est au début de la lightbox
			$('.before').hide();
		},
		closeModal : function ()
		{
			//Fermer la lightBox
			$('.lightbox').hide();
			$('.current').removeClass("current")
			$('#content img').remove();	
		},
		nextImg : function ()
		{
			//Récupérer la vignette suivante de celle qui contient la classe current
			var nextdiv = $('.current').next();
			//Afficher le bouton précedent qu'on avait cacher dans la fonction showmodal()
			$('.before').show();
			//Test si la vignette n'est pas la derniére
			if(nextdiv.hasClass('vignette') == true)
			{
				//Vider le contenu de la div content
				$('#content img').remove();
				//Vider le contenu de la div qui contient les commentaires
				$('.shownComments div').remove()
				//Récupérer la data-img de l'image suivante
				var nextdata = nextdiv.children('img').data('img');
				//Déplacer la classe current de la div courante à la div suivante
				$('.current').removeClass('current')
				nextdiv.addClass('current')
				//Rajouter les commentaires, le titre et l'image
				$('.shownComments').append($('.current .scrollerComments'))
				$('.shownComments ul').wrap('<marquee behavior="scroll" scrollamount="4" direction="left" width="70%"></marquee>')
				$('#textImg').text($('.current .text').text())
				$('#content').append('<img src=' + nextdata + '/>')
				if($('.current').next().hasClass('vignette') == false)
					$('.next').hide();
			}
		},
		prevImg : function ()
		{
			
			var prevdiv = $('.current').prev();
			$('.before').show();
			if(prevdiv.hasClass('vignette') == true)
			{
				$('#content img').remove();
				$('.shownComments div').remove()
				var prevdata = prevdiv.children('img').data('img');
				$('.current').removeClass('current')
				prevdiv.addClass('current')
				$('.shownComments ul').wrap('<marquee behavior="scroll" scrollamount="4" direction="left" width="70%"></marquee>')
				$('#textImg').text($('.current .text').text())
				$('#content').append('<img src=' + prevdata + '/>')
				if($('.current').prev().hasClass('vignette') == false)
					$('.before').hide();
			}
		},
		slidecomments : function ()
		{
			//Afficher ou chacher le formulaire de création de commentaire 
			$('.comments').slideToggle();
		},		
		fullscreen : function()
		{
					var elem = document.getElementById("content");
			        req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
			        req.call(elem);
		},
		init : function()
		{
			$('div.vignette img').click(jq1.modules.text.showModal)
			$('.close').click(jq1.modules.text.closeModal)
			$('.next').click(jq1.modules.text.nextImg)
			$('.before').click(jq1.modules.text.prevImg)
			$('.addComment').click(jq1.modules.text.slidecomments)
			$('.full').click(jq1.modules.text.fullscreen)
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
    
});

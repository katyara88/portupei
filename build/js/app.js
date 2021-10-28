$(document).ready(function() {

	function smoothScroll() {
		new SmoothScroll('a[href*="#"]', {
			speed: 1500,
			after: function() {
				$('body').css('overflow', '');
			},
			offset: 50,
		});
	}
	smoothScroll();

	function toggleCatalog() {
		let button = $('.catalog__button');
		let container = $('.catalog__info');
		for ( let i = 0; i < Array.from(button).length; i++ ) {
			$(button[i]).on('click', function() {
				button.removeClass('active');
				$(this).addClass('active');
				TweenMax.to(container, .3, {opacity: 0, onComplete: () => {
					TweenMax.to(container, 0, {display: 'none'});
					TweenMax.to($(container[i]).attr('data-id', $(this).attr('data-id')), 0, {display: 'block', onComplete: () => {
						TweenMax.to($(container[i]).attr('data-id', $(this).attr('data-id')), .3, {opacity: 1});
					}});
				}});
			});
		}
	}
	toggleCatalog();

	function orderCatalog() {
		let popup = $('.popup-order'); 
		let close = $('.popup-order__close');
		let button = $('.catalog-item__order');

		button.on('click', function() { 
			popup.addClass('popup-order-active');
			close.addClass('popup-order__close-active');
		})
		close.on('click', function() { 
			popup.removeClass('popup-order-active'); 
			close.removeClass('popup-order__close-active');
		})
	}
	orderCatalog();

	function hideByClickEscButton() {
		let popupOrder = $('.popup-order');
		$(window).on('keydown', function(e) {
			if ( e.keyCode == 27 ) {
				popupOrder.removeClass('popup-order-active'); 
			}
		});
	}
	hideByClickEscButton();
});

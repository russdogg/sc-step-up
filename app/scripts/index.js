const $ = require( "jquery" );
const slick = require( "slick-carousel" );
const SocialHandler = require( "./components/social" );
const SchemsData = require( "../../data.json" );
const GlobalData = SchemsData.global;
const ShareData = SchemsData.share;
const social = new SocialHandler();
const $mq__tablet = 640;
const $mq__desktop = 1024;
const $socialFeed__initialVisible = 4;
let $spotlightSliderContent;
let $spotlightSliderNav;
require( "../styles/index.scss" );
require( "slick-carousel/slick/slick.scss" );
(function() {
	window.addEventListener( "DOMContentLoaded", function() {
		//console.log( "===== DOMCONTENTLOADED =====" );
		//console.log( "===== /DOMCONTENTLOADED =====" );
	}, false );
	window.addEventListener( "load", function() {
		//console.log( "===== LOAD =====" );
		initShare();
		initNavShare();
		initHeroSlider();
		initSpotlightSlider();
		initSocialFeed();
		//console.log( "===== /LOAD =====" );
	}, false );
	//console.log( "===== /CLOSURE =====" );
})();

function initShare() {
	let facebookShares = document.querySelectorAll( ".share__facebook" );
	let twitterShares = document.querySelectorAll( ".share__twitter" );
	let pinterestShares = document.querySelectorAll( ".share__pinterest" );
	let emailShares = document.querySelectorAll( ".share__email" );
	for( let fIndex = 0, fLength = facebookShares.length; fIndex < fLength; fIndex++ ) {
		let facebookShare = facebookShares[fIndex];
		facebookShare.addEventListener( "click", function( event ) {
			event.preventDefault();
			social.share( "facebook", {
				"title": GlobalData && GlobalData.pageTitle ? GlobalData.pageTitle : "Missing Content",
				"copy": ShareData && ShareData.facebook && ShareData.facebook.copy ? ShareData.facebook.copy : "Missing Content",
				"img": ShareData && ShareData.facebook && ShareData.facebook.image && ShareData.facebook.image.src ? ShareData.facebook.image.src : "https://placehold.it/160x160",
				"url": ShareData && ShareData.facebook && ShareData.facebook.url ? ShareData.facebook.url : "http://stepupyourstyle.s3.amazonaws.com/index.html"
			});
		}, false );
	}
	for( let tIndex = 0, tLength = twitterShares.length; tIndex < tLength; tIndex++ ) {
		let twitterShare = twitterShares[tIndex];
		twitterShare.addEventListener( "click", function( event ) {
			event.preventDefault();
			social.share( "twitter", {
				"copy": ShareData && ShareData.twitter && ShareData.twitter.copy ? ShareData.twitter.copy : "Missing Content",
				"url": ShareData && ShareData.twitter && ShareData.twitter.url ? ShareData.twitter.url : "http://stepupyourstyle.s3.amazonaws.com/index.html"
			});
		}, false );
	}
	for( let pIndex = 0, pLength = pinterestShares.length; pIndex < pLength; pIndex++ ) {
		let pinterestShare = pinterestShares[pIndex];
		pinterestShare.addEventListener( "click", function( event ) {
			event.preventDefault();
			social.share( "pinterest", {
				"copy": ShareData && ShareData.pinterest && ShareData.pinterest.copy ? ShareData.pinterest.copy : "Missing Content",
				"img": ShareData && ShareData.pinterest && ShareData.pinterest.image && ShareData.pinterest.image.src ? ShareData.pinterest.image.src : "https://placehold.it/160x160",
				"url": ShareData && ShareData.pinterest && ShareData.pinterest.url ? ShareData.pinterest.url : "http://stepupyourstyle.s3.amazonaws.com/index.html"
			});
		}, false );
	}
	// for( let eIndex = 0, eLength = emailShares.length; eIndex < eLength; eIndex++ ) {
	// 	let emailShare = emailShares[eIndex];
	// 	emailShare.addEventListener( "click", function( event ) {
	// 		event.preventDefault();
	// 		social.share( "email", {
	// 			"subject": ShareData && ShareData.email && ShareData.email.subject ? ShareData.email.subject : "Missing Content",
	// 			"message": ShareData && ShareData.email && ShareData.email.message ? ShareData.email.message : "Missing Content",
	// 			"url": ShareData && ShareData.email && ShareData.email.url ? ShareData.email.url : "Missing Content"
	// 		});
	// 	}, false );
	// }
};

function initNavShare() {
	let navShare = document.getElementById( "nav__share" );
	let toggleShare = document.querySelectorAll( ".toggle-share" );
	let $navShare = $( navShare );
	for( let index = 0, length = toggleShare.length; index < length; index++ ) {
		let toggle = toggleShare[index];
		toggle.addEventListener( "click", function( event ) {
			let target = this;
			let $target = $( target );
			event.preventDefault();
			if( !$target.hasClass( "active" ) ) {
				$target.addClass( "active" );
			}
			else {
				$target.removeClass( "active" );
			}
			if( !$navShare.hasClass( "active" ) ) {
				$navShare.addClass( "active" );
			}
			else {
				$navShare.removeClass( "active" );
			}
		}, false );
	}
};

function initHeroSlider() {
	let heroSlider = document.getElementById( "hero-slider" );
	let heroSliderPrev = heroSlider.querySelectorAll( ".prev" )[0];
	let heroSliderNext = heroSlider.querySelectorAll( ".next" )[0];
	let header = document.getElementById( "header" );
	let spotlight = document.getElementById( "spotlight" );
	let $heroSlider = $( heroSlider );
	let $header = $( header );
	let $spotlight = $( spotlight );
	let $htmlBody = $( "html, body" );
	$heroSlider.on( "init", function( event, slick ) {
		//console.log( "init hero slider" );
		let heroSlides = slick.$slides;
		for( let index = 0, length = heroSlides.length; index < length; index++ ) {
			let heroSlide = heroSlides[index];
			let heroSlideCTA = heroSlide.querySelectorAll( ".button" )[0];
			
			/* Old functionality where clicking green CTA buttons would advance the carousel */
			/*
			heroSlideCTA.addEventListener( "click", index !== length - 1 ? function( event ) {
				event.preventDefault();
				if( isTablet() ) {
					if( !heroSlider.isTimedout ) {
						heroSlider.isTimedout = true;
						heroSlider.timeout = setTimeout(function() {
							$heroSlider.slick( "slickNext" );
						}, 300 );
						$heroSlider.removeClass( "active" );
					}
				}
				else {
					$heroSlider.slick( "slickNext" );
				}
			} : function( event ) {
				event.preventDefault();
				//console.log( $spotlight.offset().top );
				$htmlBody.animate({
					scrollTop: `${ $spotlight.offset().top - $header.height() }px`
				});
			}, false );
			*/
			/*
			NEW FUNCTIONALITY:
			Clicking the green call to action buttons on the Hero sliders will now 
			advance the lower spotlight product carousel to a specific product & 
			scroll the page down
			*/
			heroSlideCTA.addEventListener( "click", function( event ) {
				//console.log('Clicked: ', this.getAttribute('data-slideid'));			
				event.preventDefault();
				let slideID = this.getAttribute('data-slideid');
				// Advance nav spotlight carousel to chosen slide?
				$spotlightSliderNav.slick('slickGoTo', slideID);
				// Advance main spotlight carousel to chosen slide
				$spotlightSliderContent.slick('slickGoTo', slideID);
				$htmlBody.animate({
					scrollTop: `${ $spotlight.offset().top - $header.height() }px`
				});
			}, false );

		}
		heroSliderPrev.addEventListener( "click", function( event ) {
			if( isTablet() ) {
				if( !heroSlider.isTimedout ) {
					heroSlider.isTimedout = true;
					heroSlider.timeout = setTimeout(function() {
						$heroSlider.slick( "slickPrev" );
					}, 300 );
					$heroSlider.removeClass( "active" );
				}
			}
			else {
				$heroSlider.slick( "slickPrev" );
			}
		}, false );
		heroSliderNext.addEventListener( "click", function( event ) {
			let target = this;
			if( isTablet() ) {
				if( !heroSlider.isTimedout ) {
					heroSlider.isTimedout = true;
					heroSlider.timeout = setTimeout(function() {
						$heroSlider.slick( "slickNext" );
					}, 300 );
					$heroSlider.removeClass( "active" );
				}
			}
			else {
				$heroSlider.slick( "slickNext" );
			}
		}, false );
	}).slick({
		// appendArrows: $heroSliderControls,
		// appendDots: $sliderControls,
		arrows: false,
		// dots: true,
		draggable: false,
		infinite: true,
		// prevArrow: heroSliderPrev,
		// nextArrow: heroSliderNext,
		responsive: [
			{
				breakpoint: $mq__tablet,
				settings: {
					draggable: true,
					swipe: true
				}
			}
		],
		rows: 0,
		// rtl: false,
		slide: ".slide",
		slidesToShow: 1,
		// speed: 0,
		swipe: false
	}).on( "afterChange", function( event, slick, currentSlide ) {
		$heroSlider.addClass( "active" );
		clearTimeout( heroSlider.timeout );
		heroSlider.isTimedout = false;
		console.log('currentSlide: ', "slide"+currentSlide);
		document.body.id = "slide"+currentSlide;
	});
};

function initSpotlightSlider() {
	let spotlightSlider = document.getElementById( "spotlight-slider" );
	let spotlightSliderNav = spotlightSlider.querySelectorAll( ".nav" )[0];
	let spotlightSliderContentWrapper = spotlightSlider.querySelectorAll( ".content-wrapper" )[0];
	let spotlightSliderContent = spotlightSliderContentWrapper.querySelectorAll( ".content" )[0];
	let spotlightSliderControls = spotlightSlider.querySelectorAll( ".controls" )[0];
	let spotlightSliderPrev = spotlightSliderControls.querySelectorAll( ".prev" )[0];
	let spotlightSliderNext = spotlightSliderControls.querySelectorAll( ".next" )[0];
	let spotlightSliderIndex = spotlightSliderControls.querySelectorAll( ".index" )[0];
	let spotlightSliderIndexCurrent = spotlightSliderIndex.querySelectorAll( ".current" )[0];
	let spotlightSliderIndexCount = spotlightSliderIndex.querySelectorAll( ".count" )[0];
	$spotlightSliderNav = $( spotlightSliderNav );
	let $spotlightSliderContentWrapper = $( spotlightSliderContentWrapper );
	$spotlightSliderContent = $( spotlightSliderContent );
	$spotlightSliderContent.on( "init", function( event, slick ) {
		let slideCount = slick.slideCount;
		//console.log( "init spotlight slider content" );
		$spotlightSliderNav.on( "init", function( event, slick ) {
			//console.log( "init spotlight slider nav" );
			spotlightSliderIndexCount.innerHTML = slideCount;
		}).slick({
			centerMode: true,
			centerPadding: "0px",
			draggable: true,
			focusOnSelect: true,
			infinite: true,
			prevArrow: spotlightSliderPrev,
			nextArrow: spotlightSliderNext,
			responsive: [
				{
					breakpoint: $mq__desktop,
					settings: {
						centerPadding: "12.5%",
						draggable: true,
						slidesToShow: 3,
						swipe: true
					}
				},
				{
					breakpoint: $mq__tablet,
					settings: {
						centerPadding: "25%",
						draggable: true,
						slidesToShow: 1,
						swipe: true
					}
				}
			],
			rows: 0,
			slide: ".slide",
			slidesToShow: 5,
			swipe: true
		}).on( "beforeChange", function( event, slick, currentSlide, nextSlide ) {
			if( currentSlide !== nextSlide ) {
				$spotlightSliderContentWrapper.removeClass( "active" );
			}
		}).on( "afterChange", function( event, slick, currentSlide ) {
			$spotlightSliderContent.slick( "slickGoTo", $spotlightSliderNav.slick( "slickCurrentSlide" ) );
			$spotlightSliderContentWrapper.addClass( "active" );
		});
	}).slick({
		arrows: false,
		draggable: false,
		infinite: true,
		rows: 0,
		slide: ".slide",
		slidesToShow: 1,
		speed: 0,
		swipe: false
	}).on( "afterChange", function( event, slick, currentSlide ) {
		let currentIndex = slick.currentSlide;
		spotlightSliderIndexCurrent.innerHTML = currentIndex + 1;
	});
};

function initSocialFeed() {
	let socialFeed = document.getElementById( "social-feed" );
	let socialFeedCardWrappers = socialFeed.querySelectorAll( ".card-wrapper" );
	let socialFeedLoader = socialFeed.querySelectorAll( ".loader" )[0];
	let socialFeedLoaderButton = socialFeedLoader.querySelectorAll( "a" )[0];
	let socialFeedCardWrappersLength = socialFeedCardWrappers.length;
	let socialFeedCardWrappersMaxLength = getSocialFeedMaxLength( socialFeedCardWrappersLength );
	let $socialFeedLoader = $( socialFeedLoader );
	//console.log( "%s % %s: %s", socialFeedCardWrappersLength, $socialFeed__initialVisible, socialFeedCardWrappersLength % $socialFeed__initialVisible );
	//console.log( "length: %s", socialFeedCardWrappersLength );
	//console.log( "max length: %s", socialFeedCardWrappersMaxLength );
	socialFeed.visible = $socialFeed__initialVisible;
	if( socialFeedCardWrappersLength > $socialFeed__initialVisible ) {
		$socialFeedLoader.removeClass( "hidden" );
		socialFeedLoaderButton.addEventListener( "click", function( event ) {
			event.preventDefault();
			if( socialFeed.visible < socialFeedCardWrappersMaxLength ) {
				//console.log( "visible less than length" );
				for( let index = socialFeed.visible, target = socialFeed.visible + 4; index < target; index++ ) {
					let socialFeedCardWrapper = socialFeedCardWrappers[index];
					let $socialFeedCardWrapper = $( socialFeedCardWrapper );
					$socialFeedCardWrapper.removeClass( "hidden" );
				}
				socialFeed.visible += $socialFeed__initialVisible;
				if( socialFeed.visible >= socialFeedCardWrappersMaxLength ) {
					$socialFeedLoader.addClass( "hidden" );
				}
			}
		}, false );
	}
};

function getSocialFeedMaxLength( length ) {
	let mod = length % $socialFeed__initialVisible;
	return mod ? (length - mod + $socialFeed__initialVisible) : length;
};

function isTablet() {
	return window.innerWidth >= $mq__tablet;
};


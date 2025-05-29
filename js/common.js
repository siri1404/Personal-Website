jQuery(function ($) {

	// Portfolio Namespace
	window.PoojaKanala = {};

	// Utility: Detect Mobile
	window.PoojaKanala.isMobile = function () {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() <= 1024) {
			$('body').addClass("disable-cursor");
			return true;
		}
		return false;
	};

	// Scroll Effects
	window.PoojaKanala.ScrollEffects = function () {
		// Example: Add a class if a slider exists
		const sliderSelectors = ['.showcase-gallery', '.showcase-lists'];
		let hasSlider = sliderSelectors.some(sel => $(sel).length > 0);
		$('body').toggleClass('has-slider', hasSlider);

		// Example: Animate hero section on load
		setTimeout(() => {
			const app = document.getElementById("app");
			if (app) {
				app.classList.add("active");
				$("body").append(app);
			}
		}, 1500);

		// Example: Smooth scroll for anchor links
		$("a[href*='#']").on('click', function (e) {
			if (this.hash) {
				e.preventDefault();
				const target = document.getElementById(this.hash.substring(1));
				if (target) {
					target.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}
		});

		// Example: Back to top
		$('#backtotop').on('click', function () {
			$("html,body").animate({ scrollTop: 0 }, 800);
		});

		// Add more scroll/animation logic as needed...
	};

	// First Load
	window.PoojaKanala.FirstLoad = function () {
		// Example: Reload on popstate
		$(window).on('popstate', function () {
			location.reload(true);
		});

		// Example: Set background images for video covers
		$('.video-cover').each(function () {
			var image = $(this).data('src');
			$(this).css({ 'background-image': 'url(' + image + ')' });
		});

		// Example: Loader on ajax link click
		$('a.ajax-link').on('click', function () {
			$("body").addClass("show-loader");
		});

		// Add more first-load logic as needed...
	};

	// Simple Lightbox for images
	window.PoojaKanala.Lightbox = function () {
		$('.image-link').on('click', function (e) {
			e.preventDefault();
			const src = $(this).attr('href');
			if (src) {
				$('body').append(`
					<div class="pk-img-popup">
						<div class="pk-img-popup-bg"></div>
						<img src="${src}" class="pk-img-popup-img" />
						<div class="pk-img-popup-close">×</div>
					</div>
				`);
				$('.pk-img-popup-bg, .pk-img-popup-close').on('click', function () {
					$('.pk-img-popup').remove();
				});
			}
		});
	};

	// Simple Sliders (placeholder)
	window.PoojaKanala.Sliders = function () {
		// Implement slider logic if needed
	};

	// Simple Grid (placeholder)
	window.PoojaKanala.JustifiedGrid = function () {
		// Implement grid logic if needed
	};

	// Shortcodes (copy email, buttons, etc.)
	window.PoojaKanala.Shortcodes = function () {
		// Copy email to clipboard
		$('#copy-email').on('click', function () {
			var email = $(this).text();
			if (navigator.clipboard) {
				navigator.clipboard.writeText(email);
			}
		});
	};

	// Mouse Cursor (basic custom cursor)
	window.PoojaKanala.MouseCursor = function () {
		if (!window.PoojaKanala.isMobile()) {
			// Custom cursor logic can go here
		}
	};

	// Core logic (page transitions, etc.)
	window.PoojaKanala.Core = function () {
		// Add core logic if needed
	};

	// Export functions for easy access
	window.PoojaKanalaExports = {
		ScrollEffects: window.PoojaKanala.ScrollEffects,
		FirstLoad: window.PoojaKanala.FirstLoad,
		FitThumbScreenWEBGL: function () {}, // Placeholder
		Shortcodes: window.PoojaKanala.Shortcodes,
		Sliders: window.PoojaKanala.Sliders,
		JustifiedGrid: window.PoojaKanala.JustifiedGrid,
		Lightbox: window.PoojaKanala.Lightbox,
		PlayVideo: function () {}, // Placeholder
		isMobile: window.PoojaKanala.isMobile,
		Core: window.PoojaKanala.Core,
		MouseCursor: window.PoojaKanala.MouseCursor
	};

	// Simple variable assignments for use in other scripts
	const {
		ScrollEffects,
		FitThumbScreenWEBGL,
		Shortcodes,
		Sliders,
		JustifiedGrid,
		Lightbox,
		PlayVideo,
		isMobile,
		Core,
		MouseCursor
		} = window.PoojaKanalaExports;
	});
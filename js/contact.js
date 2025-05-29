// Contact Form Handler for Pooja Kanala Portfolio
function setupContactForm() {
	const $form = $('#contact-form');
	if ($form.length === 0) return;

	$form.on('submit', function (e) {
		e.preventDefault();
		const actionUrl = $form.attr('action');
		$('#form-message').slideUp(750, function () {
			$('#form-message').hide();
			$('#submit-btn').attr('disabled', true);
			$.post(actionUrl, {
				name: $('#input-name').val(),
				email: $('#input-email').val(),
				message: $('#input-message').val(),
				verify: $('#input-verify').val()
			}, function (response) {
				$('#form-message').html(response).slideDown('slow');
				$('#contact-form img.loader').fadeOut('slow', function () { $(this).remove(); });
				$('#submit-btn').removeAttr('disabled');
				if (response.includes('success')) $form.slideUp('slow');
			});
		});
	});
}

// Google Map for Pooja Kanala Portfolio
function setupContactMap() {
	const $map = $('#map-canvas');
	if ($map.length === 0) return;

	const poojaLocation = { lat: 43.270441, lng: 6.640888 };
	const map = new google.maps.Map($map[0], {
		zoom: 15,
		center: poojaLocation,
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: true
	});

	const grayscaleStyle = [ /* ...styles as before... */ ];
	map.setOptions({ styles: grayscaleStyle });

	const infoContent = `
		<div style="text-align:center; padding:10px;">
			<h4 style="color:#000; font-weight:600; margin-bottom:0;">Pooja Kanala</h4>
			<div>
				<p style="color:#999; font-size:14px; margin-bottom:10px;">
					Welcome! Let's connect over coffee.
				</p>
			</div>
		</div>
	`;
	const infoWindow = new google.maps.InfoWindow({ content: infoContent });

	const marker = new google.maps.Marker({
		position: poojaLocation,
		map: map,
		icon: 'images/marker.png',
		title: "Pooja Kanala's Office"
	});

	marker.addListener('click', function () {
		infoWindow.open(map, marker);
	});

	google.maps.event.addDomListener(window, "resize", function () {
		const center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});
}

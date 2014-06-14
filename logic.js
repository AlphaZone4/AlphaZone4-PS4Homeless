jQuery( document ).ready(function($) {
	$("#PSNForm").submit(function() {
		$('#popup').modal();

		var PSN = $("#PSN").val();

		$(".modal-title").text("Loading...");
		$(".modal-body").html("");

		jQuery.get("https://api.alphazone4.com/psn/full/"+PSN, {}, function(data) {
			if (!data.username) {
				$(".modal-title").text("No profile found :(");
				return;
			}

			// super-smart secret spi wardrobe scanner
			var progbar = '<div class="progress progress-striped active"><div class="progress-bar"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"><span class="sr-only">45% Complete</span></div></div>';

			$(".modal-title").text("Hello, " + data.username + "!");
			$(".modal-body").html("<img src='https:"+data.home_avatar+"' /><p>Thanks for doing your bit to help others!</p><strong>Scanning Wardrobe...</strong>" + progbar);

			var progress = 0;

			var step = function() {
				progress += 8;

				$(".progress-bar").css("width", progress+"%");

				if (progress >= 100) {
					// ok, the wardrobe scanning is done
					$(".modal-body").html("<img src='https:"+data.home_avatar+"' /><strong>Woah!</strong><p>Sorry, you have too many items in your wardrobe. Would you like us to help you clear your wardrobe?</p><p><button type='button' class='btn btn-warning btn-lg yesno'>Yes</button><button type='button' class='btn btn-warning btn-lg yesno'>No</button></p>");
					$(".yesno").click(function() {
						$(".modal-body").html("<strong>Deleting all items from wardrobe for user "+data.username+"...</strong>"+progbar);
						progress = 0;
						var step2 = function() {
							// mwuhaha, this one is a bit faster!
							progress += 13;

							$(".progress-bar").css("width", progress+"%");

							if (progress >= 80) {
								$(".modal-body").html("<img src='https:"+data.home_avatar+"' /><div class='alert alert-danger'><strong>Wardrobe Deleted</strong> Remaining items: 0</div><strong>Thank you for donating your PlayStation Home wardrobe!</strong><p>You have helped the life of a suffering PS4 PSHomeless user.</p><small>Happy April 1st 2014!</small>");
							} else {
								setTimeout(step2, 100 + (Math.random() * 500));
							}
						};
						step2();
					});
				} else {
					// this is the magic bit...
					setTimeout(step, 100 + (Math.random() * 500));
				}
			};

			step();
		}, "jsonp");

		return false;
	});
});

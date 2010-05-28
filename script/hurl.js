$(document).ready(function() { hurl.init(); });

var hurl = {
	
	init: function init() {
		
		hurl.call.init();
	},
	
	call: {
	
		init: function init() {
		
			$('#call')
				.bind('change', hurl.call.onChange)
				.trigger('change');
		},
		
		onChange: function onChange() {
			
			var call = $('#call option:selected').val();
			
			if(call == 'GET') {
				$('#params').hide();
			} else {
				$('#params').show();
			}
			
			$('#form').attr('method', call);
		}
	}
}
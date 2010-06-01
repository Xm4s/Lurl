/*
 * Hurl Local Script
 * 
 * Version 1.0
 * Last Revision: 2010 05 30
 * 
 * by Marco 'Xmas' Colombo <marco.natale.colombo AT gmail DOT com>
 * Copyright (C) 2010 Marco Natale Colombo. All Rights Reserved.
 *
 */

$(document).ready(function() { hurl.init(); });

var hurl = {
	
	counter: 0,
	
	init: function init() {
		
		hurl.method.init();
		hurl.params.init();
		hurl.send.init();
	},
	
	method: {
	
		init: function method() {
		
			$('#method')
				.bind('change', hurl.method.onChange)
				.trigger('change');
		},
		
		onChange: function onChange() {
			
			var method = $('#method option:selected').val();
			
			if(method == 'POST') {
				$('#params').show();
			} else {
				$('#params').hide();
			}
			
			$('#form').attr('method', method);
		}
	},
	
	params: {
		
		init: function init() {
			
			$('#add').bind('click', hurl.params.onClickAdd);
		},
		
		onClickAdd: function onClickAdd() {
			
			var param = [];
			
			param.push('<div class="param">');
			param.push('<label for="name_' + hurl.counter + '">Name:</label>');
			param.push('<input id="name_' + hurl.counter + '" class="name" type="text" />');
			param.push('<label for="value_' + hurl.counter + '">Value:</label>');
			param.push('<input id="value_' + hurl.counter + '"class="value" type="text" />');
			param.push('<label class="close">x</label>');
			param.push('</div>');
			
			$('#params').append(param.join(''));
						
			$('div.param:last label.close').bind('click', function(e) {
				
				$target = $(e.target).parent();
				$target.detach();
			});
			
			hurl.counter++;
		}
	},
	
	send: {
		
		init: function init() {
										
			$('#form').validate({

				rules: {
					address: {
						required: true,
					}
				},

				submitHandler: function() {
					hurl.send.ajaxSubmit();
				}
			});
		},
		
		ajaxSubmit: function ajaxSubmit() {
			
			console.log('address: ' + $('#address').val());
			console.log('method: ' + $('#method').val());
			
			var data = [];
			data['hurlAddressField'] = $('#address').val();			
			$('div.param').each(function() {					
				data[$(this).children('input.name').val()] = $(this).children('input.value').val();
			});
			
			$.ajax({
				url: 'gateway.php',
				type: $('#method').val(),
				data: data,
				cache: false,
				dataType: 'text',
				success: function() {}			
			});			
		}
	}
}
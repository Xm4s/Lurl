/*
 * Lurl Local Script
 * 
 * by Marco 'Xmas' Colombo <marco.natale.colombo AT gmail DOT com>
 * Copyright (C) 2010 Marco Natale Colombo. All Rights Reserved.
 *
 */

$(document).ready(function() { lurl.init(); });

var lurl = {
	
	counter: 0,
	
	init: function init() {
		
		lurl.method.init();
		lurl.params.init();
		lurl.send.init();
		
		try { console.log('Welcome to Lurl!'); }
		catch(err) { }
	},
	
	method: {
	
		init: function method() {
			$('#method')
				.bind('change', lurl.method.onChange)
				.trigger('change');
		},
		
		onChange: function onChange() {
			
			var method = $('#method option:selected').val();
			
			if(method == 'POST' || method == 'PUT') {
				$('#params').show();
			} else {
				$('#params').hide();
			}
			
			$('#form').attr('method', method);
		}
	},
	
	params: {
		
		init: function init() {
			$('#add').bind('click', lurl.params.onClickAdd);
		},
		
		onClickAdd: function onClickAdd() {
			
			var param = [];
			
			param.push('<div class="param">');
			param.push('<label for="name_' + lurl.counter + '">Name:</label>');
			param.push('<input id="name_' + lurl.counter + '" class="name" type="text" />');
			param.push('<label for="value_' + lurl.counter + '">Value:</label>');
			param.push('<input id="value_' + lurl.counter + '"class="value" type="text" />');
			param.push('<label class="close">x</label>');
			param.push('</div>');
			
			$('#params').append(param.join(''));
						
			$('div.param:last label.close').bind('click', function(e) {
				$target = $(e.target).parent();
				$target.detach();
			});
			
			lurl.counter++;
		}
	},
	
	send: {
		
		init: function init() {
										
			$('#form').validate({
				rules: {
					url: {
						required: true,
					}
				},

				submitHandler: function() {
					lurl.send.ajaxSubmit();
				}
			});
		},
		
		ajaxSubmit: function ajaxSubmit() {
			
			$('#send-wrapper').hide();
			$('#loading-wrapper').show();
			$('#response-wrapper').hide();
			
			var requestUrl = '';
			var requestParam = '';
			var requestData = [];
			
			var paramIndex = $('#url').val().indexOf('?');			
			if(paramIndex > 0) {
				requestUrl = $('#url').val().substr(0,paramIndex);
				requestParam = $('#url').val().substr(paramIndex+1,$('#url').val().length);
			} else {
				requestUrl = $('#url').val();
			}
			
			requestData.push('__url=' + requestUrl);
			requestData.push('&__method=' + $('#method').val());
			requestData.push('&' + requestParam);
						
			if($('#method').val() == 'POST' || $('#method').val() == 'PUT') {
				$('div.param').each(function() {
					requestData.push('&' + $(this).children('input.name').val());
					requestData.push('=' + $(this).children('input.value').val());
				});
			}

			requestData = requestData.join('');
												
			$.ajax({
				type: 'GET',
				url: 'gateway.php',
				data: requestData,
				dataType: 'text',
				success: function(data, status, response) {
					$('#content').html(data);
					
					$('#send-wrapper').show();
					$('#loading-wrapper').hide();
					$('#response-wrapper').show();
				}			
			});
		}
	}
}
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
	
	init: function init() {
		
		hurl.method.init();
		hurl.params.init();
	},
	
	method: {
	
		init: function method() {
		
			$('#method')
				.bind('change', hurl.method.onChange)
				.trigger('change');
		},
		
		onChange: function onChange() {
			
			var method = $('#method option:selected').val();
			
			if(method == 'GET') {
				$('#params').hide();
			} else {
				$('#params').show();
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
			param.push('<label>Name:</label>');
			param.push('<input class="name" type="text" />');
			param.push('<label>Value:</label>');
			param.push('<input class="value" type="text" />');
			param.push('<label class="close">x</label>');
			param.push('</div>');
			
			$('#params').append(param.join(''));
						
			$('div.param:last label.close').bind('click', function(e) {
				
				$target = $(e.target).parent();
				$target.detach();
			});
		}
	}
}
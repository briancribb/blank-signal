;var SITE = SITE || (function(){
	var APP = {
		resizeTasks : [],
		init : function() {
			APP.props = {
				$bodyElement		: $('body'),
				$mainFooter			: $('#main-footer'),
				$mainFooterContent	: $('#main-footer-content'),
				size				: '',
				breakpoints			: {
					sm: 576,
					md: 768,
					lg: 992,
					xl: 1200
				},
				transEnd			: (function(){
					// This function gets the browser's name for "transitionend" and saves it to a prop which 
					// may then be used by other functions to detect the end of a CSS3 transition.
					var t;
					var el = document.createElement('fakeelement');
					var transitions = {
						'transition':'transitionend',
						'OTransition':'oTransitionEnd',
						'MozTransition':'transitionend',
						'WebkitTransition':'webkitTransitionEnd'
					}

					for(t in transitions){
						if( el.style[t] !== undefined ){
							return transitions[t];
						}
					}
				})()
			};

			APP.addResizeTask({
				func: function() {

					var footerHeight = APP.props.$mainFooterContent.outerHeight(true);

					APP.props.$mainFooter.height( footerHeight );

					APP.props.$bodyElement.css({
						'padding-bottom'	:footerHeight//,
					});
					APP.props.size = APP.getSiteViewType();
				},
				args:[] // No arguments, so it's an empty array.
			});

			APP.addListeners();
			APP.manageResize();

			// Setup throttling for resize tasks. Run the manageResize function once upon init. This part relies upon having 
			// UnderscoreJS loaded along with jQuery. It runs all resize tasks every quarter-second.
			// http://underscorejs.org/
			var throttled = _.throttle(APP.manageResize, 250);
			//var debounced = _.debounce(APP.manageResize, 250);
			$(window).resize(throttled);
		},
		addListeners : function() {
			// Once the main navigation has finished opening or closing, the CSS3 transition class is removed. This 
			// prevents the transition from happening on a resize, because that looks weird when other things are just 
			// popping into place.
			//APP.props.$mainNav.on( APP.props.transEnd, function() {
			//	console.log('Transition complete!  This is the callback, no library needed!');
			//	APP.props.$mainNav.removeClass('trans-right');
			//});
		},
		getSiteViewType : function() {
			var sizes = APP.props.breakpoints,
				currentSize = APP.props.$bodyElement.outerWidth(true),
				sizeType = "xs";

			if ( currentSize >= sizes.sm ) {
				sizeType = "sm";
			}
			if ( currentSize >= sizes.md ) {
				sizeType = "md";
			}
			if ( currentSize >= sizes.lg ) {
				sizeType = "lg";
			}
			if ( currentSize >= sizes.xl ) {
				sizeType = "xl";
			}
			return sizeType;
		},
		addResizeTask : function(task) {
			/*
			Adds and object with a "func" property and an "args" property. This is VERY important, because we use the apply() method
			in manageResize(). All tasks in the queue will be run during resize. We throttle resizing to keep things from getting too crazy.

			Basic syntax:
			myTask = {func:myFunction, args:[arg1,arg2]}

			Example of adding a task:
			var myTask = { func: function(){console.log("I'm resizing!")} }
			APP.addResizeTask(myTask);

			Or you could be fancy and do this:
			APP.addResizeTask( { func: function(){console.log("I'm resizing!")} } );
			*/

			task.args = task.args || [];
			APP.resizeTasks.push(task);
		},
		manageResize : function() {
			//console.log('manageResize()');
			/* Cycle through resize tasks. */
			for (var i = 0; i < APP.resizeTasks.length; i++) {
				var task = APP.resizeTasks[i];
				task.func.apply(this, task.args);
			}
		}		
	}
	return APP;
})();
$( document ).ready( SITE.init );

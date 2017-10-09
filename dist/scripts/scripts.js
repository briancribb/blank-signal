class DynaButton extends React.Component {
	constructor() {
		//console.log('constructor()');
		super(); // Gotta call this first when doing a constructor.

		var heroes = [
			{
				name:'Major Frosty',
				title:'Immune to Brain Freeze',
				desc:'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.',
				arrFeatures:[
					{
						name: "Ice",
						icon: "",
						tags: [ "influence" ]
					},
					{
						name: "Sliding",
						icon: "",
						tags: [ "travel" ]
					},
					{
						name: "Durability",
						icon: "",
						tags: [ "personal" ]
					}
				]
			},
			{
				name:'Hot Tomale',
				title:'A Fire Engine Guy',
				desc:'Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
				arrFeatures:[
					{
						name: "Fire",
						icon: "",
						tags: [ "influence" ]
					},
					{
						name: "Strength",
						icon: "",
						tags: [ "personal" ]
					},
					{
						name: "Durability",
						icon: "",
						tags: [ "personal" ]
					}
				]
			},
			{
				name:'Think Man',
				title:'Detective to the Stars',
				desc:'The Brainful Bird Dog of University City is destined to solve any and all crimes according to their relationship with the heavens.',
				arrFeatures:[
					{
						name: "Detective",
						icon: "",
						tags: [ "skill" ]
					},
					{
						name: "Astrology",
						icon: "",
						tags: [ "skill", "pseudoscience" ]
					},
					{
						name: "Marketing",
						icon: "",
						tags: [ "skill" ]
					},
					{
						name: "Accounting",
						icon: "",
						tags: [ "skill" ]
					},
					{
						name: "Trivia",
						icon: "",
						tags: [ "skill" ]
					},
					{
						name: "Thinkmobile",
						icon: "",
						tags: [ "travel", "vehicle" ]
					}
				]
			}
		];

		this.state = {
			stuff: 'things'
		}

		//let that = this;
		//window.getState = function() {
		//	return that.state;
		//}
	}

	/*
	Showing a download icon while the assets load, and then a round arrow spinner while the data loads. When the "loading" 
	class is removed, the initial loader container is hidden and the Timeline app container is shown. 
	*/
	componentDidMount() {
		$('body').removeClass('loading');
	}


	render() {
		let markup = null;
		markup = 
			<div id="heroes">
				<div className="card border-danger mb-3">
					<h4 className="card-header bg-danger"><i className="fa fa-superpowers mr-3" aria-hidden="true"></i>Some Hero</h4>
					<div className="card-body">
						<h4 className="card-title">Special title treatment</h4>
						<p className="card-text">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
					<ul className="list-group text-white">
						<li className="list-group-item bg-dark">Cost<div className="pull-right"><span className="badge badge-success">57</span></div></li>
						<li className="list-group-item bg-secondary">Ice<div className="pull-right"><span className="badge badge-primary">5</span></div></li>
						<li className="list-group-item bg-dark">Travel: Sliding<div className="pull-right"><span className="badge badge-primary">5</span></div></li>
						<li className="list-group-item bg-secondary">Durability<div className="pull-right"><span className="badge badge-dark">5</span></div></li>
					</ul>
					</div>
				</div>
				<div className="card border-info mb-3">	
					<h4 className="card-header bg-info"><i className="fa fa-superpowers mr-3" aria-hidden="true"></i>Some Hero</h4>
					<div className="card-body">
						<h4 className="card-title">Special title treatment</h4>
						<p className="card-text">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
					<ul className="list-group text-white">
						<li className="list-group-item bg-dark">Cost<div className="pull-right"><span className="badge badge-success">57</span></div></li>
						<li className="list-group-item bg-secondary">Fire<div className="pull-right"><span className="badge badge-danger">5</span></div></li>
						<li className="list-group-item bg-dark">Strength<div className="pull-right"><span className="badge badge-primary">3</span></div></li>
						<li className="list-group-item bg-secondary">Durability<div className="pull-right"><span className="badge badge-dark">2</span></div></li>
					</ul>
					</div>
				</div>
			</div>
		;
		return(
			markup
		); 
	}
}


ReactDOM.render(
	<DynaButton />, document.getElementById('blank-signal')
);
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

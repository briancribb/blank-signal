class DynaButton extends React.Component {
	constructor() {
		//console.log('constructor()');
		super(); // Gotta call this first when doing a constructor.

		this.state = {
			stuff: 'things'
		}

		// Adding a global function so I can check the state from the browser inspector.
		let that = this;
		window.getState = function() {
			return that.state;
		}
	}

	/*
	Showing a download icon while the assets load, and then a round arrow spinner while the data loads. When the "loading" 
	class is removed, the initial loader container is hidden and the Timeline app container is shown. 
	*/
	componentDidMount() {
		$('html').removeClass('loading');
		this._getData();
	}





	/*
	The app has some basic code that runs when there's no data. Once this stuff comes in, the timeline events will render.
	*/
	_getData() {
		console.log('_getData');
		var that = this,
			dfd_array = [],
			dfd_sources = [
				{ id : 'heroes', path : 'src/json/heroes.json' }
			],
			objData = {
				initialized: false
			};


		$.each( dfd_sources, function( index, value ) {
			var myIndex = index,
				myValue = value;

			var dfd_temp = $.Deferred();
			dfd_array.push(dfd_temp);

			/*
			If I wanted to do something when each individual thingy resolves, then I would do that here. This done() 
			function will fire whenever this deferred object is resolved.
			dfd_temp.done(function() {
				// Do stuff.
				console.log('-- Done with dfd ' + myIndex);
			});
			*/

			$.ajax({
				url: myValue.path,
				dataType: "json"
			}).done(function(data) {

				/* The data structure is straight from Google, so we still need to drill down into it to get our array. */
				//APP.data[key] = data.feed.entry;

				console.log(['++ Inside the done function of dfd ' + myIndex, data]);

				objData[myValue.id] = data;
				/* All done with this JSON file, so we'll resolve its Deferred object. */
				dfd_temp.resolve();
			});
		});


		/* http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when */
		/* 
		Sort the entries by their sortkey, which is basically a date. We're not picky about events with the same sortkey value. 
		Once that's done, we set the 'initialized' property to true for objData. We then pass this object into the app state. The 
		initialized property is used elsewhere to see if the app has data. If that property is true, then we have our sorted 
		entries, sources, etc.
		*/
		$.when.apply(null, dfd_array).done(function() {
			console.log(["All of the ajax calls are complete. Length is ", objData]);

			objData.initialized = true;
			that.setState(objData);
			//that._addListeners();
		});











		that.setState(objData);
	}// End of _getData()






	render() {

		let markup = null;

		if (this.state.initialized) {
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
		} else {
			markup = 
				<div className="text-center">
					<div id="page-load-spinner" className="page-load-spinner display-1 mb-3"><i className="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i></div>
					<h3>Loading Data...</h3>
				</div>
			;
		}
		return(
			markup
		); 


		return(
			markup
		); 
	}
}


ReactDOM.render(
	<DynaButton />, document.getElementById('blank-signal')
);
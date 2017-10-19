class DynaButton extends React.Component {
	constructor() {
		//console.log('constructor()');

		// Terminal commands at work
		// cd /Users/bcribb/Experiments/github
		// gulp default --option blank-signal


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
				{ id : 'heroes', path : 'src/json/heroes.json' },
				{ id : 'organizations', path : 'src/json/orgs.json' }
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


	/*
	Returns an array of JSX React components to be used as timeline entries. Since this function is a top-level 
	method of the Timeline component, it has access to the component state.

	The "key" prop is required by React for iterators. It can be anything, but must be unique for each entry. 
	In this case, we're just counting up.
	*/
 	_getEntries() {
		return this.state.heroes.map((entry, i) => {
			let markup = <HeroEntry obj={entry} key={i} />;
			return(markup);
		});
	}




	render() {

		let markup = null;

		if (this.state.initialized) {
			const entries = this._getEntries();
			markup = 
				<div id="heroes">
					{entries}
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
	}
}

/*
An individual timeline entry.
*/
class HeroEntry extends React.Component {

 	_getFeatures() {
 		let isDark = true;
		return this.props.obj.arrFeatures.map((feature, i) => {
			let shade = (isDark) ? "dark" : "secondary";
			let markup = <li className={"list-group-item bg-"+shade} key={i}>{feature.name}</li>;
			isDark = !isDark;
			return(markup);
		});
	}

	_getFrameColor() {

		var colorType = "warning";

		for (var i = this.props.obj.arrFeatures.length - 1; i >= 0; i--) {
			let tags = this.props.obj.arrFeatures[i].tags;

			if (
				_.find( tags , function(tag){ return tag === "heat"; })
				) {
				colorType = "danger";

			} else if(
				_.find( tags , function(tag){ return tag === "cold"; })
				) {
				colorType = "info";
			}
		}
		return colorType;
	}

	render() {
		let hero = this.props.obj;
		const features = this._getFeatures();
		const frameType = this._getFrameColor();

		return(
			<div className={"card border-" + frameType + " mb-3"}>	
				<h4 className={"card-header bg-" + frameType}><i className="fa {hero.icon} mr-3" aria-hidden="true"></i>{hero.name}</h4>
				<div className="card-body">
					<h4 className="card-title">{hero.title}</h4>
					<p className="card-text">{hero.desc}</p>
				<ul className="list-group text-white">
					{features}
				</ul>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<DynaButton />, document.getElementById('blank-signal')
);
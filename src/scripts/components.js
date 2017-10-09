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
		$('html').removeClass('loading');
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
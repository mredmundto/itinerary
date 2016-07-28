L.mapbox.accessToken = 'pk.eyJ1IjoibW9mdGhlY3Jvc3MiLCJhIjoiY2lyNXBkNnliMDA5Z2c4bTFweWJlN2dyaCJ9.dBygwwib3OjYEypyhSMVDg';
class LandingView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			locations: []
		};
	}


	componentDidMount() {



		var geojson = [
			{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [-77.031952,38.913184]
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [-122.413682,37.775408]
				}
			}
		];

		var map_Geo = L.mapbox.map('map_geo', 'mapbox.light')
		.setView([37.8, -96], 4);

	var myLayer = L.mapbox.featureLayer().setGeoJSON(geojson).addTo(map_Geo);
	mapGeo.scrollWheelZoom.disable();


		this.serverRequest = function ajax(url, data) {
			fetch(url, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data)
			}, this)
				.then(res => {
					return res.json();
				})
				.then(json => {
					var locations = json.map(function(item) {
						return item.location
					})
					console.log(locations)
					this.setState({locations: locations});
				})
				.catch(err => {
					console.log(err)
				});
		}.bind(this)('/classes/userItineraries', {user: window.user});



	}

	render() {
		return (
			<div className='container'>
				<div className='jumbotron'>
					<h1 className='ole'>Wonder Wander <i className='fa fa-paper-plane-o smLogo' aria-hidden='true'></i></h1>
					<Link to='/choose-planner' className='btn btn-success'>Create Itinerary</Link><span>   </span>
					<Link to='/itineraries' className='btn btn-success'>View All Itineraries</Link><span>   </span>
					<Link to='/user-itineraries' className='btn btn-success'>View My Itineraries</Link>
				</div>
				<div className='mapsize' id='map_geo'></div>
				<div>{this.state.locations.map((location) =>
					{return <h2>{location}</h2> }
				)}
				</div>

			</div>
		)
	}
}

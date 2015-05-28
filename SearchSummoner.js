var React = require('react-native')
	Region = require('./StaticData/Region.js'),
	RegionView = require('./RegionView.js'),
	SummonerView = require('./SummonerView.js');;

var VERCION_LOL = '5.9.1' 

var REQUEST_SUMMONER = 'https://lan.api.pvp.net/api/lol/';
var REQUEST_MIDDLE = '/v1.4/summoner/by-name/';
var REQUEST_COMPLEMENT = '?api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';


var API_SUMMONER_ICON = 'http://ddragon.leagueoflegends.com/cdn/'+VERCION_LOL+'/img/profileicon/';
var SUMMONER_BASIC_DATA={};
var {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight,
} = React;

var SearchSummoner = React.createClass({



	getInitialState: function() {
   	 return {
    		loaded: false,
			summoner: null,
			inputValue: '',
			region: 'lan'
    	};
  },
	fetchData: function() {
		var urlRequest = REQUEST_SUMMONER + this.state.region +REQUEST_MIDDLE + this.state.inputValue + REQUEST_COMPLEMENT;
  			fetch(urlRequest)
    		.then((response) => response.json())
    		.then((responseData) => {
      		this.setState({
       		summoner: responseData,
        	loaded: true,
      		});
    	})
    .done();
  },

	search: function(){
		if(this.state.input === ''){
			return console.log('campo vacio');
		}

		this.fetchData();
	},

	updateText: function(text) {
		this.setState({
			inputValue: text,
		});
	},

	navigateToRegionView : function(callback){
		var currency = Region.currency;
		var self = this;
		self.props.navigator.push({
			title: "Region",
			component: RegionView,
			passProps:{currency:currency, onSelect : callback },
		});
	},
	handleRegionButtonPressed : function(){
		var self = this;
		this.navigateToRegionView(function(key){
			self.state.region = key
		});
	},
	renderStaticView: function() {
		return (
			<View style = {styles.body}>
				<View style = {styles.main}>
					<View style = {styles.container}>
						<TextInput
							style={styles.textInput}
							onChange={
								(event) => this.updateText(
									event.nativeEvent.text
	          					)
							}/>
						<TouchableHighlight style={styles.buttonContainer} onPress={this.handleRegionButtonPressed}>
					    	<Text style={styles.buttonText}>{this.state.region}</Text>
					  	</TouchableHighlight>

						<TouchableHighlight style={styles.buttonContainer} onPress={this.search}>
							<Text style={styles.buttonText}>GO!</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		);
	},
	renderSummonerView: function(summoner){
	    var obj = summoner[this.state.inputValue];
	     SUMMONER_BASIC_DATA.id = obj.id;
		 SUMMONER_BASIC_DATA.name = obj.name;// esta dado desde el input 
		 SUMMONER_BASIC_DATA.region = this.state.region;//esta dada desde el imput 
		 SUMMONER_BASIC_DATA.icon = API_SUMMONER_ICON + obj.profileIconId+".png";
		 SUMMONER_BASIC_DATA.summonerLevel = obj.summonerLevel;
	    return (  
    	  <SummonerView
      		summoner = {SUMMONER_BASIC_DATA}/>
   
  	  );
  	},
	
	render: function() {
		if(!this.state.loaded){
			return this.renderStaticView();
		}
    	return this.renderSummonerView(this.state.summoner);
  },
});

var styles = StyleSheet.create({

	body:{
    	backgroundColor:'#0B0B61',
    	height: 800,
  	},
  	buttonContainer : {
		borderRadius: 3,
		borderColor :'#0ea378',
		backgroundColor: '#ffd700',
		height: 80,
		marginTop: 10
	},
	buttonText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: 'black',
		alignSelf: 'center',
		marginTop: 30,
	},
	container: {
		flex: 1,
		padding: 16,
	},
	main: {
		marginTop : 200
	},
	textInput: {
		height: 40,
		marginBottom: 10,
		padding: 4,
		fontSize: 18,
		backgroundColor: 'white',
		justifyContent: 'flex-end'
	}
});

module.exports = SearchSummoner;

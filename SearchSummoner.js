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
	/*
		Metodos innecesarios ya que aqui no se esta haciendo ninguna consulta
		solo es el muestreo de la interfaz osea que solo ocupamos render


	renderLogSummonerView: function() {
  	return (
  		<View >
   			<LogSummoner/>
  		</View>
    );
  },

	*/
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
			<View style = {styles.container}>
				<View style = {styles.inputsContainer}>
					<TextInput
						style={styles.textInput}
						onChange={
							(event) => this.updateText(
								event.nativeEvent.text
          		)
						}/>
					<TouchableHighlight onPress={this.handleRegionButtonPressed}>
				    	<View style={styles.buttonContainer}>
				    		<Text style={styles.buttonText}>{this.state.region}</Text>
				    	</View>
				  	</TouchableHighlight>

					<TouchableHighlight onPress={this.search}>
						<View style={styles.buttonContainer}>
							<Text style={styles.buttonText}>GO!</Text>
						</View>
					</TouchableHighlight>
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

	buttonContainer : {
		borderRadius: 3,
		borderColor :'#0ea378',
		backgroundColor: 'black',
		height: 40,
		marginTop: 10
	},
	centro: {
		marginTop: 180,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		alignSelf: 'center',
		marginTop: 8
	},
	container: {
		flex: 1,
		padding: 16,
		marginTop: 50
	},
	inputsContainer: {
		marginTop : 150
	},
	textInput: {
		height: 40,
		marginBottom: 10,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#0ea378',
		backgroundColor: 'white',
		borderRadius: 3,
		justifyContent: 'flex-end'
	}
});

module.exports = SearchSummoner;

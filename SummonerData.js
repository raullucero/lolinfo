var React = require('react-native'),
	Region = require('./StaticData/Region.js'),
	RegionView = require('./RegionView.js');
	
var {
	TextInput,
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

var SummmonerData = React.createClass ({
	getInitialState: function() {

	    return {
	    	isLoading: false,
	    	inputValue : '',
	    	regionValue : 'NA',
	    };
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
			self.state.regionValue = key
		});
	},
	onSearchTextChanged : function(event){
		this.setState({inputValue: event.nativeEvent.text});
	},
	render: function (){
		return (
			<View style = {styles.container}>
				<View style = {styles.inputsContainer}>
			 		 <TextInput 
			 		 	value={this.state.inputValue}
          				placeholder="Summoner Name"
          				autoCorrect={false}
			  			onChange={this.onSearchTextChanged.bind(this)} 
			    		style={styles.textInput} />
			    
					  	<TouchableHighlight onPress={this.handleRegionButtonPressed}>
					    	<View style={styles.buttonContainer}>
					    		<Text style={styles.buttonText}>{this.state.regionValue}</Text>
					    	</View>

					  	</TouchableHighlight>

				</View>
			</View>
		);
	}
});
var styles = StyleSheet.create({
	
	buttonContainer : {
		borderRadius: 3,
		borderColor :'#0ea378',
		backgroundColor: 'black',
		height: 40
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
module.exports = SummmonerData;
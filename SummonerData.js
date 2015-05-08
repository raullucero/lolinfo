var React = require('react-native'),
	LogSummoner = require('./LogSummoner.js');
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
     loaded: false,
    };
  },
	renderLogSummonerView: function() {
    	return (
      		<View >
       			<LogSummoner/>
      		</View>
    );
  },
   
	render: function() {
    if(!this.state.loaded){
     return this.renderLogSummonerView();
    }

    return (   	
      		<View style={styles.container}>
       		 <Text>
        		  Summoner DATA
       		 </Text>
      		</View>
    );
  },

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
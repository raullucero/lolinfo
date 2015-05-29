var React = require('react-native');

var REQUEST_RUNE = 'https://global.api.pvp.net/api/lol/static-data/lan/v1.2/rune/';
var REQUEST_RUNE_COMPLEMENT = '?locale=es_ES&version=5.9.1&runeData=image&api_key=7623078e-62e4-4fa8-9397-174ca4dac061';

var REQUEST_IMAGE_RUNE = 'http://ddragon.leagueoflegends.com/cdn/5.9.1/img/rune/';
var {
  View,
  Text,
  Image,
  StyleSheet,
} = React;

var RuneMatch = React.createClass({
   getInitialState: function() {
    return {
     loaded: false,
     runeUsed:null,
    };
  },
  //PARA OBTENER LOS DATOS DE IMGAEN RUNA
  fetchDataRune: function() {
    var urlRequest = REQUEST_RUNE +this.props.rune.runeId + REQUEST_RUNE_COMPLEMENT;
    fetch(urlRequest)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
       runeUsed: responseData,
       loaded: true
      });
    })
    .done();
  }, 

  renderLoadingView: function() {
    this.fetchDataRune();
    return (
      <View style={styles.container}>
        <Text>
          Loading Runes ...
        </Text>
      </View>
    );
  },
  
  render: function() {
      if(!this.state.loaded){
      return this.renderLoadingView();
    }
    urlImge = REQUEST_IMAGE_RUNE + this.state.runeUsed.image.full;
    return (
        
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: urlImge}}/>
            <Text> X {this.props.rune.rank}</Text>
            <View >
                <Text>{this.state.runeUsed.name}</Text>
                <Text>{this.state.runeUsed.description}</Text>
            </View>
          </View>

    );
  },
});

var styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  image:{
    width: 65,
    height: 65,
  },
});

module.exports = RuneMatch;

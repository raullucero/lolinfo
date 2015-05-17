var React = require('react-native');

var REQUEST_IMAGE_CHAMP_SMALL = 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/';

var REQUEST_CHAMPION ='https://global.api.pvp.net/api/lol/static-data/lan/v1.2/champion/';
var RECUEST_CHAMPION_COMPLEMENT='?champData=image&api_key=7623078e-62e4-4fa8-9397-174ca4dac061';
var {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} = React;

var CellHistory = React.createClass({

  getInitialState: function() {
    return {
        champion: null,
        loaded: false,
    };
  },
  componentDidMount: function(){
    this.fetchDataChamp();
  },
//PARA OBTENER LOS DATOS DE IMGAEN CAMPEON 
  fetchDataChamp: function() {
    var urlRequest = REQUEST_CHAMPION +this.props.match.participants[0].championId + RECUEST_CHAMPION_COMPLEMENT;
    fetch(urlRequest)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
       champion: responseData,
       loaded: true
      });
    })
    .done();
  },

  renderLoadingView: function() {
    return (
      <View style={styles.renderLoad}>
        <Text>
          Loading Match History...
        </Text>
      </View>
    );
  },

  render: function() {
 
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    urlImage = REQUEST_IMAGE_CHAMP_SMALL +this.state.champion.image.full;

    return (
        <View>
        <TouchableHighlight>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: urlImage}}/>
            <View style={styles.rightContainer}>
              <Text>Campeon: {this.props.match.participants[0].championId} </Text>
            </View>
          </View>
        </TouchableHighlight>
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
    borderWidth: .75,
    borderColor: '#000000',
    
  },
   renderLoad :{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 184
   },
  rightContainer: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
  }
});

module.exports = CellHistory;
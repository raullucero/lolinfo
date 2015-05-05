var React = require('react-native');

var REQUEST_IMAGE_SKIN = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
var REQUEST_CHAMP = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
var REQUEST_COMPLEMENT = '?champData=all&api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';

var {
  Text,
  View,
  StyleSheet,
  Image,
} = React;

var Champion = React.createClass({

  getInitialState: function() {
    return {
      champInfo: null,
      loaded: false,
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    var FINAL_REQUEST = REQUEST_CHAMP + this.props.champion.id + REQUEST_COMPLEMENT;
    fetch(FINAL_REQUEST)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        champInfo: responseData,
        loaded: true,
      });
    })
    .done();
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading champion...
        </Text>
      </View>
    );
  },

  renderChampion: function() {
    return (
      <View style={styles.container}>
        <Text>{this.state.champInfo.name}</Text>
        <Text>{this.state.champInfo.blurb}</Text>
      </View>
    );
  },

  render: function() {
    //var urlSkin = REQUEST_IMAGE_SKIN + this.props.champion.key + '_' + this.props.champion.skins.num + '.jpg';
    console.log(this.state.champInfo);
    console.log(this.props.champion);

    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return this.renderChampion();
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperSkin: {
    width: 124,
    height: 224,
  },
});

module.exports = Champion;

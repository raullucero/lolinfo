var React = require('react-native');

var REQUEST_IMAGE_SKIN = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
var REQUEST_CHAMP = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
var REQUEST_COMPLEMENT = '?champData=all&api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';

var SKINS_IMAGES = [];

var {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
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

  render: function() {
    //var urlSkin = REQUEST_IMAGE_SKIN + this.props.champion.key + '_' + this.props.champion.skins.num + '.jpg';

    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    var keyChamp = this.state.champInfo.key;

    SKINS_IMAGES = [];

    this.state.champInfo.skins.forEach(function(skin){
      var image = REQUEST_IMAGE_SKIN + keyChamp + '_' + skin.num + '.jpg';
      SKINS_IMAGES.push(image);
    });

    return (
      <View>
        <ScrollView
          horizontal={true}
          contentInset={{top: 0}}
          style={[styles.scrollView, styles.horizontalScrollView]}>
          {SKINS_IMAGES.map(createSkinRow)}
        </ScrollView>
        <View style={styles.container}>
          <Text>{this.state.champInfo.name}</Text>
          <Text>{this.state.champInfo.blurb}</Text>
        </View>
      </View>
    );
  },

});

var Skin = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.button}>
        <Image style={styles.wrapperSkin} source={{uri:this.props.uri}} />
      </View>
    );
  }
});

var createSkinRow = (uri, i) => <Skin key={i} uri={uri} />;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: '#000000',
  },
  horizontalScrollView: {
    height: 310,
  },
  wrapperSkin: {
    width: 124,
    height: 224,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 3,
  },
});

module.exports = Champion;

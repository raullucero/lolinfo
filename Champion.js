var React = require('react-native');
var Habilities = require('./Habilities');
var DetailChampion = require('./DetailChampion')
global.Config = require('./StaticData/Config.js');

var REQUEST_IMAGE_SKIN = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
var REQUEST_CHAMP = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
var REQUEST_COMPLEMENT = '?champData=all&api_key='+ global.Config.api.key;

var SKINS_IMAGES = [];

var {
  Text,
  View,
  StyleSheet,
  Image,
  ListView,
  ScrollView,
} = React;

var Champion = React.createClass({

  getInitialState: function() {
    return {
      champInfo: null,
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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
        dataSource: this.state.dataSource.cloneWithRows(responseData.spells),
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

  renderHabilities: function(spell){
    return (
      <Habilities
        spell={spell}
      />
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

    //var blurpHTML = eval('this.state.champInfo.blurb');
    this.state.champInfo.title = this.state.champInfo.title.replace(
      /^[a-z]/, function(m){
        return m.toUpperCase()
       }
    );
    return (
      <ScrollView
        style={styles.containerMain}>
        <ScrollView
          scrollEventThrottle={200}
          contentInset={{top: -50}}
          style={styles.scrollView}
          horizontal={true} >
          {SKINS_IMAGES.map(createSkinRow)}
        </ScrollView>
        <Text style={styles.name}>
          {this.state.champInfo.name}
        </Text>

        <Text style={styles.title}>
          {this.state.champInfo.title}
        </Text>
        <Text style={styles.sections}>
          Habilities
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderHabilities}
          style={styles.listView}
          automaticallyAdjustContentInsets={false}/>

      </ScrollView>

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

  containerMain: {
    backgroundColor: 'black',
  },
  scrollView: {
    backgroundColor: '#1C1C1C',
    height: 270,
  },
  wrapperSkin: {
    width: 124,
    height: 224,
    borderWidth: 3,
    borderColor: '#BDBDBD',
  },
  name: {
    fontSize: 26,
    marginTop: 7,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 6,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 3,
  },
  sections: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 6,
    color: 'white',
    textAlign: 'center',
  },
});

module.exports = Champion;

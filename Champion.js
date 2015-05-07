var React = require('react-native');
var Habilities = require('./Habilities');

var REQUEST_IMAGE_SKIN = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
var REQUEST_CHAMP = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
var REQUEST_COMPLEMENT = '?champData=all&api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';

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

    var blurpHTML = eval('this.state.champInfo.blurb');

    return (
      <View>
        <ScrollView
          horizontal={true}
          contentInset={{top: 0}}
          style={[styles.scrollView, styles.horizontalScrollView]}>
          {SKINS_IMAGES.map(createSkinRow)}
        </ScrollView>
        <View style={styles.container}>

          <Text style={styles.name}>
            {this.state.champInfo.name}
          </Text>

          <Text style={styles.title}>
            {this.props.champion.title}
          </Text>

          <View style={styles.blurp}>
            <Text>{blurpHTML}</Text>
          </View>

          <Text style={styles.section}>
            History
          </Text>

          <Text style={styles.title}>
            {this.state.champInfo.lore}
          </Text>

          <Text style={styles.section}>
            Habilities
          </Text>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderHabilities}
            style={styles.listView}
          />
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
  },
  name: {
    fontSize: 24,
    marginTop: 7,
    textAlign: 'center',
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  blurp: {
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    paddingLeft: 16,
  },
  section: {
    fontWeight: 'bold',
    textAlign: 'left',
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
  listView: {
    height: 250,
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

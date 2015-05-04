/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';
var REQUEST_CHAMP = 'http://ddragon.leagueoflegends.com/cdn/5.7.2/img/champion/';

var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
} = React;

var lolinfo = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
     loaded: false,
    };
  },
  componentDidMount: function(){
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
        loaded: true,
      });
    })
    .done();
  },
  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderChampion}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading champions...
        </Text>
      </View>
    );
  },
  renderChampion: function(champion){
    var urlImage = REQUEST_CHAMP + champion.image.full;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: urlImage}}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{champion.name}</Text>
          <Text style={styles.title}>{champion.title}</Text>
        </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('lolinfo', () => lolinfo);

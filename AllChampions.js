var React = require('react-native');
var Champion = require('./Champion');
var CellChampion = require('./CellChampion');

var REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';


'use strict';

var {
  StyleSheet,
  Text,
  Image,
  NavigatorIOS,
  View,
  TouchableHighlight,
  ListView,
} = React;

var AllChampions = React.createClass({

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

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading champions...
        </Text>
      </View>
    );
  },

  selectChampion: function(champion){
    this.props.navigator.push({
      title: champion.name,
      component: Champion,
      passProps: {champion},
    });
  },

  renderChampion: function(champion){
    return (
      <CellChampion
        onSelect={() => this.selectChampion(champion)}
        champion={champion}
      />
    );
  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderChampion}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />
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

});

module.exports = AllChampions;

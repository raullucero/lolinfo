var React = require('react-native');
var Champion = require('./Champion');
var CellChampion = require('./CellChampion');
var SearchChampion = require('./SearchChampion.js');

var REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';


'use strict';

var {
  StyleSheet,
  Text,
  ScrollView,
  NavigatorIOS,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
} = React;

var AllChampions = React.createClass({

  timeoutID: (null: any),

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
     loaded: false,
     filter: '',
     change: false,
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

  renderRow: function(champion){
    return (
      <CellChampion
        onSelect={() => this.selectChampion(champion)}
        champion={champion}
        filter={this.state.filter}
      />
    );
  },

  onSearchChange: function(event) {
    var filter = event.nativeEvent.text.toLowerCase();
    this.setState({
      filter: filter,
      change: true,
    });
    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 100);
  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    var content =
      <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />;

    if(this.state.change){
      content =
      <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />;
      this.setState({
        change: false,
      });
    }


    return (
      <View
        style={styles.containerScroll}>
        <SearchChampion
          onSearchChange={this.onSearchChange} />
        <View style={styles.separator} />
        {content}
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#F5FCFF',
  },
  containerScroll: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
});

module.exports = AllChampions;

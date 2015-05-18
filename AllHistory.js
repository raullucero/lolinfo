var React = require('react-native');
var HistoryMatch = require('./HistoryMatch.js');
var CellHistory = require('./CellHistory.js');

var REQUEST_MATCH_HYSTORY = 'https://lan.api.pvp.net/api/lol/';
var REQUEST_MIDDLE ='/v2.2/matchhistory/';

var REQUEST_COMPLEMENT = '?rankedQueues=RANKED_SOLO_5x5&beginIndex=0&endIndex=10&api_key=7623078e-62e4-4fa8-9397-174ca4dac061';


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

var AllHistory = React.createClass({

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
    var REQUEST_URL = REQUEST_MATCH_HYSTORY + this.props.summoner.region + REQUEST_MIDDLE + this.props.summoner.id + REQUEST_COMPLEMENT ;
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.matches),
        loaded: true,
      });
    })
   .done();
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Ranked History...
        </Text>
      </View>
    );
  },

  selectMatch: function(match){
    // this.props.navigator.push({
    //   title: champion.name,
    //   component: CellHistory,
    //   passProps: {match},
    // });
  },

  renderHistory: function(match){
    return (
       <CellHistory 
      // onSelect={() => this.selectMatch(match)}
        match={match} />

    );
  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderHistory}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false} />
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

module.exports = AllHistory;

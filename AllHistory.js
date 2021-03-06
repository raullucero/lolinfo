var React = require('react-native');
//var HistoryMatch = require('./HistoryMatch.js');
var CellHistory = require('./CellHistory.js');
global.Config = require('./StaticData/Config.js');
var REQUEST_MATCH_HYSTORY = 'https://lan.api.pvp.net/api/lol/';
var REQUEST_MIDDLE ='/v2.2/matchhistory/';

var REQUEST_COMPLEMENT = '?rankedQueues=RANKED_SOLO_5x5&beginIndex=0&endIndex=10&api_key='+ global.Config.api.key;


'use strict';

var {
  StyleSheet,
  Text,
  Image,
  NavigatorIOS,
  View,
  TouchableHighlight,
  ListView,
  AlertIOS,
  ScrollView,
} = React;

var AllHistory = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
     loaded: false,
     rankeds:true,
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
        dataSource: this.state.dataSource.cloneWithRows(responseData.matches.reverse()),
        loaded: true,
      });
    }).catch((error) => {
          AlertIOS.alert(
               'Unranked Summoner',
               'Este summoner no tiene historial de Partidas de Clasificatoria'
            )
          this.setState({
            rankeds: false,
          });
      })
    .done();
  },

  renderLoadingView: function() {
    var urlimage = 'http://na.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/awn53kv.jpg?itok=yj6DliR_';
    if (this.state.rankeds) {
          return (
           <View style={styles.container}>
            <Text>
             Loading Ranked History...
            </Text>
          </View>
     );
    } else{
        return (
          <View style={styles.container}>
            <Image style={styles.image} source={{uri:urlimage}}/>
          </View>
    );
    }; 
     

    
  },

  renderHistory: function(match): ReactElement {
    return (
       <CellHistory
         //onSelect={() => this.selectMatch(match)}
        match={match} />

    );
  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }


    return (

      <ScrollView
        scrollEventThrottle={200}
        contentInset={{top: -128}}
        style={styles.scrollView}>
        <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderHistory}
         keyboardDismissMode="onDrag"
         keyboardShouldPersistTaps={true}/>
      </ScrollView>
    );
  },

});

var styles = StyleSheet.create({

  image: {
    width: 414,
    height: 600,
  },
});

module.exports = AllHistory;

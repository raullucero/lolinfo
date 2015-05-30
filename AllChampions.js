var React = require('react-native');
var Champion = require('./Champion');
var CellChampion = require('./CellChampion');
var SearchChampion = require('./SearchChampion.js');
var TimerMixin = require('react-timer-mixin');

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
  mixins: [TimerMixin],

  timeoutID: (null: any),

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      filter: '',
      jChampions: null,
      jChampionsSearch: null,
      search: false,

    };
  },

/* IDEA Tener dos datasource de la listview para el manejo de la busqueda
una busqueda sera para referencia de allchampions y la otra se hara a partir de eso para
la busqueda de el campeon ingresado en el campo de busqueda*/

  componentDidMount: function(){
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
        jChampions: responseData.data,
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
    });
    this.timeoutID = this.setTimeout(() => this.searchingChampion(filter), 200);


    //console.log(this.state.filter);
  },

  searchingChampion: function(){
    var arrayChamps = {};
    this.state.filter = this.state.filter.toLowerCase();

    for(var champion in this.state.jChampions){
      //console.log(champion);
      champion = champion.toLowerCase();
      if(champion.indexOf(this.state.filter)!==-1){
        console.log('entro');
        arrayChamps[champion] = this.state.jChampions[champion];
      }
    }
    console.log(arrayChamps);
  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }



    console.log(this.state.jChampions);
    return (
      <View
        style={styles.containerScroll}>
        <SearchChampion
          onSearchChange={this.onSearchChange} />
        <View style={styles.separator} />
          <ListView
            ref="listview"
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="onDrag"
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={false}
          />
      </View>
    );
  },

});

var NoMovies = React.createClass({
  render: function() {
    var text = '';
    if (this.props.filter) {
      text = `No results for “${this.props.filter}”`;
    } else if (!this.props.isLoading) {
      // If we're looking at the latest movies, aren't currently loading, and
      // still have no results, show a message
      text = 'No movies found';
    }

    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noMoviesText}>{text}</Text>
      </View>
    );
  }
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

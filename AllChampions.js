var React = require('react-native');
global.Config = require('./StaticData/Config.js');
var Champion = require('./Champion');
var CellChampion = require('./CellChampion');
var SearchChampion = require('./SearchChampion.js');
var TimerMixin = require('react-timer-mixin');
var Menu = require('./Menu.js')

var REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=' + global.Config.api.key;
var REQUEST_FREE_ROTATION = 'https://na.api.pvp.net/api/lol/na/v1.2/champion?freeToPlay=true&api_key='+ global.Config.api.key;
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
  AlertIOS,
} = React;


var idChamp = {
  "35": "Shaco",
  "36": "DrMundo",
  "33": "Rammus",
  "34": "Anivia",
  "39": "Irelia",
  "157": "Yasuo",
  "37": "Sona",
  "38": "Kassadin",
  "154": "Zac",
  "150": "Gnar",
  "43": "Karma",
  "42": "Corki",
  "41": "Gangplank",
  "40": "Janna",
  "201": "Braum",
  "22": "Ashe",
  "23": "Tryndamere",
  "24": "Jax",
  "25": "Morgana",
  "26": "Zilean",
  "27": "Singed",
  "28": "Evelynn",
  "29": "Twitch",
  "3": "Galio",
  "161": "Velkoz",
  "2": "Olaf",
  "1": "Annie",
  "7": "Leblanc",
  "30": "Karthus",
  "6": "Urgot",
  "32": "Amumu",
  "5": "XinZhao",
  "31": "Chogath",
  "4": "TwistedFate",
  "9": "FiddleSticks",
  "8": "Vladimir",
  "19": "Warwick",
  "17": "Teemo",
  "18": "Tristana",
  "15": "Sivir",
  "16": "Soraka",
  "13": "Ryze",
  "14": "Sion",
  "11": "MasterYi",
  "12": "Alistar",
  "21": "MissFortune",
  "20": "Nunu",
  "107": "Rengar",
  "106": "Volibear",
  "105": "Fizz",
  "104": "Graves",
  "103": "Ahri",
  "99": "Lux",
  "102": "Shyvana",
  "101": "Xerath",
  "412": "Thresh",
  "98": "Shen",
  "222": "Jinx",
  "96": "KogMaw",
  "92": "Riven",
  "91": "Talon",
  "90": "Malzahar",
  "429": "Kalista",
  "10": "Kayle",
  "421": "RekSai",
  "89": "Leona",
  "79": "Gragas",
  "117": "Lulu",
  "114": "Fiora",
  "78": "Poppy",
  "115": "Ziggs",
  "77": "Udyr",
  "112": "Viktor",
  "113": "Sejuani",
  "110": "Varus",
  "111": "Nautilus",
  "119": "Draven",
  "432": "Bard",
  "245": "Ekko",
  "82": "Mordekaiser",
  "83": "Yorick",
  "80": "Pantheon",
  "81": "Ezreal",
  "86": "Garen",
  "84": "Akali",
  "85": "Kennen",
  "67": "Vayne",
  "126": "Jayce",
  "69": "Cassiopeia",
  "127": "Lissandra",
  "68": "Rumble",
  "121": "Khazix",
  "122": "Darius",
  "120": "Hecarim",
  "72": "Skarner",
  "236": "Lucian",
  "74": "Heimerdinger",
  "75": "Nasus",
  "238": "Zed",
  "76": "Nidalee",
  "134": "Syndra",
  "133": "Quinn",
  "59": "JarvanIV",
  "58": "Renekton",
  "57": "Maokai",
  "56": "Nocturne",
  "55": "Katarina",
  "64": "LeeSin",
  "62": "MonkeyKing",
  "63": "Brand",
  "268": "Azir",
  "267": "Nami",
  "60": "Elise",
  "131": "Diana",
  "61": "Orianna",
  "266": "Aatrox",
  "143": "Zyra",
  "48": "Trundle",
  "45": "Veigar",
  "44": "Taric",
  "51": "Caitlyn",
  "53": "Blitzcrank",
  "54": "Malphite",
  "254": "Vi",
  "50": "Swain"
};

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
      jFreeRotation: null,
      jChampionsSearch: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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
    }).catch((error) => {
           AlertIOS.alert(
               'Summoner Error',
               '* Tu Conexión no permite el acceso de lolinfo'

          )

      })
    .done();

    fetch(REQUEST_FREE_ROTATION)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        jFreeRotation: responseData.champions,
      });
    }).done();
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
    this.timeoutID = this.setTimeout(() => this.searchingChampion(filter), 100);


    //console.log(this.state.filter);
  },

  searchingChampion: function(){
    var arrayChamps = {};

    if(this.state.filter.length > 0){
      this.state.filter = this.state.filter.toLowerCase();

      for(var champion in this.state.jChampions){
        //console.log(champion);
        var nchampion = champion.toLowerCase();
        if(nchampion.indexOf(this.state.filter) !== -1){
          //console.log('entro');
          arrayChamps[champion] = this.state.jChampions[champion];
        }
      }
      //console.log(arrayChamps);
      this.setState({
        jChampionsSearch: this.state.dataSource.cloneWithRows(arrayChamps),
      });

    }else if(this.state.filter.length === 0){
      this.setState({
        jChampionsSearch: this.state.dataSource,
      });
    }
    //console.log(arrayChamps);
  },

  showFreeRotation: function(){
    var freeChamps = {};
    //console.log(this.state.jFreeRotation);
    for(var i = 0; i < this.state.jFreeRotation.length ; i++){
      var id = this.state.jFreeRotation[i].id;
      //this.state.jChampions[id];
      //console.log(this.state.jChampions);
      freeChamps[idChamp[id]] = this.state.jChampions[idChamp[id]];
    }
    this.setState({
      jChampionsSearch: this.state.dataSource.cloneWithRows(freeChamps),
    });

  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    //console.log(this.state.jChampionsSearch);
    //console.log(this.state.dataSource);
    //console.log(this.state.jFreeRotation);
    var content = this.state.jChampionsSearch.getRowCount() === 0 && this.state.filter.length === 0 ?
      <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false} /> : this.state.jChampionsSearch.getRowCount() > 0 ?
      <ListView
        ref="listview"
        dataSource={this.state.jChampionsSearch}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false} /> :
      <NoChamps
        filter={this.state.filter} />;

    //console.log(this.state.jChampions);
    return (
      <View
        style={styles.containerScroll}>
        <SearchChampion
          onSearchChange={this.onSearchChange}
          showFreeRotation={this.showFreeRotation} />
        <View style={styles.separator} />
        {content}
      </View>
    );
  },

});

var NoChamps = React.createClass({
  render: function() {
    var text = '';
    if (this.props.filter) {
      text = `No results for “${this.props.filter}”`;
    } else {
      text = 'No champion found';
    }

    return (
      <View style={[styles.containerNoChamp, styles.centerText]}>
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
  containerNoChamp: {
    flex: 1,
  },
  containerScroll: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  centerText: {
    alignItems: 'center',
  },
});

module.exports = AllChampions;

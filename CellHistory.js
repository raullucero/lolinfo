var React = require('react-native');

var REQUEST_IMAGE_CHAMP_SMALL = 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/';

var REQUEST_CHAMPION ='https://global.api.pvp.net/api/lol/static-data/lan/v1.2/champion/';
var RECUEST_CHAMPION_COMPLEMENT='?champData=image&api_key=7623078e-62e4-4fa8-9397-174ca4dac061';
var REQUEST_IMAGE_ITEM = 'http://ddragon.leagueoflegends.com/cdn/5.9.1/img/item/';

var urlImageIcons_minions= 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/minion.png'; 
var urlImageIcons_gold = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/gold.png';

var {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} = React;

var CellHistory = React.createClass({

  getInitialState: function() {
    return {
        champion: null,
        loaded: false,
    };
  },
  componentDidMount: function(){
    this.fetchDataChamp();
  },
//PARA OBTENER LOS DATOS DE IMGAEN CAMPEON 
  fetchDataChamp: function() {
    var urlRequest = REQUEST_CHAMPION +this.props.match.participants[0].championId + RECUEST_CHAMPION_COMPLEMENT;
    fetch(urlRequest)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
       champion: responseData,
       loaded: true
      });
    })
    .done();
  }, 
  //Funcion de REdondeo 
  roundGoldEarned: function(gold){
   var goldOriginal = parseFloat(gold/Math.pow(10,3));
   var goldconvert = Math.round(goldOriginal*Math.pow(10,1))/Math.pow(10,1);
       goldconvert = goldconvert + 'K';
    return goldconvert;
  },
  imageItem:function(itemId){
    var url = 'http://promo.na.leagueoflegends.com/assets/snowdown-2014/img/game-mode/icon-2.png';
    if (itemId != 0){ 
      url =  REQUEST_IMAGE_ITEM + itemId + '.png';
      return url;
    }
    return url
  },

  renderLoadingView: function() {
    return (
      <View style={styles.renderLoad}>
        <Text>
          Loading Match History...
        </Text>
      </View>
    );
  },

  render: function() {
     if(!this.state.loaded){
       return this.renderLoadingView();
       }
    urlImage = REQUEST_IMAGE_CHAMP_SMALL +this.state.champion.image.full;
    urlItemImge1 = this.imageItem(this.props.match.participants[0].stats.item1); 
    urlItemImge2 = this.imageItem(this.props.match.participants[0].stats.item2); 
    urlItemImge3 = this.imageItem(this.props.match.participants[0].stats.item3); 
    urlItemImge4 = this.imageItem(this.props.match.participants[0].stats.item4); 
    urlItemImge5 = this.imageItem(this.props.match.participants[0].stats.item5); 
    urlItemImge6 = this.imageItem(this.props.match.participants[0].stats.item6); 
    urlItemImge7 = this.imageItem(this.props.match.participants[0].stats.item7); 
    
    //Para mostrar si gano o no 
    matchStatus = 'Defeat';  
    if(this.props.match.participants[0].stats.winner){
     matchStatus = 'Victory';
    }
    //para obtener de forma reducida el oro 
    gold = this.roundGoldEarned(this.props.match.participants[0].stats.goldEarned);
    
    
    return (
        <View>
        <TouchableHighlight>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: urlImage}}/>
            <Text>{matchStatus}</Text>

            <View style={styles.rightContainer}>
              
              <Text> {this.props.match.participants[0].stats.kills} / {this.props.match.participants[0].stats.deaths} / {this.props.match.participants[0].stats.assists} </Text>
              <View style={styles.itemContiner}>
                <Image
                style={styles.itemimage}
                source={{uri: urlItemImge1}}/>
                <Image
                style={styles.itemimage}
                source={{uri: urlItemImge2}}/>
                <Image
                style={styles.itemimage}
                source={{uri: urlItemImge3}}/>
                <Image
                style={styles.itemimage}
                source={{uri: urlItemImge4}}/>
                <Image
                style={styles.itemimage}
                source={{uri: urlItemImge5}}/>
                <Image
                style={styles.itemimage}
                source={{uri: urlItemImge6}}/>
                <Image
                style={styles.itemimage}
                source={{uri: urlItemImge7}}/>
              </View>
               <View style={styles.iconsContainer}> 
                <View style={styles.iconContainer}>
                 <Image
                   style={styles.iconimage}
                   source={{uri: urlImageIcons_minions}}/>
                 <Text style={styles.iconText} > {this.props.match.participants[0].stats.minionsKilled} </Text>
                </View>
                <View style={styles.iconContainer}>
                 <Image
                   style={styles.iconimage}
                   source={{uri: urlImageIcons_gold}}/>
                 <Text style={styles.iconText}> {gold} </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
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
  iconsContainer:{
    flexDirection: 'row',
    alignItems:'stretch',
  },
  iconContainer:{
    flexDirection: 'row',
    alignItems:'stretch',  
  },
  itemContiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
   renderLoad :{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 184
   },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  itemimage: {
    width: 30,
    height: 30,
  },
  iconimage:{
    width: 21,
    height: 22
  },
  iconText:{
    fontSize: 12,
  }
});

module.exports = CellHistory;
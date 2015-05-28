var React = require('react-native');

var REQUEST_IMAGE_CHAMP_SMALL = 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/';

var REQUEST_CHAMPION ='https://global.api.pvp.net/api/lol/static-data/lan/v1.2/champion/';
var RECUEST_CHAMPION_COMPLEMENT='?champData=image&api_key=7623078e-62e4-4fa8-9397-174ca4dac061';
var REQUEST_IMAGE_ITEM = 'http://ddragon.leagueoflegends.com/cdn/5.9.1/img/item/';

var urlImageIcons_minions= 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/minion.png'; 
var urlImageIcons_gold = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/gold.png';
var urlImageIcons_KDA= 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/score.png';

var {
  View,
  LayoutAnimation,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} = React;
var CellHistory = React.createClass({

  getInitialState: function() {
    return {
        champion: null,
        loaded: false,
        touched:false,
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
  roundTime: function(time){
    var minutes = Math.floor( time / 60 );
    var seconds = time % 60;
 
    //Anteponiendo un 0 a los minutos si son menos de 10 
    minutes = minutes < 10 ? '0' + minutes : minutes;
 
    //Anteponiendo un 0 a los segundos si son menos de 10 
    seconds = seconds < 10 ? '0' + seconds : seconds;
 
    var result = minutes + ":" + seconds;  // mm:ss 
    return result;
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

  _onPressDetails: function() {
    //segun esto es una animacion, tomado de ract-native Examples UiExplorer ListView
    var config = layoutAnimationConfigs[20 % 3];
    LayoutAnimation.configureNext(config);
   //una ves precionado cambiamos la variable de estado para mostrar los detalles
    this.setState({
      
      touched: this.state.touched === true ? false : true,
    });
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
    duration = this.roundTime(this.props.match.matchDuration);
    
    return (
        
        <TouchableOpacity onPress={this._onPressDetails}>
        <View>
          <View style={styles.container}>
            <Image
              style={[styles.champImage , styles.image]}
              source={{uri: urlImage}}>
              <Text style={styles.nestedText}>
                {this.props.match.participants[0].stats.champLevel}
              </Text>
            </Image>
            <View style={styles.rightContainer}>
            <Text style={styles.simpleText} >{matchStatus}</Text>

            <Text style={[styles.simpleText , styles.durationText]}>
                  {duration}
            </Text>
            </View>
            <View style={styles.ItemsContainer}>
              <View style={styles.iconContainer}>
                <Image
                   style={styles.iconimage}
                   source={{uri: urlImageIcons_KDA}}/>  
                <Text style={styles.simpleText} > {this.props.match.participants[0].stats.kills} / {this.props.match.participants[0].stats.deaths} / {this.props.match.participants[0].stats.assists} </Text>
              </View>
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
                 <Text style={[styles.simpleText , styles.iconText]} > {this.props.match.participants[0].stats.minionsKilled} </Text>
                </View>
                <View style={styles.iconContainer}>
                 <Image
                   style={styles.iconimage}
                   source={{uri: urlImageIcons_gold}}/>
                 <Text style={[ styles.simpleText , styles.iconText]}> {gold} </Text>
                </View>
              </View>
            </View>
          </View>
          {this.state.touched === true ?
            <View>
             <Text>
              Total Daño Recibido : {this.props.match.participants[0].stats.totalDamageTaken}
            </Text> 
            <Text>
            Total Daño Repartido : {this.props.match.participants[0].stats.totalDamageDealt}
            </Text>
            <Text>
              Multi Kill Mas Larga : {this.props.match.participants[0].stats.largestMultiKill}
            </Text>
            <Text>
              Wards Colocados: {this.props.match.participants[0].stats.wardsPlaced}
            </Text>
            </View> :
            <View/>
          }
        </View>
          
        </TouchableOpacity>
      
    );
  },
});

var styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2c64',
    borderWidth: .75,
    borderColor: '#000000',
    
  },
  simpleText:{
    color:'#E6E6E6'
  },
  durationText:{
    marginRight:5,
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
  ItemsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: .2,
    alignItems: 'center',
  },
  champImage:{
    margin: 5,
    backgroundColor: 'transparent'
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
    height: 22,
    margin: 1
  },
  iconText:{
    fontSize: 12,
  },
  nestedText: {
    marginLeft: 40,
    marginTop: 40,
    backgroundColor: 'transparent',
    color: '#E6E6E6'
  },
});
//**************[Variables de Animacion]********************************
var animations = {
  layout: {
    spring: {
      duration: 750,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};
var layoutAnimationConfigs = [
  animations.layout.spring,
  animations.layout.easeInEaseOut,
];
// ***********************************************************************
module.exports = CellHistory;
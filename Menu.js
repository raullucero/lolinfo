var React = require('react-native');
var AllChampions = require('./AllChampions.js')
var SearchSummoner = require('./SearchSummoner.js')
var {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} = React;

var Menu = React.createClass({
  onSelectChampions: function() {
    this.props.navigator.push({
      title: 'All Champions',
      component: AllChampions,
    });
  },

  onSelectSummoner: function() {
    // TODO Aqui va la llamada a la funcion de inicio de busqueda
    // de datos de summoner
    this.props.navigator.push({
      title: 'Summoner',
      component: SearchSummoner,
    });
  },
  render: function() {
    return (
        <View style={styles.body}>
          <View style={styles.main}>  

            <TouchableHighlight style={styles.container} onPress={this.onSelectChampions}>
              <Text style={styles.name}>Champion</Text>   
           </TouchableHighlight>
         
            <TouchableHighlight style={styles.container} onPress={this.onSelectSummoner}>
              <Text style={styles.name}>Summoner</Text>
            </TouchableHighlight>
         
          </View>   
        </View>
          
        
    );
  },
});

var styles = StyleSheet.create({
  
  body:{
    backgroundColor:'#0B0B61',
    height: 800,
  },
  main:{
    marginTop: 200,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    marginTop: 20,
    height: 80,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color:'black',
  },

});

module.exports = Menu;

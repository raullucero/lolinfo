var React = require('react-native');
var AllChampions = require('./AllChampions.js')
var SummonerData = require('./SummonerData.js')
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
      component: SummonerData,
    });
  },
  render: function() {
    return (
        <View>
          <TouchableHighlight onPress={this.onSelectChampions}>
            <View style={styles.container}>
              <Text style={styles.name}>Champion</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onSelectSummoner}>
            <View style={styles.container}>
              <Text style={styles.name}>Summoner</Text>
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
    marginTop: 120,
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

module.exports = Menu;

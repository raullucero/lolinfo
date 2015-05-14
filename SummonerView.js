var React = require('react-native');
var AllHistory = require('./AllHistory.js');
var {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} = React;

var SummonerView = React.createClass({
 

 
  render: function() {
    return (
      <View>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: this.props.summoner.icon}}/>
            <View style={styles.rightContainer}>
              <Text style = {styles.name}>{this.props.summoner.name }</Text>
              <Text style = {styles.level}>level-{this.props.summoner.summonerLevel}</Text>
            </View>
          </View>
          <AllHistory 
            summoner = {this.props.summoner}/>
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
    marginTop: 64
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 30,
    marginBottom: 8,
    textAlign: 'center',
  },
  level: {
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
});

module.exports = SummonerView;
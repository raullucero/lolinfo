var React = require('react-native');

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
        <View style = {styles.centro} >
        <Text >
            {this.props.summoner.name }
          </Text>
          <Image
              style={styles.image}
              source={{uri: this.props.summoner.icon}}/>
        </View>

    );
  },
});

var styles = StyleSheet.create({
 
   centro: {
    marginTop: 180,
  },

  image: {
    width: 80,
    height: 80,
  },

});

module.exports = SummonerView;
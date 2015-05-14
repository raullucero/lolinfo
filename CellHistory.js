var React = require('react-native');

var REQUEST_IMAGE_CHAMP_SMALL = 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/';
var {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} = React;

var CellHistory = React.createClass({

  
  render: function() {
    return (
        <View>
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
                <Text>Campeon: {this.props.match.participants[0].championId} </Text>
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
    marginTop: 184
  },
  rightContainer: {
    flex: 1,
  }
});

module.exports = CellHistory;
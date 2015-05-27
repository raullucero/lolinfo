var React = require('react-native');

var {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} = React;

var HistoryMatch = React.createClass({

  render: function() {
    return (
        <View>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
                <Text>MOSTRANDO HISTORIAL</Text>
            </View>
          </View>
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

module.exports = HistoryMatch;

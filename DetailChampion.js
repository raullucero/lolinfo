var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

DetailChampion = React.createClass({

  render: function() {
    return (
      <View>
        <Text style={styles.name}>
          {this.props.champInfo.name}
        </Text>

        <Text style={styles.title}>
          {this.props.champInfo.title}
        </Text>

        <View style={styles.blurp}>
          <Text>{this.props.champInfo.blurp}</Text>
        </View>

        <Text style={styles.section}>
          History
        </Text>

        <Text style={styles.title}>
          {this.props.champInfo.lore}
        </Text>

        <Text style={styles.section}>
          Habilities
        </Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    marginTop: 7,
    textAlign: 'center',
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  blurp: {
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    paddingLeft: 16,
  },
  section: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  scrollView: {
    backgroundColor: '#000000',
  },
  horizontalScrollView: {
    height: 310,
  },
  wrapperSkin: {
    width: 124,
    height: 224,
  },
  listView: {
    height: 250,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 3,
  },
});


module.exports = DetailChampion;

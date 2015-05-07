var React = require('react-native');

var REQUEST_IMAGE_SPELL = 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/spell/'

var {
  View,
  Text,
  Image,
  StyleSheet,
} = React;


var Habilities = React.createClass({
  render: function() {
    var urlImage = REQUEST_IMAGE_SPELL + this.props.spell.image.full;

    return (
      <View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{uri: urlImage}}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{this.props.spell.name}</Text>
            <Text style={styles.cost}>
              {this.props.spell.costType}: {this.props.spell.costBurn}
            </Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text>{this.props.spell.description}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    paddingTop: 3,
  },
  name: {
    fontSize: 16,
  },
  cost: {
    fontSize: 12,
  },
  description: {
    flex: 1,
    fontSize: 13,
  },
  rightContainer: {
    flex: 1,
  },
  image: {
    width: 44,
    height: 44,
  },
});


module.exports = Habilities;

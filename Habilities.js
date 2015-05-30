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
      <View style={styles.wrapperContainer}>
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
          <Text style={styles.textDescription}>   {this.props.spell.description}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    margin: 4,
  },
  wrapperContainer: {
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  name: {
    fontSize: 18,
    paddingLeft: 8,
  },
  cost: {
    fontSize: 12,
    paddingLeft: 8,
    paddingTop: 4,
    fontStyle: 'italic',
  },
  description: {
    flex: 1,
    paddingLeft: 4,
    paddingBottom: 4,

  },
  textDescription: {
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
  },
  image: {
    padding: 8,
    width: 44,
    height: 44,
    borderWidth: 4,
    borderColor: '#000000',
  },
});


module.exports = Habilities;

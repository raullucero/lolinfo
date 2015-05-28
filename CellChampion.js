var React = require('react-native');

var REQUEST_IMAGE_CHAMP_SMALL = 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/';

var {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
} = React;

'use strict';

CellChampion = React.createClass({

  render: function() {
    if(this.props.champion.name.indexOf(this.props.filter) === -1 && this.props.filter !== ''){
      return;
    }

    var urlImage = REQUEST_IMAGE_CHAMP_SMALL + this.props.champion.image.full;

    this.props.champion.title = this.props.champion.title.replace(
      /^[a-z]/, function(m){
        return m.toUpperCase()
       }
    );

    return (
      <View>
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: urlImage}}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.name}>{this.props.champion.name}</Text>
              <Text style={styles.title}>{this.props.champion.title}</Text>
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

module.exports = CellChampion;

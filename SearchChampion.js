var React = require('react-native');

var {
  View,
  TextInput,
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

'use strict';

var SearchChampion = React.createClass({

  render: function() {
    return (
      <View
        style={styles.searchBar} >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={this.props.onSearchChange}
          placeholder="Search a champion"
          //onFocus={this.props.onFocus}
          style={styles.searchBarInput}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor='#99d9f4'
          onPress={this.props.showFreeRotation}>
            <Text style={styles.buttonText}>
              Free
            </Text>
        </TouchableHighlight>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    height: 36,
    fontSize: 18,
    flex: 4,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 30,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#051980',
    borderColor: '#0C33F4',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = SearchChampion;

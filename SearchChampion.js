var React = require('react-native');

var {
  View,
  TextInput,
  ActivityIndicatorIOS,
  StyleSheet,
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
    flex: 1,
  },
});

module.exports = SearchChampion;

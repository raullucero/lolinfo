/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Menu = require('./Menu');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var lolinfo = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'LolInfo',
          component: Menu,
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('lolinfo', () => lolinfo);

module.exports = lolinfo;

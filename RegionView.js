'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} = React;

class RegionView extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.guid !== r2.guid}
        );
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.currency)
        };
    }

    rowPressed(key) {
    var currency = this.props.currency
      .filter(prop => prop.key === key)[0];

    this.props.onSelect(key);
    this.props.navigator.pop();
  }

  renderRow(rowData, sectionID, rowID) {
                console.log(rowData);
    return (
        <TouchableHighlight onPress={() => this.rowPressed(rowData.key)}
          underlayColor='#dddddd'>
          <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                  {rowData.name}
                </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
        </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', //flex-start, flex-end, center, stretch
  },
    separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

module.exports = RegionView;
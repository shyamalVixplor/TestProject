import React from 'react';
import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';

const Home = () => {
  const [status, setStatus] = React.useState('');
  const [stateData, setStateData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  const getStateData = async () => {
    try {
      setStatus('in progress');
      const response = await fetch(
        'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest',
      );
      const json = await response.json();
      setStateData(json?.data);
      const accOrder = json?.data?.sort((a, b) => {
        return b?.Population - a?.Population;
      });
      setFilteredDataSource(accOrder);
      setStatus('Completed');
    } catch (error) {
    } finally {
    }
  };

  React.useState(() => {
    getStateData();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={styles.mainCardView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 12}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              State: {item.State}
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: '85%',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 12,
                }}>
                Population: {item.Population}
              </Text>
            </View>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: '85%',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 12,
                }}>
                Year: {item.Year}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = stateData?.filter(function (item) {
        const itemData = item.State
          ? item?.State?.toUpperCase()
          : ''.toUpperCase();
        const textData = text?.toUpperCase();
        return itemData?.indexOf(textData) > -1;
      });
      const descOrder = newData?.sort((a, b) => {
        return a?.Population - b?.Population;
      });
      setFilteredDataSource(descOrder);
      setSearch(text);
    } else {
      const accOrder = stateData?.sort((a, b) => {
        return b?.Population - a?.Population;
      });
      setFilteredDataSource(accOrder);
      setSearch(text);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Filter"
      />
      <Text style={styles.statusText}>{status}</Text>
      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={item => item.Population}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
  },
  statusText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

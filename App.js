/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

import {BottomSheet} from 'react-native-btr';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
const App = () => {
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={toggleBottomNavigationView}
        title="Select Delivery Option"
      />
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                padding: 15,
                color: 'black',
              }}>
              Select a delivery option
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  marginBottom: 10,
                }}>
                <Text>Deliver now | ₹ 25</Text>
                <Text>Get in next 15 - 20 mins</Text>
              </View>

              <BouncyCheckbox
                size={25}
                fillColor="green"
                unfillColor="white"
                iconStyle={{borderColor: 'green'}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                isChecked={isChecked2}
                onPress={() => {
                  setIsChecked2(!isChecked2);
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  marginBottom: 10,
                }}>
                <Text>Deliver now | ₹ 25</Text>
                <Text>Get in next 15 - 20 mins</Text>
              </View>

              <BouncyCheckbox
                size={25}
                fillColor="green"
                unfillColor="white"
                iconStyle={{borderColor: 'green'}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                isChecked={isChecked}
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text>Sub Total</Text>
              <Text>₹ 85</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text>Delivery partner fee</Text>
              <Text>₹ 26</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              padding: 15,
              alignItems: 'center',
              margin: 20,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              Make payment 110{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 400,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default App;

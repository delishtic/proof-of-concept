/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const HEADER_MAX_HEIGHT = 120; // blue
const HEADER_MIN_HEIGHT = 80; // red
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; // green
const LOREM_IPSUM = `The standard Lorem Ipsum passage, used since the 1500s
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
1914 translation by H. Rackham
"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`;

const App = () => {
  const scroll = useRef(new Animated.Value(0)).current;
  const headerDiffClamp = Animated.diffClamp(scroll, 0, HEADER_SCROLL_DISTANCE);
  const translateHeader = Animated.multiply(headerDiffClamp, -1);
  const translateHeaderText = Animated.multiply(translateHeader, -1.5);
  const fadeOut = headerDiffClamp.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerText = (
    <Animated.Text
      style={[
        styles.headerText,
        {transform: [{translateY: translateHeaderText}]},
      ]}>
      Gangotree
    </Animated.Text>
  );

  const fadingOutText = (
    <>
      <Animated.Text style={[styles.fadingOutText, {opacity: fadeOut}]}>
        Street Food, Desserts
      </Animated.Text>
      <Animated.Text style={[styles.fadingOutText, {opacity: fadeOut}]}>
        Chennai | 1.7 Kms
      </Animated.Text>
    </>
  );

  const animatedHeader = (
    <Animated.View
      style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
      {headerText}
      {fadingOutText}
    </Animated.View>
  );

  const animatedScrollView = (
    <Animated.ScrollView
      contentContainerStyle={styles.scrollView}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scroll}}}], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={1}>
      <Text>{LOREM_IPSUM}</Text>
    </Animated.ScrollView>
  );
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {animatedHeader}
      {animatedScrollView}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 400,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: HEADER_MAX_HEIGHT,
    padding: 10,
    paddingTop: Platform.OS==='ios' ? 30 : 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  fadingOutText: {
    fontSize: 18,
  },
  scrollView: {
    backgroundColor: '#7FD8DD',
    marginTop: HEADER_MAX_HEIGHT,
    padding: 20,
  },
});

export default App;

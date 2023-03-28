import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import Header from './src/Header';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { SafeAreaProvider , SafeAreaView} from 'react-native-safe-area-context';
import Profile from './src/Profile';
import { friendProfiles, myProfile } from './src/data';
import Division from './src/Division';
import Margin from './src/Margin';
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';
import { useState } from 'react';
import TabBar from './src/TabBar';

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

//console.log(`${Platform.OS}: ${statusBarHeight}, ${bottomSpace}`);

export default function App() {
  const [selectedTabIdx,setSelectedTabIdx] = useState(0);

  const [isOpened, setIsOpened] = useState(true);
  
  const onPressArrow = () => {
    //console.log.apply('clicked!');
    setIsOpened(!isOpened);
  }
  const ItemSeparatorComponent = () => <Margin height={13} />
  const renderItem = ({item}) => (
    <View>
      <Profile
        uri = {item.uri}
        name={item.name}
        introduction = {item.introduction}
        isMe={false}
      />
    </View>
  )
  const ListHeaderComponent = () => (
    <View style={{ backgroundColor:"white"}}>
      <Header />
        
        <Margin height={10} />
        
        <Profile 
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
          isMe={true}
        />
        
        <Margin height={15} />
        
        <Division />

        <Margin height={12}/>

        <FriendSection 
          friendProfileLen = {friendProfiles.length}
          onPressArrow={onPressArrow}
          isOpened={isOpened}
        />
        
        <Margin height={5}/>
    </View>
  )
  const ListFooterComponent = () => <Margin height = {10}/>

  return (
    <View style={styles.container}>
      <FlatList 
        data={isOpened ? friendProfiles : []}
        contentContainerStyle = {{paddingHorizontal : 15}}
        keyExtractor={(_, index ) => index}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent = {ItemSeparatorComponent}
        renderItem = {renderItem}
        ListHeaderComponent = {ListHeaderComponent}
        ListFooterComponent = {ListFooterComponent}
      />
      <TabBar 
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx = {setSelectedTabIdx}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={{flex:1, paddingHorizontal : 15}}>
        <Header />
        
        <Margin height={10} />
        
        <Profile 
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
        />
        
        <Margin height={15} />
        
        <Division />

        <Margin height={12}/>

        <FriendSection 
          friendProfileLen = {friendProfiles.length}
          onPressArrow={onPressArrow}
          isOpened={isOpened}
        />

        <FriendList
          data={friendProfiles}
          isOpened={isOpened}
        />
      </View>

      <TabBar 
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx = {setSelectedTabIdx}
      />
      

    </View>
    /*<SafeAreaProvider>
      <SafeAreaView edges={['right','left']} style={styles.container}>
        <Header/>
      </SafeAreaView>
      {/*<View style={styles.container}>
        <Header />
      </View>}
    </SafeAreaProvider>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: '#fff',
    //justifyContent : "flex-end",
  },
});

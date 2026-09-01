import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer,DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LanguageProvider} from './src/i18n';
import {navigationRef} from './src/navigation/router';
import Home from './src/screens/Home';
import People from './src/screens/People';
import More from './src/screens/More';
import Categories from './src/screens/Categories';
import Connections from './src/screens/Connections';
import Companies from './src/screens/Companies';
import Explore from './src/screens/Explore';
import Notifications from './src/screens/Notifications';
import Settings from './src/screens/Settings';
import TelegramBot from './src/screens/TelegramBot';
import About from './src/screens/About';
import NewContact from './src/screens/NewContact';
import ContactDetail from './src/screens/ContactDetail';

const Stack=createNativeStackNavigator();
const Tabs=createBottomTabNavigator();
const AppDarkTheme={...DarkTheme,colors:{...DarkTheme.colors,background:'#0B0D17',card:'#141829',text:'#FFFFFF',border:'#1F2544',primary:'#7C5CFC'}};

function MainTabs(){return <Tabs.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:'#7C5CFC',tabBarInactiveTintColor:'#5A5F73',tabBarStyle:{backgroundColor:'#141829',borderTopColor:'#1F2544'},tabBarLabelStyle:{fontSize:11,fontWeight:'700'}}}><Tabs.Screen name="Home" component={Home} options={{title:'Home',tabBarIcon:()=>null}}/><Tabs.Screen name="People" component={People} options={{title:'People',tabBarIcon:()=>null}}/><Tabs.Screen name="More" component={More} options={{title:'More',tabBarIcon:()=>null}}/></Tabs.Navigator>}

export default function App(){return <SafeAreaProvider><LanguageProvider><NavigationContainer ref={navigationRef} theme={AppDarkTheme}><Stack.Navigator initialRouteName="MainTabs" screenOptions={{headerShown:false,animation:Platform.OS==='android'?'none':'slide_from_right'}}><Stack.Screen name="MainTabs" component={MainTabs}/><Stack.Screen name="Categories" component={Categories}/><Stack.Screen name="Connections" component={Connections}/><Stack.Screen name="Companies" component={Companies}/><Stack.Screen name="Explore" component={Explore}/><Stack.Screen name="Notifications" component={Notifications}/><Stack.Screen name="Settings" component={Settings}/><Stack.Screen name="TelegramBot" component={TelegramBot}/><Stack.Screen name="About" component={About}/><Stack.Screen name="NewContact" component={NewContact}/><Stack.Screen name="ContactDetail" component={ContactDetail}/></Stack.Navigator></NavigationContainer></LanguageProvider></SafeAreaProvider>}

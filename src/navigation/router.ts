import {createNavigationContainerRef,useFocusEffect as nativeUseFocusEffect,useRoute} from '@react-navigation/native';
export const navigationRef=createNavigationContainerRef<any>();
const routes:Record<string,string>={'/':'MainTabs','/people':'MainTabs','/categories':'Categories','/more':'MainTabs','/connections':'Connections','/companies':'Companies','/explore':'Explore','/notifications':'Notifications','/settings':'Settings','/telegram-bot':'TelegramBot','/about':'About','/contact/new':'NewContact'};
function go(target:any){if(!navigationRef.isReady())return;const path=typeof target==='string'?target:target?.pathname;if(!path)return;const clean=path.split('?')[0];if(clean.startsWith('/contact/'))return navigationRef.navigate('ContactDetail',{id:clean.split('/')[2]});if(clean==='/people')return navigationRef.navigate('MainTabs',{screen:'People'});if(clean==='/categories')return navigationRef.navigate('Categories');if(clean==='/more')return navigationRef.navigate('MainTabs',{screen:'More'});const r=routes[clean];if(r==='MainTabs')return navigationRef.navigate('MainTabs',{screen:'Home'});if(r)return navigationRef.navigate(r)}
export const router={push:go,navigate:go,replace:go,back:()=>{if(navigationRef.isReady()&&navigationRef.canGoBack())navigationRef.goBack()}};
export function useRouter(){return router}
export function useLocalSearchParams<T extends Record<string,any>>(){return (useRoute<any>().params||{}) as T}
export const useFocusEffect=nativeUseFocusEffect;

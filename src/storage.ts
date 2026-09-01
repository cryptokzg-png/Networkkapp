import AsyncStorage from '@react-native-async-storage/async-storage';

export type Interaction={id:string;type:string;note:string;date:string};
export type Contact={id:string;name:string;company:string;role:string;roles?:string[];topics?:string[];networkType?:string;tags?:string[];phone:string;email:string;telegram:string;twitter:string;website:string;tag:string;note:string;followUpDate?:string;reminderMinutes?:number;reminderChannel?:'telegram'|'push'|'both'|'none';interactions?:Interaction[]};
export type TelegramSettings={token:string;chatId:string;topicId:string;connected:boolean};
const KEY='network_contacts_v1';
const TELEGRAM_KEY='network_telegram_v1';
export const seedContacts:Contact[]=[{id:'1',name:'Ahmet Yılmaz',company:'ABC Teknoloji',role:'Founder',roles:['Founder / CEO'],topics:['Partnerships','Investment'],networkType:'Partner',tags:['VIP'],phone:'',email:'',telegram:'',twitter:'',website:'',tag:'VIP',note:''},{id:'2',name:'Mehmet Kaya',company:'Kaya Digital',role:'BD Manager',roles:['BD Manager','CEX BD'],topics:['Exchanges','Listing'],networkType:'Service Provider',tags:['Potential Client'],phone:'',email:'',telegram:'',twitter:'',website:'',tag:'Business',note:''},{id:'3',name:'Ayşe Demir',company:'Demir Ventures',role:'Investor',roles:['Investor / VC'],topics:['Investment','Partnerships'],networkType:'Investor',tags:['Trusted'],phone:'',email:'',telegram:'',twitter:'',website:'',tag:'Investor',note:''}];
export async function loadContacts():Promise<Contact[]>{const raw=await AsyncStorage.getItem(KEY);if(!raw){await AsyncStorage.setItem(KEY,JSON.stringify(seedContacts));return seedContacts}try{return JSON.parse(raw) as Contact[]}catch{return seedContacts}}
export async function saveContacts(contacts:Contact[]){await AsyncStorage.setItem(KEY,JSON.stringify(contacts))}
export async function getContact(id:string){const contacts=await loadContacts();return contacts.find(c=>c.id===id)??null}
export async function loadTelegramSettings():Promise<TelegramSettings>{const raw=await AsyncStorage.getItem(TELEGRAM_KEY);if(!raw)return {token:'',chatId:'',topicId:'',connected:false};try{return {...{token:'',chatId:'',topicId:'',connected:false},...JSON.parse(raw)}}catch{return {token:'',chatId:'',topicId:'',connected:false}}}
export async function saveTelegramSettings(settings:TelegramSettings){await AsyncStorage.setItem(TELEGRAM_KEY,JSON.stringify(settings))}

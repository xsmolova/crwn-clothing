import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAK9ouyH8_POnaZ_hLUb1hfSK05GwIr4ws",
    authDomain: "crown-db-275ad.firebaseapp.com",
    databaseURL: "https://crown-db-275ad.firebaseio.com",
    projectId: "crown-db-275ad",
    storageBucket: "crown-db-275ad.appspot.com",
    messagingSenderId: "87186932578",
    appId: "1:87186932578:web:5979cb5b02dc58fab5a23b",
    measurementId: "G-CPZZMEZ96M"
};

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth)return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    //create user if not
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(err){
            console.log('error creating user', err.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// we want to trigger the google auth popup whenever we use GoogleAuthProvider
provider.setCustomParameters({ prompt: 'select_account' });

//popup can be twitter, google...
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
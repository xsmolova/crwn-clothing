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

firebase.initializeApp(config);

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    // batch write - 1 big call to firebase
    const batch = firestore.batch();

    //add documents to collection in batch
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    // fire batch write
    return await batch.commit();
}

export const convertCollectionsSnpshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(  doc =>{ 
        const {title, items} = doc.data()
    
        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

// we want to trigger the google auth popup whenever we use GoogleAuthProvider
googleProvider.setCustomParameters({ prompt: 'select_account' });

//popup can be twitter, google...
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
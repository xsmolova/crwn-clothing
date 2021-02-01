import { takeLatest, call, put , all} from 'redux-saga/effects';

import { firestore, convertCollectionsSnpshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsFailure, fetchCollectionsSuccess } from "./shop.actions";
import { ShopActionTypes } from './shop.types';



export function* fetchCollectionsAsync() {
    // yield console.log('Im fired');

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnpshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSaga(){
    yield all([
        call(fetchCollectionsStart)
    ]); 
}
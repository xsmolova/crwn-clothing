import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnpshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        // whenever the collectionRef updates or code gets run for the first time,
        // this collectionRef send us the snapshot representing the code of our
        // collection objects array at the time when this code renders
       
        /*  this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnpshotToMap(snapshot);
            updateCollections(collectionsMap)
            this.setState({loading:false});
        }); */

        // we can use this but page wouldnt be refreshed with new data
        // since we are not subscribing on event onSnapshot. It will be filled with data only on componentDidMount 
    
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnpshotToMap(snapshot);
            updateCollections(collectionsMap)
            this.setState({loading:false});
        });

        // Making rest calls - firestore https://firebase.google.com/docs/firestore/use-rest-api
        
        /* fetch('https://firestore.googleapis.com/v1/projects/crown-db-275ad/databases/(default)/documents/collections')
        .then(response => response.json())
        .then(collections => console.log(collections)); */
    }

    componentWillUnmount() {

    }


    render() {
        const { match } = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>}></Route>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}></Route>
            </div>
        );
    }

}


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);
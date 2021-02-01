import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import {selectCurrentUser} from './redux/user/user.selectors';
//import {selectCollectionsForPreview } from './redux/shop/shop.selectors' ;

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    //auth.onAuthStateChanged returns a function we can call to close subscription 
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
          
    //           id: snapShot.id, 
    //           ...snapShot.data()
    //       })
    //     });
    //   }
    //   else{
    //     setCurrentUser(userAuth);
    //   }
       
      //return array of just objects we want to keep - set collection
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}))) ;
    
   // });
  }

  componentWillUnmount() {
    // closing subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //collectionsArray: selectCollectionsForPreview
});

export default connect(mapStateToProps)(App);
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors.js';
import WithSpinner from '../with-spinner/with-spinner.component.jsx';
import CollectionsOverview from './collections-overview.component.jsx';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
});

// this is pretty hard to read
//const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

// using compose instead - evaluate curried functions
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
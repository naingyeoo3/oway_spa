import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';

// import * as serviceWorker from './serviceWorker';
import App from './containers/App';
import { rootEpic } from './epics';
import { rootReducer } from './reducers';
import { loadState, saveState } from './localStorage'

import './containers/App/app.scss';
import 'react-dates/initialize';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionSanitizer,
      stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
    }) : compose;      

const actionSanitizer = () => { console.log( 'action')}

const persistedState = loadState();

var enhancer = null
if(process.env.NODE_ENV === 'production'){  
  enhancer = compose(applyMiddleware(epicMiddleware));
}else{
  enhancer = composeEnhancers(
    applyMiddleware(epicMiddleware)  
  );
}

const store = createStore(rootReducer, persistedState, enhancer);
store.subscribe(()=> {
  saveState({
    navbarOptions: store.getState().navbarOptions,
    locales: store.getState().locales,
    formReducer: store.getState().formReducer,
    searchComponentReducers: store.getState().searchComponentReducers,
    tourTravellerInfo: store.getState().tourTravellerInfo,
    flightsListing : store.getState().flightsListing,
    paymentReducer : store.getState().paymentReducer,
    bookingReducer : store.getState().bookingReducer,
    checkoutReducer : store.getState().checkoutReducer,
    orderReducer : store.getState().orderReducer,
    tourListing : store.getState().tourListing,
    hotelsListing: store.getState().hotelsListing,
    hotelCheckoutReducer: store.getState().hotelCheckoutReducer,
    hotelReservation: store.getState().hotelReservation,
    busListing: store.getState().busListing    
    });
})
epicMiddleware.run(rootEpic);

ReactDOM.render(    
  <Provider store={store}>
    <ConnectedRouter history={history}>      
        <App />      
    </ConnectedRouter>
  </Provider>,    
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

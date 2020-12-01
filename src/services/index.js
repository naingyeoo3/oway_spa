/**
 * Mocking client-server processing
 */
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import _products from './products'
import { Observable } from 'rxjs/Observable'
import { API_URL, API_KEY } from '../constants/credentials';

const TIMEOUT = 100;
const MAX_CHECKOUT = 2; // max different items

/* eslint-disable */
require('es6-promise').polyfill(); 
/* eslint-disable */
require('isomorphic-fetch'); 

export const api = {
  getProducts() {
    return new Observable(observer => {
      const timerId = setTimeout(() => {
        observer.next(_products);
        observer.complete();
      }, TIMEOUT);
      return () => clearTimeout(timerId);
    });
  },

  buyProducts(cart) {
    return new Observable(observer => {
      const timerId = setTimeout(() => {
        if(Object.keys(cart.quantityById).length <= MAX_CHECKOUT)
          observer.next(cart);
        else
          observer.error(`You can buy ${MAX_CHECKOUT} items at maximum in a checkout`);
        observer.complete();
      }, TIMEOUT);

      return () => clearTimeout(timerId);
    });
  },

  searchAutoComplete(input) {    
    ajax({
      url: `${API_URL}/requestCities`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'        
      },
      body: {
        "apiKey": API_KEY,
        "terms": "yangon"
      }
    }).pipe(
      map(response => console.log('response: ', response)),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      }))
    // fetch(`${API_URL}/requestCities`, {
    //   method: "POST",      
    //   body: JSON.stringify({
    //     "apiKey": API_KEY,
    //     "terms": "yangon"
    //   }),
    //   headers: {        
    //     "Content-Type": "application/json"
    //   }
    // })    
    //   .then(data => data.json())
    //     .then(json => console.log(json));
  }
}

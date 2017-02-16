// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import _ from 'lodash'

// our "constructor"
const create = (baseURL = 'http://127.0.0.1:8001/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      Authorization:'Basic YWRtaW46c2VjcmV0'
    },
    // 10 second timeout...
    timeout: 10000
  });

  // Force OpenWeather API Key on all requests
  // api.addRequestTransform((request) => {
  //   request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  // })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const postTownship = (params) => api.post('township', {
    website: params,
    city:"foster city",
    name:"vishal society 2",
    builder:"pol",
    phone:"6507031447",
    state:"California",
    address:"837 Shell Blvd apt 103",
    email:"nikitph@gmail.com"});

  const getTownship = (params) => api.get('township');

  const postItem = (params) => api.post('item', {
    item_summary: params.item_summary,
    details: params.details,
    price: params.price.toString(),
    sold: params.sold,
    negotiable: params.negotiable,
    building: params.building,
    user: params.user,
    user_name: params.user_name
  });

  const patchItem = (params) => api.patch('item/' + params._id, _.omit(params, ['_id', '_etag']), {headers: {"If-Match": params._etag}});

  const getItem = (params) => api.get('item');

  const postMessage = (params) => api.post('message', {
    building: params.building,
    sender: params.sender,
    sender_name: params.sender_name,
    buyer: params.buyer,
    buyer_name: params.buyer_name,
    seller: params.seller,
    seller_name: params.seller_name,
    text: params.text,
    item: params.item,
    createdAt: params.createdAt,
    user: '{' +
    ' "_id" : "' + params.user._id + '" , "name" : "' + params.user.name + '" }'
  });

  const getMessage = (params) => api.get('message');


  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    postTownship,
    getTownship,
    postItem,
    getItem,
    postMessage,
    getMessage,
    patchItem
  }
};

// let's return back our create method as the default.
export default {
  create
}

// a library to wrap and simplify api calls
import apisauce from 'apisauce'

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
  })

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
    building: "5776e6e9d6827b30a8b72a68",
    item_summary: "test 2",
    price: "500",
    details: "sd",
    sold: true,
    negotiable: false,
    user: "5776b9ddd6827b2fb89e2085"
  });

  const getItem = (params) => api.get('item');

  const postMessage = (params) => api.post('message', {
    building: "5776e6e9d6827b30a8b72a68",
    sender: "",
    sender_name: "",
    buyer: "",
    buyer_name: "",
    seller: "",
    seller_name: "",
    _id: "",
    text: "",
    createdAt: "",
    item: "",
    user: "5776b9ddd6827b2fb89e2085"
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
    getMessage
  }
};

// let's return back our create method as the default.
export default {
  create
}

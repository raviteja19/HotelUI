import * as types from '../actions/actionTypes';
import initialState from '../actions/intialstate';

export  function Landing(state = initialState.Landingpage, action) {
    switch (action.type) {
      
      case types.LandingPage:
        return action.data;
  
      default:
        return state;
    }
  }

  export  function Roomdetails(state = initialState.Landingpage, action) {
    switch (action.type) {
      
      case types.DetailPage:
        return action.data;
  
      default:
        return state;
    }
  }

  export  function ADDHOTEL(state = initialState.Landingpage, action) {
    switch (action.type) {
      
      case types.Addhotel:
        return action.data;
  
      default:
        return state;
    }
  }


  export  function DELETEHOTEL(state = initialState.Landingpage, action) {
    switch (action.type) {
      
      case types.DELETEHOTEL:
        return action.data;
  
      default:
        return state;
    }
  }
import React from 'react'
import {Route,Switch} from 'react-router-dom';
import Header from './Header';
import Confirmation from './Confirmation';
import HotelDetails from './HotelDetails';
import Admin from './Admin';
import  LandingPage from './LandingPage'


export default (
        <div>
        <Header/>
        <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <Route  path="/hoteldetails" component={HotelDetails}></Route>
            <Route  path="/confirmation" component={Confirmation}></Route>
            <Route  path="/admin" component={Admin}></Route>
        </Switch>
        </div>
);
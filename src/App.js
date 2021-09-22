import React from 'react';
import { Container} from '@material-ui/core';
import Navigation from './components/Navigation/Navigation';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
   
  } from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
    return (
       <Router>
        
        <Container maxWidth="xl">
            <Navigation></Navigation>
            <Switch>
            
             <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/auth">
            <Auth />
          </Route> 
            
            

               
               </Switch>
          
        </Container>
       </Router>
       
    );
};

export default App;
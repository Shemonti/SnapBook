import React,{useState,useEffect} from 'react';
import {  AppBar, Typography,Toolbar, Avatar, Button} from '@material-ui/core';
import useStyles from './styles';
import Img from '../../Img/img1.png';
import decode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import {Link,useHistory,useLocation} from 'react-router-dom';
const Navigation = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')));
   
    const logout=() => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setuser(null);
       }
  useEffect(() => {
     const token = user?.token;
     if(token){
         const decodedtoken= decode(token);

         if(decodedtoken.exp * 1000 < new Date().getTime()) logout()
     }
     setuser(JSON.parse(localStorage.getItem('profile')))
    
  }, [location]);


  
    return (
        <AppBar className={classes.appBar}  color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
                    SnapBook
                </Typography>
                <img src={Img} className={classes.image} alt="" height="900" />
             </div>
             <Toolbar className={classes.toolbar}>
             {
    user?(
     <div className={classes.profile}>
         <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
             {user.result.name.charAt(0)}
         </Avatar>
         <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
     <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
     </div>
    ):(
      <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
    )
}
             </Toolbar>
            </AppBar>
    );
};

export default Navigation;




































































































































































































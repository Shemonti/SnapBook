import React,{useState} from 'react';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import emailjs from 'emailjs-com';
import {useDispatch} from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Avatar,Button,Grid,Paper,Typography,Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import {signup,signin} from '../../actions/auth';
const initialState ={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmPassword:'',
};
const Auth = () => {
    const classes = useStyles();
    const [showpassword, setshowpassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formdata, setformdata] = useState(initialState);
     const dispatch = useDispatch();
    const history = useHistory();
    
    
    const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignup){
    dispatch(signup(formdata,history));
    emailjs.sendForm('service_dl3xgrr', 'template_ydjnfad', e.target, 'user_U77VlkHSBxAVnpK57Cqfj')
    .then((result) => {
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
    }
    else{
    dispatch(signin(formdata,history));
    }
    // console.log(formdata)
    }
 
    const handleShowPassword = () => setshowpassword((prevshowpassword)=> !prevshowpassword);

    const handleChange =(e)=>{
     setformdata({...formdata,[e.target.name]: e.target.value})
    }

    const switchMode =()=>{
     setisSignup(!isSignup);
     setshowpassword(false)
    }



    const goggleSuccess =async (res)=>{
      console.log(res);
      const result=res?.profileObj;
      const token = res?.tokenId;
      try {
         dispatch({type:'AUTH',data:{result,token}});
         history.push('/');
      } catch (error) {
          console.log(error);
      }
        
    }
    const goggleFailure =(error)=>{
      console.log(error);
      console.log('Goggle log in unsuccess')
    }
    return (
       <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} >
           <Avatar className={classes.avatar}>
            <LockOutlinedIcon></LockOutlinedIcon>
           </Avatar>
           <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                  isSignup &&(
                      <>
                      <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half></Input>
                      <Input name="lastname" label="Last Name" handleChange={handleChange} autoFocus half></Input>
                      </>
                  )
              }
              <Input  name="email" label="Email Address " handleChange={handleChange} type="email" ></Input>
              <Input  name="password" label="Password" handleChange={handleChange} type={showpassword ? 'text':'password'} handleShowPassword={handleShowPassword} ></Input>
              {
                  isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>
              }
            </Grid>
            
            <Button type="submit" fullWidth  variant="contained" color="primary" className={classes.submit}>
                {
                    isSignup?'Sign Up':'Sign In'
                }
            </Button>
            <GoogleLogin
             
             clientId="1051801715231-rbi9bdbe2li1tbncpqio1sh5qg503odn.apps.googleusercontent.com"
             render={(renderprops)=>(
                 <Button
                 className={classes.googleButton}
                 color="primary"
                 fullWidth
                 onClick={renderprops.onClick}
                
                 startIcon={<Icon/>}
                 variant="contained"
                 >
                     Goggle Sign In
                 </Button>
             )}
             onSuccess={goggleSuccess}
             onFailure={goggleFailure}
             cookiePolicy="single_host_origin"
            />
            <Grid container justify="flex-end">
           <Grid item>
            <Button onClick={switchMode}>
                {
                    isSignup?'Already have an account? Sign In':"Don't have an account?Sign Up"
                }
            </Button>
           </Grid>
            </Grid>
          </form>
          
          </Paper>
       </Container>
    );
};

export default Auth;
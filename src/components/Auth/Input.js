import React from 'react';
import { Grid,TextField,InputAdornment,IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
const Input = ({name,half,label,handleChange,autoFocus,type,handleShowPassword}) => {
    return (
         <Grid item xs={12} sm={half ? 6 :12}>
         <TextField
         name={name}
         onChange={handleChange}
         variant="outlined"
         required 
         fullWidth
         label={label}
         autoFocus={autoFocus}
         type={type}
         InputProps={name === 'password' ? {
             endAdornment:(
                 <InputAdornment position="end">
                     <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                     </IconButton>
                 </InputAdornment>
             ),
         }:null}
      >

         </TextField>
        </Grid>
    );
};

export default Input;
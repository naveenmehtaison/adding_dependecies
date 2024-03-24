import React, { useEffect, useState , useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Authcontext from '../../store/auth-context';
import Input from '../UI/Input';
const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.val,isvalid:action.val.includes('@')}
  }
  if(action.type=='INPUT_BLUR'){
    return{value:state.value, isvalid:state.value.includes('@')}
  }
  return{value:'',isvalid:false}

}
const passReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.val,isvalid:action.val.trim().length>6}
  }
  if(action.type=='INPUT_BLUR'){
    return{value:state.value, isvalid:state.value.trim().length>6}
  }
  return{value:'',isvalid:false}

}
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail]= useReducer(emailReducer,{value:'',isvalid:false})
  const [passState,disaptchpass]=useReducer(passReducer,{value:'',isvalid:false})
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value})
    setFormIsValid(
      passState.value.trim().length > 6 && emailState.value.includes('@')
    );
  };


  const passwordChangeHandler = (event) => {
    disaptchpass({type:'USER_INPUT',val:event.target.value})
    setFormIsValid(
      passState.value.trim().length > 6 
    );

  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})

  };

  const validatePasswordHandler = () => {
    disaptchpass({type:'INPUT_BLUR'})
  };


  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passState.value);
  };
  const authCtx = useContext(Authcontext)
  const {isvalid: emailIsvalid}=emailState
  const{isvalid: passwordIsValid}=passState

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div>
          <Input id='email' label='E-Mail' isvalid={emailIsvalid} value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}/>
        </div>
        <div>
          <Input id='password' label='Password' isvalid={passwordIsValid} value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}/>
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

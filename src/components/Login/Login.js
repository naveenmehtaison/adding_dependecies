import React, { useEffect, useState , useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
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
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail]= useReducer(emailReducer,{value:'',isvalid:false})
  const [passState,disaptchpass]=useReducer(passReducer,{value:'',isvalid:false})
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value})
    setFormIsValid(
      passState.value.trim().length > 6 && emailState.value.includes('@')
    );
  };

  // useEffect(()=>{
  //   const identifier = setTimeout(()=>{
  //     console.log('validity_check')
  //     setFormIsValid(
  //       enteredPassword.trim().length > 6 && enteredEmail.includes('@')&& collegeName.trim().length>0
  //     );
  //   },5000)
  //   return()=>{
  //     console.log('timeout_cleared')
  //     clearTimeout(identifier)

  //   }
  // },[enteredEmail,enteredPassword,collegeName])
  // useEffect(()=>{
  //   console.log('im in use effect')
  // },[enteredPassword])

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
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {/* <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collegename">COllege</label>
          <input
            type="text"
            id="collegename"
            value={collegeName}
            onChange={collegeChangeHandler}
            onBlur={validatecollegenamehandler}
          />
        </div> */}
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

import React,{useEffect,useState} from "react"
const Authcontext= React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}

})
export const AuthContextProvider = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
      const StoredUserLoggedinfo = localStorage.getItem('isLoggedIn')
      if(StoredUserLoggedinfo==='1'){
        setIsLoggedIn(true)
      }
  
    },[]);
    const loginHandler = (email, password) => {
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
      localStorage.setItem('isLoggedIn','1')
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn')
      setIsLoggedIn(false);
    }
    return <Authcontext.Provider value={{isLoggedIn:isLoggedIn, onLogout:logoutHandler,
    onLogin:loginHandler}}>{props.children}</Authcontext.Provider>
}
export default Authcontext
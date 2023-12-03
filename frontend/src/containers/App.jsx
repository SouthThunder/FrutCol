import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {login} from '../redux/userSlice'
import Cookie from "js-cookie";
import Routing from "../navigation/Routes";
//import services methods
import { authToken } from "../services/user";

function App() {
  const [auth, setAuth] = useState(false);
  const firstLoad = useRef(true)
  const dispatch = useDispatch();

  const verifyToken = async () => {
    const res = await authToken(Cookie.get("token"));
    if (res?.status === 200) {
      dispatch(login(res.data));
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  useEffect(() => {
    if(Cookie.get('token') && firstLoad.current){
      verifyToken()
      firstLoad.current = false
    }
  }, []);

  return (
      <Routing authenticated={auth} />
  );
}

export default App;
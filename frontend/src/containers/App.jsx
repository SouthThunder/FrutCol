import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Routing from "../navigation/Routes";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthentication = () => {
    const authToken = Cookies.get("authToken"); 
    if (authToken) {
      // Si la cookie de autenticación existe, marca al usuario como autenticado
      setAuthenticated(true);
    } else {
      // Si la cookie de autenticación no existe, marca al usuario como no autenticado
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
      <Routing authenticated={authenticated} />
  );
}

export default App;
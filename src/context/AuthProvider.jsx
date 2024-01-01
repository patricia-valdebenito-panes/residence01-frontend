import React, { createContext, useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //   console.log(children);
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {

    const authentificationUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        console.log("token token: ",token);

        const { data } = await ClientAxios("/users/perfil", config);
        console.log("data : ",data);
        setAuth(data);

        if (pathname === '/residentes') {
          navigate('/residentes');
        } else if(pathname === '/registro') {
          navigate('/registro');
        } else {
          navigate('/templates');
        }


      } catch (error) {
        console.log("error : ",);
        setAuth({});
        console.log("error : ", error);
        setLoading(false);
      }
      finally {
        console.log("finally : ",);
        setLoading(false);
      }
    };

    authentificationUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

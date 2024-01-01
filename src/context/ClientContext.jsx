import React, { createContext, useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState([]);
  const [alert, setAlert] = useState([]);

  const showAlert = (alert) => {
    setAlert(alert);
    // setTimeout(()=>{
    //   setAlert({});
    // },6000)
  };

  const getClients = async () => {
    try {
      if (!token) {
        console.log("sin token : ");
        return;
      }

      const { data } = await ClientAxios("/client/list-client", config);
      setClients(data);
    } catch (error) {
      console.log("error : ", error);
    }
    // console.log("newTemplate : ",newTemplate);
  };
  
  const getClient = async (_id) => {
    try {
      if (!token) {
        console.log("sin token : ");
        return;
      }

      const { data } = await ClientAxios(`/client/${_id}`, config);
      setClient(data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const editResident = async (newTemplate) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return;
      }
      const { data } = await ClientAxios.put(`/client/editar/${newTemplate._id}`,newTemplate,config);
      setClients([...clients,data]);
      // getClients();
      // navigate('/residentes')
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const submitResident = async (newTemplate) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return;
      }
      const { data } = await ClientAxios.post(`/client/new-client`,newTemplate,config);
      setClients([...clients,data]);
      getClients();
      navigate('/residentes')
    } catch (error) {
      console.log("error : ", error);
    }
  };


  
  useEffect(() => {
    setTimeout(()=>{
      getClients();
    },2000)
  }, []);


  return (
    <ClientContext.Provider
      value={{
        alert,
        client,
        clients,
        editResident,
        getClient,
        showAlert,
        submitResident
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export { ClientProvider };
export default ClientContext;

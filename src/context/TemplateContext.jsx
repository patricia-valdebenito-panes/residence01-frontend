import React, { createContext, useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import { useNavigate, useParams } from "react-router-dom";

const TemplateContext = createContext();

const TemplateProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState({});
  const [templateTC, setTemplateTC] = useState({});
  const [alert, setAlert] = useState([]);
  const [step2, setStep2] = useState("");

  const showAlert = (alert) => {
    setAlert(alert);
    // setTimeout(()=>{
    //   setAlert({});
    // },6000)
  };
  const getTemplates = async () => {
    try {
      if (!token) {
        console.log("sin token : ");
        return;
      }

      const { data } = await ClientAxios("/templates", config);
      setTemplates(data);
    } catch (error) {
      console.log("error : ", error);
    }
    // console.log("newTemplate : ",newTemplate);
  };

  const getTemplate = async (_id) => {

    try {
      if (!token) {
        console.log("sin token : ");
        return;
      }

      const { data } = await ClientAxios(`/templates/${_id}`, config);
      console.log("data getTemplate:", data);
      setTemplate(data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const getTemplateTC = async (_id, type) => {
    setTemplateTC({});
    let url = "";
    try {
      if (!token) {
        console.log("sin token : ");
        return;
      }
      if (!_id || _id === undefined) {
        console.log("sin _id : ");
        return;
      }

      switch (type) {
        case "CT2":
          url = "cambio-de-posicion";
          break;
        case "CT3":
          url = "curaciones";
          break;
        case "CT4":
          url = "vacunas";
          break;
        case "CT5":
          url = "visitas-medicas";
          break;
        case "CT6":
          url = "signos-vitales";
          break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }
      //console.log("type :", type, "url :", url);

      const { data } = await ClientAxios(`/templates/${url}/${_id}`, config);
      console.log("data getTemplateTC:", data);
      setTemplateTC(data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const submitNewTemplate = async (newTemplate) => {
    const { type } = newTemplate;
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        console.log("sin token : ");
        return;
      }

      const { data } = await ClientAxios.post(
        "/templates",
        newTemplate,
        config
      );
      console.log("*type", type);
      console.log("*data", data);
      console.log("*newTemplate", newTemplate);
      switch (type) {
        case "CT2":
          localStorage.setItem("new-template", `${type},${data._id}`);
          navigate("/templates/cambio-de-posicion");
          break;
        case "CT3":
          localStorage.setItem("new-template", `${type},${data._id}`);
          navigate("/templates/curaciones");
          break;
        case "CT4":
          localStorage.setItem("new-template", `${type},${data._id}`);
          navigate("/templates/vacunas");
          break;
        case "CT5":
          localStorage.setItem("new-template", `${type},${data._id}`);
          navigate("/templates/visitas-medicas");
          break;
        case "CT6":
          localStorage.setItem("new-template", `${type},${data._id}`);
          navigate("/templates/signos-vitales");
          break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }
      // actualizar listado de proyectos
      // actualizar state te templates
      setTemplates([...templates, data]);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const submitTemplate = async (newTemplate, url) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return;
      }
      console.log("*type", url);
      const { data } = await ClientAxios.post(
        `/templates/${url}`,
        newTemplate,
        config
      );
      console.log("data submitTemplate", data);
      console.log("*newTemplate", newTemplate);
      localStorage.removeItem("new-template");
      getTemplates();
      navigate("/templates");
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <TemplateContext.Provider
      value={{
        alert,
        getTemplate,
        getTemplateTC,
        showAlert,
        submitNewTemplate,
        submitTemplate,
        template,
        templateTC,
        templates,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export { TemplateProvider };
export default TemplateContext;

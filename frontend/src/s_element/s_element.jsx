import React, { useEffect, useRef, useState } from "react";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import LoadingSpinner from "../loading/LoadingSpinner";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Element = () => {
    return(
        <div className="element">
            <h1>Fuck</h1>
        </div>
    )
};

export const Selement = ({ product }) => {
  const [elements, setElements] = useState(null);
  const [loader, setLoader] = useState(true);
  const firstLoad = useRef(true);
  const {id} = useParams();
  

  useEffect(() => {
    console.log('enter')
    if(firstLoad.current){
        getElements();
        firstLoad.current=false;
    }else{
        if(elements!==null ){
            setLoader(false)
        }
    }
  }, [elements]);

  const getElements = async () => {
    try {
      const URI = `http://localhost:8000/smetadata/${id}`;
      const res = await axios.get(URI);
      setElements(res.data);
    } catch (error) {
        console.error(error);
    }
  };

  if (loader) {
    return <LoadingSpinner />;
  }

  return (
    <div className="selement">
      <Headercom product={product} />
      <Element />
      <Footercom product={product} />
    </div>
  );
};

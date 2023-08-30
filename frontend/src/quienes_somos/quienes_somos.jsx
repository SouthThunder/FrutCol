import React, { useState } from "react";
import "./quienes_somos.css";
import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import { fresa } from "../home/sliderProds";
export const QuienesSomos = (prop) => {
  return (
    <div className="quienesomos containerquienes">
      <h1 className="tittlequienes">FrutCol-A</h1>
      <h3 className="sloganquienes">Apasionante y natural</h3>
      <div className="first containerquienes">
        <h2 className="subtittleQuienes tittlequienes">Quienes Somos</h2>
        <p>
          FrutCol -A SAS es una empresa dedicada a la producción y
          comercialización de pulpa de fruta y otros alimentos 100% naturales.
          Nuestro principal producto es la pulpa de fruta congelada que
          comercializamos bajo nuestra marca FrutCol - A para satisfacer y
          contribuir al bienestar de los diversos consumidores.
        </p>
        <p>
          FrutCol-A es la marca que representa la calidad natural de las frutas
          frescas conservando su aroma, color y sabor original, producida con
          calidad bajo los estándares y lineamientos establecidos para ofrecer
          el mejor producto a nuestros consumidores.
        </p>
      </div>
      <div className="misionvision containerquienes" style={{backgroundColor:prop.prod.compColor}}>
        <div className="mision containerquienes">
          <h2 className="tittlequienes ">Mision</h2>
          <p>
            Producir Pulpa de fruta y otros alimentos 100% naturales usando
            frutas, vegetales, hortalizas y tubérculos de las diferentes
            regiones de nuestro campo colombiano de la mejor calidad, generando
            un impacto positivo en la calidad de vida de los agricultores y
            satisfaciendo a nuestros clientes y asumiendo responsabilidad con el
            cuidado del medio ambiente con las buenas prácticas. Promover
            hábitos saludables en la población, generar empleo favoreciendo el
            desarrollo del campo colombiano.
          </p>
        </div>

        <div className="vision containerquienes">
          <h2 className="tittlequienes ">Vision</h2>
          <p>
            FrutCol – A SAS será una empresa consolidada con reconocimiento
            nacional e internacional por la producción y comercialización de
            pulpa de frutas congeladas y otros alimentos naturales con los más
            altos estándares de calidad en todos y cada uno de sus procesos.
            Estará comprometida con las buenas practicas ambientales y en el
            desarrollo de hábitos saludables y de mejoramiento continuo en sus
            procesos y de fortalecimiento en el desarrollo del campo colombiano.
          </p>
        </div>
      </div>
      <div className="values " >
        {/* <h2 className="tittlequienes">Valores</h2> */}
        <div class="animated-title">
          <div class="text-top">
            <div>
            <span>Ética</span>
            <span>Respeto</span>
            <span>Responsabilidad</span>
            <span>Calidad</span>
            <span>Honestidad</span>
            <span>Solidaridad</span>
            </div>
          </div>
          <div class="text-bottom">
            <div>Estos son nuestros valores</div>
          </div>
        </div>
      </div>
      <div className="objectives containerquienes" style={{backgroundColor:prop.prod.compColor}}>
        <h2 className="tittlequienes">Objetivos</h2>
        <ul className="objectives__list">
          <li>
            <p>
              {" "}
              Garantizar el procesamiento del producto con estándares de
              calidad.
            </p>
          </li>
          <li>
            <p>
              Ofrecer al mercado un producto con calidad, capaz de satisfacer
              las necesidades de los consumidores.
            </p>
          </li>
          <li>
            <p>Fomentar hábitos de vida saludable.</p>
          </li>
          <li>
            <p>
              Motivar al cuidado y responsabilidad con el medio ambiente, dando
              uso adecuado de los recursos utilizados.
            </p>
          </li>
          <li>
            <p>Favorecer el desarrollo alimentario del campo colombiano</p>
          </li>
          <li>
            <p>Crear fuentes de empleo, apoyando las nuevas generaciones.</p>
          </li>
          <li>
            <p>
              Posicionar a FrutCol-A como la marca líder del mercado con
              reconocimiento a nivel mundial.
            </p>
          </li>
        </ul>
      </div>
    
      <div className="qualitypolicies containerquienes">
        <h2 className="tittlequienes">Politicas de Calidad</h2>
        <p>
          FrutCol-A Establece una política de calidad basada en la normativa
          nacional y en las mejores prácticas higiénico-sanitarias, dando
          cumplimiento a las exigencias de las entidades de control
          correspondientes. Con el propósito de procesar, producir y
          comercializar la pulpa de fruta, con los mejores estándares de
          calidad, para satisfacer y cumplir con las necesidades de nuestros
          consumidores, bajo el principio de optimización y mejora continua en
          todos nuestros procesos.
        </p>
      </div>
    </div>
  );
};

export const QuienesSomoscom = (prop) => {
  const [product, setProduct] = useState(fresa);
  const changeProp = (element) => {
    setProduct(element);
  };

  return (
    <div className="QuienesSomoscontain" >
      <Headercom prod={product} />
      <QuienesSomos prod={product} />
      <Footercom prod={product} />
    </div>
  );
};

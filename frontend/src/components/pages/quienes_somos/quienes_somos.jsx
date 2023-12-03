import React, { useEffect } from "react";
import "./quienes_somos.css";

export const QuienesSomos = ({ product }) => {
  return (
    <div className="quienesomos containerquienes">
      <h1 className="tittlequienes" style={{ color: product.main_color }}>
        FrutCol-A
      </h1>
      <h3 className="sloganquienes">Apasionante y Natural</h3>
      <div className="first containerquienes">
        <h2
          className="subtittleQuienes tittlequienes"
          style={{ color: product.main_color }}
        >
          Quienes Somos
        </h2>
        <p>
          FructCol – A SAS es una empresa colombiana del sector agroindustrial
          dedicada al procesamiento y comercialización de pulpa de frutas de
          óptima calidad 100% natural.
        </p>
      </div>
      <div
        className="misionvision containerquienes"
        style={{ backgroundColor: product.comp_color }}
      >
        <div className="mision containerquienes">
          <h2 className="tittlequienes" style={{ color: product.main_color }}>
            Misión
          </h2>
          <p>
            Producir y comercializar pulpa de frutas de óptima calidad 100%
            natural, sin aditivos ni conservantes, bajo el concepto de ALIMENTO
            SALUDABLE con buenas prácticas de manufactura y de
            economía circular.
          </p>
        </div>

        <div className="vision containerquienes">
          <h2 className="tittlequienes" style={{ color: product.main_color }}>
            Visión
          </h2>
          <p>
            FrutCol – A SAS será una empresa consolidada con reconocimiento
            nacional e internacional por la producción y comercialización de
            pulpa de frutas congeladas 100% natural con los más altos estándares
            de calidad en todos y cada uno de sus procesos.
          </p>
        </div>
      </div>
      <div
        className="objectives containerquienes"
        style={{ backgroundColor: "white" }}
      >
        <h2 className="tittlequienes" style={{ color: product.main_color }}>
          Beneficios
        </h2>
        <ul className="objectives__list">
          <li>
            <p>
              La pulpa de fruta fresca envasada y congelada conserva sus
              nutrientes, sabor, aroma y color de la fruta de la cual es
              extraída.
            </p>
          </li>
          <li>
            <p>
              La pulpa de fruta se utiliza para la elaboración de jugos
              naturales, batidos, heladería, confitería, refrescos, conservas,
              postres, cocteles, mermeladas, etc.
            </p>
          </li>
          <li>
            <p>
              Usar pulpa de fruta optimiza y ahorra tiempo en el proceso de
              elaboración de los diferentes productos, economiza dinero y evita
              desperdicios
            </p>
          </li>
          <li>
            <p>Permite disfrutar de ciertas frutas fuera de temporada.</p>
          </li>
          <li>
            <p>
              Consumir frutas contribuye a mantener hábitos de vida saludable.
            </p>
          </li>
          <li>
            <p>
              Contribuir en la cadena de producción y desarrollo del campo
              colombiano.
            </p>
          </li>
        </ul>
      </div>
      <div className="values ">
        <h1 className="tittlequienes" style={{ color: product.main_color }}>
          Valores
        </h1>
        <div className="holder">
        <picture>
      <source srcSet="./images/Frame1.avif" type="image/avif"/>
      <source srcSet="./images/Frame1.webp" type="image/webp"/>
      <img src="./images/Frame1.png" alt="Logo" />
    </picture>
          <div
            className="container"
            style={{ backgroundColor: product.header_color }}
          >
            <h2 className="tittlequienes">COMPROMISO</h2>
            <p>Hacer todo bien con honestidad</p>
          </div>
          <div
            className="container"
            style={{ backgroundColor: product.header_color }}
          >
            <h2 className="tittlequienes">CONFIANZA</h2>
            <p>Convicción propia para alcanzar los objetivos trazados</p>
          </div>
          <div
            className="container"
            style={{ backgroundColor: product.header_color }}
          >
            <h2 className="tittlequienes">EXCELENCIA</h2>
            <p>
              Obtener la máxima eficacia en la gestión para obtener los mejores
              resultados
            </p>
          </div>
          <div
            className="container"
            style={{ backgroundColor: product.header_color }}
          >
            <h2 className="tittlequienes">ÉTICA EMPRESARIAL</h2>
            <p>
              Fomentar la convivencia y ambiente laboral con respeto y libertad
            </p>
          </div>
        </div>
      </div>
      <div
        className="objectives containerquienes"
        style={{ backgroundColor: product.comp_color }}
      >
        <h2 className="tittlequienes" style={{ color: product.main_color }}>
          Objetivos
        </h2>
        <ul className="objectives__list">
          <li>
            <p>
              Garantizar el procesamiento del producto con buenas practica de
              manufactura (BPM)
            </p>
          </li>
          <li>
            <p>
              Ofrecer un producto de la mejor calidad para que nuestros clientes
              disfruten de los beneficios que aportan las frutas.
            </p>
          </li>
          <li>
            <p>Fomentar hábitos de vida saludable.</p>
          </li>
          <li>
            <p>
              Contribuir al desarrollo de nuestro país generando empleo en todos
              nuestros procesos de producción.
            </p>
          </li>
          <li>
            <p>
              Fomentar voluntariamente el cuidado del medio ambiente
              adaptándonos a la aplicación del modelo de economía circular
              (Extraer – Consumir – Desechar)
            </p>
          </li>
          <li>
            <p>
              Posicionar a FrutCol-A SAS como la marca líder del mercado con
              reconocimiento a nivel nacional e internacional.
            </p>
          </li>
        </ul>
      </div>

      <div className="qualitypolicies containerquienes">
        <h2 className="tittlequienes" style={{ color: product.main_color }}>
          Politicas de Calidad
        </h2>
        <p>
          FrutCol-A SAS establece una política de calidad basada en la normativa
          nacional y en las mejores prácticas higiénico-sanitarias, dando
          cumplimiento a las exigencias de las entidades de control
          correspondientes, con el propósito de procesar, producir y
          comercializar la pulpa de fruta, para satisfacer y cumplir con las
          necesidades de nuestros consumidores, bajo el principio de
          optimización y mejora continua en todos nuestros procesos.
        </p>
      </div>
    </div>
  );
};

export const QuienesSomoscom = ({ product }) => {
  useEffect(() => {}, [product]);

  return (
    <div className="QuienesSomoscontain">
      <QuienesSomos product={product} />
    </div>
  );
};

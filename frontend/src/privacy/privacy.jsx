import { Headercom } from "../header/header";
import { Footercom } from "../footer/footer";
import "./privacy.css";

export const PrivacyComp = ({product, lProductos, prodsPool, updateLProducts}) => {
  return (
    <div>
      <Headercom product={product} lProductos={lProductos} prodsPool={prodsPool} updateLProducts={updateLProducts}/>
      <Privacy/>
      <Footercom product={product} />
    </div>
  )
}

export const Privacy = () => {
  return (
    <div className="privacy">
      <div className="container">
        <h1>AUTORIZACIÓN DE TRATAMIENTO PROTECCIÓN DE DATOS PERSONALES</h1>
        <div className="privacy-content">
          <p>
            Dando cumplimiento a lo dispuesto en la Ley 1581 de 2012, "Por el
            cual se dictan disposiciones generales para la protección de datos
            personales" y de conformidad con lo señalado en el Decreto 1377 de
            2013, y las demás normas aplicables sobre protección de Datos
            Personales de conformidad con lo establecido en el artículo 17 de la
            Ley 1581 de 2012 y los artículos 21 y 22 del Decreto 1377 de 2013,
            con la firma de este documento manifiesto que he sido informado por
            FrutCol – A SAS identificada con NIT 901733392-6 ubicada en la calle
            150 A No. 48-76 Of 501 de la ciudad de Bogotá de lo siguiente:
          </p>
          <ol>
            <li>
              FrutCol – A SAS actuará como responsable del Tratamiento de datos
              personales de los cuales soy titular y que, conjunta o
              separadamente podrá recolectar, usar y tratar mis datos personales
              conforme la Política de Tratamiento de Datos Personales de FrutCol
              – A SAS disponible en la página web de la sociedad.{" "}
            </li>
            <li>
              Que me ha sido informada la (s) finalidad (es) de la recolección
              de los datos personales, la cualconsiste en: Efectuar las
              gestiones pertinentes para el desarrollo del objeto social de la
              compañía en lo que tiene que ver con el proceso de compraventa de
              pulpa de fruta variedades (Maracuyá, mora, fresa, lulo, tomate de
              árbol, guanábana, guayaba, piña, mango y papaya) celebrado con el
              Titular de la información.
            </li>
            <li>
              Es de carácter facultativo o voluntario responder preguntas que
              versen sobre Datos Sensibles o sobre menores de edad
            </li>
            <li>
              Mis derechos como titular de los datos son los previstos en la
              Constitución y la ley, especialmente el derecho a conocer,
              actualizar, rectificar y suprimir mi información personal, así
              como el derecho a revocar el consentimiento otorgado para el
              tratamiento de datos personales.
            </li>
            <li>
              Los derechos pueden ser ejercidos a través de los canales
              dispuestos por FrutCol – A SAS y observando la Política de
              Tratamiento de Datos Personales de FrutCol – A SAS
            </li>
            <li>
              Mediante la página web de la sociedad (www.frutcol.com), el correo
              electrónico (frutcol0518@gmail.com) y el numero celular 317
              4358995 podré radicar cualquier tipo de requerimiento relacionado
              con el tratamiento de mis datos personales
            </li>
            <li>
              FrutCol – A SAS garantizará la confidencialidad, libertad,
              seguridad, veracidad, transparencia, accesoy circulación
              restringida de mis datos y se reservará el derecho de modificar su
              Política de Tratamiento de Datos Personales en cualquier momento.
              Cualquier cambio será informado y publicado oportunamente en la
              página web
            </li>
            <li>
              Teniendo en cuenta lo anterior, autorizo de manera voluntaria,
              previa, explícita, informada e inequívoca a FrutCol – A SAS para
              tratar mis datos personales y tomar mi huella y fotografía de
              acuerdo con su Política de Tratamiento de Datos Personales para
              los fines relacionados con su objeto y en especial para fines
              legales, contractuales, misionales descritos en la Política de
              Tratamiento de Datos Personales FrutCol – a SAS.
            </li>
            <li>
              La información obtenida para el Tratamiento de mis datos
              personales la he suministrado de forma voluntaria y es verídica
            </li>
          </ol>
          <p>
            <strong>NOTA: </strong> FrutCol - A SAS garantiza y exige a toda
            persona que intervenga en cualquier fase del tratamiento de los
            datos de carácter personal privado, sensible o de menores, la
            confidencialidad, respecto de estos
          </p>
        </div>
      </div>
    </div>
  );
};

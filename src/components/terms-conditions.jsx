import "../styles/terms-privacity.css"

const TermsAndConditions = ({ lastModified = "XX/08/2025" }) => {
  return (
    <div className="privacy-terms-container">
      <div className="privacy-terms-overlay"></div>
      <div className="privacy-terms-wrapper">
        <div className="privacy-terms-content">
          <h1 className="privacy-terms-title">Términos y Condiciones</h1>
          <div className="privacy-terms-text">

            <p>
              Bienvenido a RX Castillo Digital, tu aliado confiable en servicios de radiografías
              y diagnóstico a domicilio en Ruiz, Nayarit. Nuestro sitio web www.rxcastillodigital.com
              ha sido creado para ofrecerte información clara y precisa sobre nuestros servicios, nuestro
              equipo y la forma en que trabajamos para cuidar tu salud.
            </p>

            <p>Al acceder y utilizar este sitio web, aceptas de manera expresa y voluntaria cumplir con los presentes Términos y Condiciones que regulan el uso del portal. Te solicitamos que leas detenidamente esta información, ya que si no estás de acuerdo con alguno de los términos aquí establecidos, te recomendamos no continuar con la navegación o el uso de nuestro sitio.</p>

            <h2>1. Objeto y alcance</h2>
            <p>El presente sitio web es propiedad y está operado por RX Castillo Digital, con domicilio en Blvd. Tijuana #150, Ruiz, Nayarit, México. Este portal tiene como finalidad exclusivamente proporcionar información sobre los servicios que ofrecemos, tales como realización de radiografías e interpretación médica. No se realizan operaciones comerciales, contratación ni prestación directa de servicios médicos a través de este sitio web.</p>

            <h2>2. Condiciones de Uso</h2>
            <p>El acceso y la navegación en este sitio web son gratuitos y están destinados únicamente para fines informativos. Al utilizar este sitio, el usuario se compromete a:</p>

            <ul>
              <li>Utilizarlo de conformidad con las leyes aplicables, la moral y el orden público.</li>
              <li>Abstenerse de realizar acciones que puedan dañar, sobrecargar, inutilizar o deteriorar total o parcialmente el sitio, sus servicios o sistemas informáticos.</li>
              <li>No intentar acceder de forma no autorizada a áreas restringidas o sistemas vinculados con el sitio.</li>
              <li>No utilizar el contenido con fines comerciales, ilícitos o que violen derechos de terceros.</li>
              <li>Respetar los derechos de propiedad intelectual e industrial contenidos en el sitio.</li>
            </ul>

            <h2>3. Restricciones</h2>
            <p>Todos los elementos del sitio web, incluyendo pero no limitándose a textos, imágenes, gráficos, logotipos, marcas y software, son propiedad exclusiva de RX Castillo Digital o de terceros que han autorizado su uso. Queda expresamente prohibida la reproducción, distribución, transformación, comunicación pública o cualquier otra forma de explotación no autorizada de dichos contenidos.</p>

            <h2>4. Contenido del Usuario</h2>
            <p>RX Castillo Digital no asume responsabilidad alguna por daños y perjuicios de cualquier naturaleza que puedan derivarse del acceso, uso o imposibilidad de uso del sitio web o de la información contenida en el mismo.</p>

            <p>Las radiografías y su interpretación se entregan exclusivamente por medios personalizados, tales como correo electrónico y WhatsApp, siendo responsabilidad del paciente dar un uso adecuado a dicha información y seguir las indicaciones médicas correspondientes. RX Castillo Digital no se responsabiliza por errores derivados de una interpretación incorrecta o mal uso de los resultados.</p>

            <h2>5. Protección de datos personales</h2>
            <p>El sitio web no realiza la recolección automática ni directa de datos personales de los usuarios. Los datos personales que RX Castillo Digital pueda recibir son proporcionados voluntariamente por los usuarios a través de canales externos, como WhatsApp o redes sociales, y serán tratados conforme a nuestro Aviso de Privacidad disponible en el sitio.</p>

            <h2>6. Condiciones de Pago</h2>
            <p>Los pagos por los servicios prestados por RX Castillo Digital se realizan únicamente de manera presencial o mediante transferencia bancaria directa. Este sitio web no contempla ningún mecanismo para la realización de pagos o transacciones económicas.</p>

            <h2>7. Modificaciones de los Términos</h2>
            <p>RX Castillo Digital se reserva el derecho de modificar, actualizar o eliminar en cualquier momento y sin previo aviso los presentes términos y condiciones, comprometiéndose a informar sobre dichas modificaciones a través de avisos visibles en el sitio web.</p>

            <h2>8. Legislación aplicable y jurisdicción</h2>
            <p>Estos términos y condiciones se rigen por las leyes vigentes en los Estados Unidos Mexicanos. Para la interpretación y cumplimiento de los mismos, las partes se someten a la jurisdicción y competencia exclusiva de los tribunales correspondientes en Ruiz, Nayarit, renunciando a cualquier otro fuero que pudiera corresponderles por razón de su domicilio presente o futuro.</p>

            <h2>9. Contacto</h2>
            <p>Para cualquier duda, comentario o consulta relacionada con estos Términos y Condiciones, por favor comunícate con nosotros a través de los siguientes medios:</p>

            <ul>
              <li><strong>Teléfono:</strong> 323 194 5292</li>
              <li><strong>Correo electrónico:</strong> <a href="mailto:rxcastillodigital@gmail.com" className="mail-tp">rxcastillodigital@gmail.com</a></li>
              <li><strong>Dirección física:</strong> <a href="https://maps.app.goo.gl/EaKYm1Xxd756hmnK8" className="mail-tp"> Blvd. Tijuana #150, Ruiz, Nayarit, México</a></li>
            </ul>

            <div className="privacy-terms-footer">Última modificación: {lastModified}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions

import "../styles/terms-privacity.css"

const PrivacyPolicy = ({ lastModified = "XX/08/2025" }) => {
    return (
        <div className="privacy-terms-container">
            <div className="privacy-terms-overlay"></div>
            <div className="privacy-terms-wrapper">
                <div className="privacy-terms-content">
                    <h1 className="privacy-terms-title">Aviso de Privacidad</h1>
                    <div className="privacy-terms-text">

                        <p>
                            En RX Castillo Digital, valoramos tu privacidad y nos comprometemos a proteger tu información personal.
                            Este Aviso de Privacidad describe cómo recopilamos, utilizamos, compartimos y protegemos tu información
                            cuando visitas nuestro sitio web o utilizas nuestros servicios.
                        </p>

                        <h2>1. Responsable del tratamiento de datos personales</h2>
                        <p>RX Castillo Digital, con domicilio en Blvd. Tijuana #150, Ruiz, Nayarit, México, y con medios de contacto a través del teléfono/WhatsApp +52 323 194 5292 y el correo electrónico rxcastillodigital@gmail.com, es responsable del tratamiento, uso y protección de sus datos personales, en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>

                        <h2>2. Datos personales que recabamos</h2>
                        <p>Podemos obtener los siguientes datos personales, de manera directa y voluntaria, cuando usted se comunica con nosotros por WhatsApp, redes sociales o de forma presencial:</p>
                        <ul>
                            <li>Nombre completo</li>
                            <li>Edad</li>
                            <li>Fecha de nacimiento</li>
                            <li>Motivo de la realización de la radiografía o estudio</li>
                            <li>Datos clínicos relacionados con el servicio solicitado</li>
                        </ul>
                        <p>No recabamos datos personales directamente a través del sitio web www.rxcastillodigital.com.</p>

                        <h2>3. Finalidad del tratamiento de datos</h2>
                        <p>Los datos personales que recabamos serán utilizados exclusivamente para:</p>
                        <ul>
                            <li>Identificar y registrar al paciente</li>
                            <li>Elaborar la interpretación médica correspondiente</li>
                            <li>Entregar los resultados y radiografías de forma precisa y personalizada</li>
                        </ul>

                        <h2>4. Transferencia de datos personales</h2>
                        <p>Sus datos podrán ser compartidos únicamente con el médico radiólogo encargado de la interpretación de las radiografías, con el fin de cumplir la finalidad del servicio. No transferimos sus datos a terceros para fines distintos a los señalados, salvo que exista obligación legal.</p>

                        <h2>5. Medios de entrega de resultados</h2>
                        <p>Los resultados de los estudios y las radiografías se entregan por medios digitales (correo electrónico y WhatsApp) o de forma física en nuestras instalaciones.</p>

                        <h2>7. Seguridad de la información</h2>
                        <p>Sus datos se almacenan en formatos físicos y/o digitales, aplicando medidas de seguridad razonables para protegerlos contra pérdida, alteración, acceso no autorizado o uso indebido.</p>

                        <h2>8. Conservación de datos</h2>
                        <p>La información personal será conservada por un periodo máximo de 1 año después de la prestación del servicio, salvo que exista una obligación legal que requiera un tiempo mayor.</p>

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

export default PrivacyPolicy

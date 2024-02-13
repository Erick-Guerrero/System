import CardComponent from "../CardHome/CardHome"
import ViewsHome from "../ViewsHome/ViewsHome";
import "./Home.css"

function Home() {

  const objeto = [
    {
      nombre: "Venta Ticket",
      detalle: "nuevo ticket",
      link: "/tickets"
    },
    {
      nombre: "Crear Cliente",
      detalle: "formulario nuevo",
      link: "/form"
    },
    {
      nombre: "Caja",
      detalle: "detalle y movimientos",
      link: "/caja"
    },
    {
      nombre: "Clientes",
      detalle: "Clientes existentes",
      link: "/clientes"
    },
    {
      nombre: "Tickets",
      detalle: "detalle global",
      link: "/ticketView"
    },
    {
      nombre: "Mi Perfil",
      detalle: "Datos de mi local",
      link: "/perfil"
    }
  ]

  return (
    <>
      <ViewsHome />

      <div className="containerHomeGrid">
        <div className="globalContainerCard">
          {objeto.map((item, index) => (
            <CardComponent key={index} nombre={item.nombre} detalle={item.detalle} link={item.link} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home
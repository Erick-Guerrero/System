import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'

export default function UserStatus() {

  const navigate = useNavigate()

  const name = localStorage.getItem('name')

  const handleSubmit = (e) => {
    e.preventDefault
    swal({
      title: `${name.split(" ")[0]} ¿Está seguro que quiere cerrar sesión?`,
      icon: "warning",
      buttons: true,
    })

      .then((logout) => {
        if (logout) {
          localStorage.clear()
          swal(`La sesion de ${name} fue cerrada con éxito`, {
            icon: "success",
            timer: 1000,
            showButton: false
          }).then(
            () => { (navigate(`/`)) }
          )
        }
      });
  }

  return (
    <>

      <div 
        className='hidden sm:flex flex-col text-xs font-normal rounded-md justify-center items-center text-white'
      >
        
          {/* {name ? name : ''} */}
        
   
        <button 
        className='border-2 hover:bg-green-600 px-1 rounded w-fit text-white font-bold text-base'
          onClick={handleSubmit}>
          Cerrar sesion
        </button>
      </div>
  
    </>
  );
}

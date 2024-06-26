import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { upLoadFileUser } from '../../../../firebase'




//desarrollo local
/* const URI = 'http://localhost:8000/usuarios/'  */


//produccion
const URI2 = 'https://sistema-novedades-backend.onrender.com/usuarios/'



const CargaUsuario = () => {

  const [nombres, setNombres] = useState('')
  const [apellido, setApellido] = useState('')
  const [legajo, setLegajo] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tipoUsuario, setTipoUsuario] = useState('')
  const [file, setFile] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()


  //procedimiento guardar el usuario

  const store = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const imageUrl = await upLoadFileUser(file);
    try {
      //guardar datos en tabla usuarios
      await axios.post(URI2, {
        nombres: nombres,
        apellido: apellido,
        legajo: legajo,
        file: imageUrl,
        username: username,
        password: password,
        user: tipoUsuario
      });
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      setIsLoading(false)
    }
    navigate('/ListaUsuario')


  };

  return (
    <>

      <div>
        {isLoading && (
          <div className="modal" id="loadingModal" tabIndex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-2">Cargando...</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={store} >
          <h4 className="form-titulo">Nuevo Usuario</h4>
          <input type="text" name="nombres" placeholder='Ingrese el Nombre' value={nombres} onChange={(e) => setNombres(e.target.value)} required />
          <input type="text" name="apellido" placeholder='Ingrese el Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          <input type="number" name="legajo" placeholder='Ingrese el Legajo' value={legajo} onChange={(e) => setLegajo(e.target.value)} required />
          <input type="text" name="text" placeholder='Ingrese su usuario' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="text" name="password" placeholder='Ingrese el Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select name="tipoUsuario" onChange={(e) => setTipoUsuario(e.target.value)} required>
            <option value="">Seleccione el tipo de usuario</option>
            <option value={1} >Administrador</option>
            <option value={2} >Usuario</option>
          </select>
          <label htmlFor="img">Carga de Foto de Perfil</label>
          <input type="file" name="img" id="img" onChange={e =>
            setFile(e.target.files[0])
          } />
          <input type='submit' className='btn' value='Guardar' />
        </form>

      </div>


    </>
  )
}

export default CargaUsuario
import React,{useState} from "react";
import Error from './Error';

const Formulario = ({guardabusqueda}) => {


    const [termino,guardartermino]=useState('');
    const [error,guardarerror]=useState(false);

    const buscarimagenes = e =>{
        e.preventDefault();

        //validar
        if(termino.trim() === '')
        {
            guardarerror(true);
            return;
        }
        guardarerror(false);

        //enviar el termino de busqueda hacia el componente principal
        guardabusqueda(termino);
    }

  return (
    <form
        onSubmit={buscarimagenes}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o café"
            onChange={e=> guardartermino(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group col-md-4">
        <input
          type="submit"
          className="btn btn-lg btn-danger btn-block"
          value="Buscar"
        />
      </div>
      {error? <Error mensaje="Agrega un termino de busqueda"/>:null}
    </form>
  );
};

export default Formulario;

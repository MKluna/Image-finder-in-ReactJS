import React,{useState,useEffect} from "react";
import Formulario from "./components/Formulario";
import ListaImagenes from "./components/ListaImagenes";

function App() {

  //state de la app
  const[busqueda,guardabusqueda]=useState('');
  const[imagenes,guardarimagenes]=useState([]);
  const[paginactual,guardarpaginaactual]=useState(1);
  const[totalpaginas,guardatotal]=useState(1); 

  useEffect(() => 
  {
    const consultarapi = async () =>{
    if(busqueda==='')return;
    const imagenporpagina =30;
    const key = '15022401-f089bbe1516fe83f639d031ae';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenporpagina}&page=${paginactual}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    guardarimagenes(resultado.hits);

    //calcular total de paginas
    const calculartotal = Math.ceil(resultado.totalHits/imagenporpagina);
    guardatotal(calculartotal);

    // Mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' })
  };

    


    consultarapi();
  }, [busqueda,paginactual])


  // definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginactual - 1;

    if(nuevaPaginaActual === 0 ) return;

    guardarpaginaactual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginactual + 1;

    if(nuevaPaginaActual > totalpaginas ) return;

    guardarpaginaactual(nuevaPaginaActual);
  }



  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario 
          guardabusqueda={guardabusqueda}
        />
      </div>
      <div className="row justify-content-center">
          <ListaImagenes 
            imagenes={imagenes}
          />
          { (paginactual === 1) ? null : (
            <button 
                type="button"
                className="bbtn btn-info mr-1"
                onClick={paginaAnterior}
            >&laquo; Anterior </button>
          ) }

          { (paginactual === totalpaginas) ? null : (
            <button 
              type="button"
              className="bbtn btn-info"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          ) }
      </div>
    </div>
  );
}

export default App;

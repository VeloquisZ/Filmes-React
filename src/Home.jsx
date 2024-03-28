import { Link } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

function Home() {
    const [listarFilmes, setListarFilmes] = useState([]);
    const [erroBuscar, setErroBuscar] = useState('');

    const pesquisarFilme = async () => {
        try {
            console.log('Sucesso buscar')
            let nomeFilme = document.getElementById('nomeFilme').value;
            const response = await axios.get('http://www.omdbapi.com?apikey=28d0dee8&s=' + nomeFilme);
            let listarFilme = response.data.Search;

            if (!listarFilme) {
                console.log('NADA DE FILME');
                setErroBuscar('NENHUM FILME ENCONTRADO!');
                setListarFilmes([]);
                return;
            }
            setListarFilmes(listarFilme);
            setErroBuscar('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
        <h1>OMDI API + REACT</h1>

        <div className="pesquisa">
            <textarea rows="2" cols="50" id='nomeFilme'>
            </textarea>

            <button onClick={pesquisarFilme}>Achar</button>
        </div>

        <h3>{erroBuscar}</h3>
        <div className='filmes'>
            {
                listarFilmes.length > 0 && (
                    <div>

                        {listarFilmes.map((item, index) =>
                            <div key={index} className='box'>
                                {item.Title}
                                <br></br>
                                {/* {letitem.imdbID}  */}
                                <Link to={`./filmes/${item.imdbID}`}>
                                    <img src={item.Poster}></img>
                                </Link>
                            </div>
                        )
                        }
                    </div>
                )
            }

        </div>

    </div>
    )
}
export default Home
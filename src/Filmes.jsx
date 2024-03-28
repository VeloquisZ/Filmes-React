import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useEffect , useState} from 'react';
import axios from 'axios';

function Filmes(){
    let { id } = useParams();
    const [filme, setFilme] = useState([]);
  
    useEffect(() => {
  
      console.log('USEFFEECT')
      console.log(id);
      async function pesquisarNome() {
        try {
          console.log('Sucesso buscar')
          const response = await axios.get('http://www.omdbapi.com?apikey=28d0dee8&i=' + id);
          console.log(response.data)
          setFilme(response.data)
        } catch (error) {
          console.log('Error fetching data');
        }
      }
      pesquisarNome();
    }, []);
  

    return(
        <div className="mostrando">
     
        <h1>Mostrando filme!</h1>
        <Link to="/">
        <img src='https://cdn-icons-png.freepik.com/256/10968/10968219.png' className='buttonBack'></img>
        </Link>
        <p>Nome do Filme:  {filme.Title} </p>
        <p>Ano do Filme:  {filme.Year} </p>
        <p>Diretor:  {filme.Director} </p>
        <p>Atores:  {filme.Actors} </p>
        <img src={filme.Poster}></img>
      </div>
    )
}

export default Filmes
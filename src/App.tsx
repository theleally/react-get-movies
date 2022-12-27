import { useState, useEffect } from "react";
import { Movie } from "./types/Movie";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);
  /*
  const loadMovies = () => {
    setLoading(true);
    fetch("https://api.b7web.com.br/cinema/")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setMovies(json);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  };
  */

  const loadMovies = async () => {
    try {
      setLoading(true);
      let response = await fetch("https://api.b7web.com.br/cinema/");
      let json = await response.json();
      setLoading(false);
      setMovies(json);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      {loading && <div>Carregando...</div>}
      {!loading && movies.length > 0 && (
        <>
          <p className="mb-4">Total de filmes em exibição: {movies.length}</p>
          <div className="grid grid-cols-6 gap-3">
            {movies.map((item, index) => (
              <div key={index}>
                <img src={item.avatar} className="w-32 block" alt="" />
                {item.titulo}
              </div>
            ))}
          </div>
        </>
      )}
      {!loading && movies.length === 0 && (
        <p>Erro! Tente novamente mais tarde...</p>
      )}
    </div>
  );
};

export default App;

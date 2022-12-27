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
    fetch("https://api.b7web.com.br/cinema/")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setMovies(json);
      });
  };
  */

  const loadMovies = async () => {
    setLoading(true);
    let response = await fetch("https://api.b7web.com.br/cinema/");
    let json = await response.json();
    setLoading(false);
    setMovies(json);
  };

  return (
    <div>
      {loading && <div>Carregando...</div>}
      {!loading && (
        <>
          <p>Total de filmes em exibição: {movies.length}</p>
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
    </div>
  );
};

export default App;

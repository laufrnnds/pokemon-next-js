import PokemonItem from "@/components/pokemonitem";
import { useEffect, useState } from "react";

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getPokemons = async () => {
      const offset = page > 1 ? page * 10 : 0;
      const response = await fetch(`api/pokemons/?offset=${offset}&limit=5`);
      const data = await response.json();
      setData(data);
    };
    getPokemons();
  }, [page]);

  function changePage(next: boolean) {
    if (next) {
      setPage(page + 1);
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  }

  return (
    <div>
      <h1
        className="m-3"
        style={{
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Pokemons
      </h1>
      <button
        onClick={() => changePage(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        mais
      </button>
      <button
        onClick={() => changePage(false)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        menos
      </button>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        style={{
          width: "80vw",
          height: "80vh",
          marginTop: "16px",
        }}
      >
        {data?.results.map((pokemon: any) => {
          return <PokemonItem key={pokemon.name} name={pokemon.name} />;
        })}
      </div>
    </div>
  );
}

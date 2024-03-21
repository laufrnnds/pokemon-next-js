import { useEffect, useState } from "react";

interface PokemonItemProps {
  name: string;
}

function PokemonItem({ name }: PokemonItemProps) {
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPokemon = async () => {
      setLoading(true);
      const res = await fetch(`/api/pokemons/${name}`);
      const data = await res.json();
      setPokemon(data);
      setLoading(false);
    };
    getPokemon();
  }, [name]);

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  console.log(pokemon?.abilities[0].ability.name);
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "200px",
        height: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: loading ? "center" : "start",
        flexDirection: "column",
      }}
    >
      {loading ? (
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 26.349 26.35"
          className="animate-spin mr-3 ..."
          style={{ width: "50px", height: "50px" }}
        >
          <g>
            <g>
              <circle cx="13.792" cy="3.082" r="3.082" />
              <circle cx="13.792" cy="24.501" r="1.849" />
              <circle cx="6.219" cy="6.218" r="2.774" />
              <circle cx="21.365" cy="21.363" r="1.541" />
              <circle cx="3.082" cy="13.792" r="2.465" />
              <circle cx="24.501" cy="13.791" r="1.232" />
              <path
                d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05
			C6.902,18.996,5.537,18.988,4.694,19.84z"
              />
              <circle cx="21.364" cy="6.218" r="0.924" />
            </g>
          </g>
        </svg>
      ) : (
        <>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
            style={{
              width: "100px",
              height: "100px",
              border: "2px solid black",
              marginTop: "16px",
            }}
          />

          <div
            style={{
              width: "180px",
              height: "100px",
              marginTop: "16px",
            }}
          >
            <h1
              style={{
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {pokemon?.name}
            </h1>
            <h3
              style={{
                color: "black",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Habilidades
            </h3>
            {pokemon?.abilities && (
              <div>
                {pokemon.abilities.map((ability: any, index: any) => (
                  <p
                    key={index}
                    style={{
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    {ability.ability.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonItem;

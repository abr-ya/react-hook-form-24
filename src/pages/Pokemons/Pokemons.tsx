// @ts-expect-error todo: mf types!
import PokemonList from "remote1/PokemonList";
// @ts-expect-error todo: mf types!
import usePokemonSelected from "remote1/Pokemon";
import PoceCard from "./components/PoceCard";

const Pokemons = () => {
  const [pokemon] = usePokemonSelected();

  return (
    <div>
      Pokemons from {import.meta.env.VITE_REM1}
      <PokemonList />
      {pokemon ? <PoceCard imgSrc={pokemon.sprite} name={pokemon.name} /> : null}
    </div>
  );
};

export default Pokemons;

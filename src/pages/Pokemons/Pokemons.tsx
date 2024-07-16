// @ts-expect-error todo: mf types!
import PokemonList from "remote1/PokemonList";

const Pokemons = () => (
  <div>
    Pokemons from {import.meta.env.VITE_REM1}
    <PokemonList />
  </div>
);

export default Pokemons;

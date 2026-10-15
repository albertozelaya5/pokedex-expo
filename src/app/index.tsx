import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/ability/?limit=20");
        const data = await res.json();
        console.log(data);

        // Fetch detailed info for each Pokémon in parallel
        const detailedPokemons: Pokemon[] = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              image: details.sprites.front_default, // main sprite
            };
          }),
        );

        console.log(detailedPokemons);
        setPokemons(data.results);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  return (
    <ScrollView>
      {pokemons.map(function (pokemon) {
        return (
          <View key={pokemon.name}>
            <Text>{pokemon.name}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

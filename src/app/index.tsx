import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
  imageBack: string;
  types: PokemonType[];
  image: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
        const data = await res.json();
        // console.log(data);

        // Fetch detailed info for each Pokémon in parallel
        const detailedPokemons: Pokemon[] = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon?.name,
              image: details?.sprites.other.home.front_default, // main sprite
              imageBack: details?.sprites?.back_default,
              types: details.types,
            };
          }),
        );
        console.log(
          "🚀: index.tsx -> #21 -> detailedPokemons ~",
          JSON.stringify(detailedPokemons, null, 2),
        );

        // console.log(detailedPokemons);
        setPokemons(detailedPokemons);
        // setPokemons(data.results);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  console.log(
    "🚀: index.tsx -> #11 -> pokemons ~",
    JSON.stringify(pokemons, null, 2),
  );

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map(function (pokemon) {
        return (
          <Link
            key={pokemon.name}
            href={{ pathname: "/details", params: { name: pokemon.name } }}
            style={{
              backgroundColor:
                colorsByType[pokemon.types[0].type.name] ?? "#A8A8A8" + 50,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <View>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: pokemon.image }}
                  style={{ height: 100, width: 100 }}
                />
                <Image
                  source={{ uri: pokemon.imageBack }}
                  style={{ height: 100, width: 100 }}
                />
              </View>
            </View>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
  },
});

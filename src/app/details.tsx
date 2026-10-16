import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Index() {
  const params = useLocalSearchParams();
  //? Hacer un equivalente de los mostrado en index, pero con otro enlace xd
  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      >
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
        <Text>{params.name}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});

import {
  Image,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { ButtonAction } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { itemStorage, ItemStorage } from "@/storage/itemStorage";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informar descrição");
    }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    await itemStorage.add(newItem);
    await itemsByStatus();

    Alert.alert("Adicionado", `Adicionado: ${description}`);
    setFilter(FilterStatus.PENDING);
    setDescription("");
  }

  async function itemsByStatus() {
    try {
      const reponse = await itemStorage.getByStatus(filter);

      setItems(reponse);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar a lista.");
    }
  }

  async function removeItem(id: string) {
    try {
      await itemStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }

  async function onclear() {
    try {
      await itemStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Limpar", "Não foi possível remover todos os itens.");
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onclear() },
    ]);
  }

  async function handleToggleItemStatus(id: String) {
    try {
      await itemStorage.toggleStatus(id);
      itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  }

  useEffect(() => {
    itemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />
        <ButtonAction title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.filter}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={filter === status}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleClear()}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => removeItem(item.id)}
              onStatus={() => handleToggleItemStatus(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.sparator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}

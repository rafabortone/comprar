import { Image, View, TouchableOpacity, Text } from "react-native";
import { ButtonAction } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <ButtonAction title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.filter}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Item
          data={{ status: FilterStatus.DONE, description: "Café" }}
          onRemove={() => console.log("Remover")}
          onStatus={() => console.log("Mudar status")}
        />
      </View>
    </View>
  );
}

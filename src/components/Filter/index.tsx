import { TouchableOpacity, TouchableHighlightProps, Text } from "react-native";
import { StatusIcon } from "../StatusIcon";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";

type Props = TouchableHighlightProps & {
  status: FilterStatus;
  isActive: boolean;
};
export function Filter({ status, isActive, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.8}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}

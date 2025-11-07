import { styles } from "./styles";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};

export function ButtonAction({ title, ...rest }: Props) {
  return (
    <>
      <TouchableOpacity style={styles.container} {...rest}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}

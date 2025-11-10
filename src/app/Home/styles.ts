import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0d2d8",
    alignItems: "center",
    paddingTop: 62,
  },
  logo: {
    height: 34,
    width: 134,
    marginBottom: 42,
  },
  form: {
    width: "100%",
    gap: 7,
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    marginTop: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
  },
  filter: {
    flexDirection: "row",
    gap: 5,
    width: "100%",
    borderBottomWidth: 1,
    borderBlockColor: "#e4e6ec",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    fontSize: 12,
    color: "#828282",
  },
});

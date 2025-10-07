import { ShoppingListItem } from "./components/ShoppingList";
import { StyleSheet, View } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <ShoppingListItem name="Coffee"/>
            <ShoppingListItem name="Tea"/>
            <ShoppingListItem name="Juice" isCompleted/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

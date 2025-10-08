import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";
import { AntDesign } from "@expo/vector-icons";

type Props = {
    name: string;
    isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted }: Props) {
    const handleDelete = () => {
        Alert.alert("Delete", `"Are you sure to delete ${name}?"`, [
            {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: () => console.log("OK Pressed"),
                style: "destructive",
            },
        ]);
    };
    return (
        <View style={[styles.container, isCompleted && styles.completed]}>
            <Text style={styles.itemContainer}>{name}</Text>
            <TouchableOpacity
                style={[styles.button, isCompleted && styles.completedButton]}
                onPress={handleDelete}
                activeOpacity={0.4}
            >
                <AntDesign
                    name="close-circle"
                    size={24}
                    color={theme.colorRed}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        borderBottomWidth: 1,
    },
    itemContainer: {
        backgroundColor: "#1a759f",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: "#fff",
        borderBottomColor: theme.colorCerulean,
    },
    completed: {
        backgroundColor: theme.colorLightGray,
        borderBottomColor: theme.colorLightGray,
    },
    button: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: "#000",
        borderWidth: 1,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        textTransform: "uppercase",
    },
    completedButton: {
        backgroundColor: theme.colorGray,
    },
    completedButtonText: {
        textDecorationLine: "line-through",
        textDecorationColor: theme.colorBlack,
    },
});

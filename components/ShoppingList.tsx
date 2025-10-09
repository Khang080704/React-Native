import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
} from "react-native";
import { theme } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type Props = {
    name: string;
    isCompleted?: boolean;
    onDelete?: () => void;
    onToggle?: () => void;
};

export function ShoppingListItem({
    name,
    isCompleted,
    onDelete,
    onToggle,
}: Props) {
    const handleDelete = () => {
        Alert.alert("Delete", `"Are you sure to delete ${name}?"`, [
            {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: onDelete,
                style: "destructive",
            },
        ]);
    };
    return (
        <Pressable onPress={onToggle}>
            <View style={[styles.container, isCompleted && styles.completed]}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1, paddingHorizontal: 10 }}>
                    <Entypo name={isCompleted ? "check" : "circle"} size={24} color="black" />
                    <Text style={styles.itemContainer} numberOfLines={1}>{name}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.button,
                        isCompleted && styles.completedButton,
                    ]}
                    onPress={isCompleted ? undefined : handleDelete}
                    activeOpacity={0.4}
                >
                    <AntDesign
                        name="close-circle"
                        size={24}
                        color={theme.colorRed}
                    />
                </TouchableOpacity>
            </View>
        </Pressable>
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
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomColor: theme.colorCerulean,
        flex: 1,
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

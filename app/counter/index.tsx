import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Counter() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Counter Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 24
    }
})

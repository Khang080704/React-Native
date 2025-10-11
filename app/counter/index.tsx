import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { useEffect, useState } from "react";

export default function Counter() {
    const [secondElapsed, setSecondElapsed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleRequestPermission = async () => {
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{secondElapsed}</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleRequestPermission}>
                <Text style={styles.buttonText}>Request permission</Text>
            </TouchableOpacity>
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
        fontSize: 24,
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 12,
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 24,
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
});

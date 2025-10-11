import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { useEffect, useState } from "react";
import { Duration, isBefore, intervalToDuration } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";
import { getFromStorage } from "../../utils/storage";

type CountdownStatus = {
    isOverdue: boolean;
    distance: Duration;
};

const frequency = 10 * 1000; // 10 seconds from now

const countdownStorageKey = "taskly-countdown";

type PersistCountdownState = {
    currentNotificationId: string | undefined;
    completedAtTimestamp: number[];
}

export default function Counter() {
    const [countdownState, setCountdownState] = useState<PersistCountdownState>()
    const [status, setStatus] = useState<CountdownStatus>({
        isOverdue: false,
        distance: {},
    });

    const lastCompletedTimestamp = countdownState?.completedAtTimestamp[0]

    useEffect(() => {
        (async () => {
            const value = await getFromStorage(countdownStorageKey);
            setCountdownState(value)
        })()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const timestamp = lastCompletedTimestamp
                ? lastCompletedTimestamp + frequency
                : Date.now() + frequency;
            if (!timestamp) return;
            const isOverdue = isBefore(timestamp, Date.now());
            const distance = intervalToDuration(
                isOverdue
                    ? { start: timestamp, end: Date.now() }
                    : { start: Date.now(), end: timestamp }
            );
            setStatus({ isOverdue, distance });
        }, 1000);
        return () => clearInterval(interval);
    }, [lastCompletedTimestamp]);

    const handleRequestPermission = async () => {};

    return (
        <View style={[styles.container, status.isOverdue && { backgroundColor: "#ffcccc" }]}>
            {status.isOverdue ? (
                <Text style={styles.text}>Time's up!</Text>
            ) : (
                <Text style={styles.text}>
                    Time due...
                </Text>
            )}
            <View style={{ flexDirection: "row", marginVertical: 24 }}>
                <TimeSegment unit="Days" number={status.distance.days ?? 0} textStyle={status.isOverdue ? { color: "white" } : undefined}/>
                <TimeSegment unit="Hours" number={status.distance.hours ?? 0} textStyle={status.isOverdue ? { color: "white" } : undefined}/>
                <TimeSegment unit="Minutes" number={status.distance.minutes ?? 0} textStyle={status.isOverdue ? { color: "white" } : undefined}/>
                <TimeSegment unit="Seconds" number={status.distance.seconds ?? 0} textStyle={status.isOverdue ? { color: "white" } : undefined}/>
            </View>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleRequestPermission}
            >
                <Text style={styles.buttonText}>I've done!</Text>
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
        fontSize: 16,
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
});

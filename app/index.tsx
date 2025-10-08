import { ShoppingListItem } from "../components/ShoppingList";
import {
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    FlatList,
    Text,
} from "react-native";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemProps = {
    name: string;
    id: string;
};

const initialItems: ShoppingListItemProps[] = [
    { name: "Coffee", id: "1" },
    { name: "Tea", id: "2" },
    { name: "Orange Juice", id: "3" },
];

export default function App() {
    const [input, setInput] = useState("");
    const [items, setItems] = useState<ShoppingListItemProps[]>(initialItems);

    const handleSubmit = () => {
        if (input.trim()) {
            setItems([{ name: input, id: Math.random().toString() }, ...items]);
            setInput("");
        }
    };

    return (
        <FlatList
            data={items}
            removeClippedSubviews={false}
            stickyHeaderIndices={[0]}
            ListEmptyComponent={
                <View>
                    <Text>There is no item</Text>
                </View>
            }
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={
                <TextInput
                    style={styles.input}
                    placeholder="E.g Coffee"
                    value={input}
                    onChangeText={setInput}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    onFocus={() => {
                        void 0;
                    }}
                />
            }
            renderItem={({ item }) => (
                <ShoppingListItem key={item.id} name={item.name} />
            )}
        />
        // <ScrollView
        //     style={styles.container}
        //     contentContainerStyle={styles.contentContainer}
        //     stickyHeaderIndices={[0]}
        // >
        //     <TextInput
        //         style={styles.input}
        //         placeholder="E.g Coffee"
        //         value={input}
        //         onChangeText={setInput}
        //         returnKeyType="done"
        //         autoCapitalize="none"
        //         onSubmitEditing={handleSubmit}
        //     />
        //     {items.map((item) => (
        //         <ShoppingListItem key={item.id} name={item.name} />
        //     ))}
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        paddingTop: 50,
    },
    input: {
        borderColor: theme.colorLightGray,
        borderWidth: 2,
        padding: 12,
        marginHorizontal: 12,
        marginBottom: 12,
        fontSize: 18,
        borderRadius: 50,
        backgroundColor: theme.colorGray,
    },
});

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
    completedAtTimeStamp?: number;
    lastUpdatedTimeStamp: number;
};

const initialItems: ShoppingListItemProps[] = [
    { name: "Coffee", id: "1", lastUpdatedTimeStamp: Date.now() },
    { name: "Tea", id: "2", lastUpdatedTimeStamp: Date.now() },
    { name: "Orange Juice", id: "3", lastUpdatedTimeStamp: Date.now() },
];

export default function App() {
    const [input, setInput] = useState("");
    const [items, setItems] = useState<ShoppingListItemProps[]>(initialItems);

    const handleSubmit = () => {
        if (input.trim()) {
            setItems([
                {
                    name: input,
                    id: Math.random().toString(),
                    lastUpdatedTimeStamp: Date.now(),
                },
                ...items,
            ]);
            setInput("");
        }
    };

    const onDelete = (id: string) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

    const handleToggle = (id: string) => {
        const newShoppingList = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    completedAtTimeStamp: item.completedAtTimeStamp
                        ? undefined
                        : Date.now(),
                };
            } else {
                return item;
            }
        });
        setItems(newShoppingList);
    };

    function orderShoppingList(shoppingList: ShoppingListItemProps[]) {
        return shoppingList.sort((item1, item2) => {
            if (item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
                return item2.completedAtTimeStamp - item1.completedAtTimeStamp;
            }

            if (item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
                return 1;
            }

            if (!item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
                return -1;
            }

            if (!item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
                return item2.lastUpdatedTimeStamp - item1.lastUpdatedTimeStamp;
            }

            return 0;
        });
    }

    return (
        <FlatList
            data={orderShoppingList(items)}
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
                />
            }
            renderItem={({ item }) => (
                <ShoppingListItem
                    key={item.id}
                    name={item.name}
                    onDelete={() => onDelete(item.id)}
                    onToggle={() => handleToggle(item.id)}
                    isCompleted={!!item.completedAtTimeStamp}
                />
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

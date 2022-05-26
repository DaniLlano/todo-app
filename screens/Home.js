import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ToDoList from '../components/TodoList';
import { todosData } from '../data/todos';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const [localData, setLocalData] = useState(
        todosData.sort((a, b) => {return a.isCompleted - b.isCompleted})
    );
    const [isHidden, setIsHidden] = useState(false);
    const navigation = useNavigation();

    const handleHidePress = () => {
        if (isHidden) {
            setIsHidden(false)
            setLocalData(todosData.sort((a, b) => {return a.isCompleted - b.isCompleted}))
            return
        }
        setIsHidden(!isHidden)
        setLocalData(localData.filter(todo => !todo.isCompleted))
    }


    return (
    <View style={styles.container}>
        <Image
            source={{ uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQGwrbecORUHvQ/profile-displayphoto-shrink_800_800/0/1623984970438?e=1658966400&v=beta&t=E77DeEAyZDN7OKDuD_40IIOySGdL6Vx9Wggl5jpkN0A'}}
            style={styles.pic}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Today</Text>
            <TouchableOpacity onPress={handleHidePress}>
                <Text style={{color: '#3478f6'}}>{isHidden ? "Show Completed" : "Hide Completed"}</Text>
            </TouchableOpacity>    
        </View>
        <ToDoList todosData={localData.filter(todo => todo.isToday)} />
        
        <Text style={styles.title}>Tomorrow</Text>
        <ToDoList todosData={todosData.filter(todo => !todo.isToday)} />
        <TouchableOpacity onPress={() => navigation.navigate("Add")} style={styles.button}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15,
    },
    pic: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 50,
        right: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
    },
    plus: {
        fontSize: 40,
        color: '#fff',
        position: 'absolute',
        alignSelf: 'center',
        top: -3,
    }
})
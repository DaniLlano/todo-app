import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoReducer } from '../redux/todosSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'


export default function AddTodo() {

    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [isToday, setIsToday] = useState(false);
    const listTodos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const addTodo = async () => {
        const newTodo = {
            id: 1,
            text: name,
            hour: date.toString(),
            isToday: isToday,
            isCompleted: false
        }
        try {
            await AsyncStorage.setItem('@Todos', JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log("todo saved")
            navigation.goBack();
        } catch (err) {
            console.log(err)
        }
    }

    const onChange = (event, selectedDate) => {
        const currentTime = selectedDate || date;
        setDate(currentTime)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Task"
                    placeholderTextColor="#00000030"
                    onChangeText={(text) => {setName(text)}}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Hour</Text>
                <DateTimePicker
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChange}
                    style={{width: '80%'}}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value) => {setIsToday(value)}}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={addTodo}>
                <Text style={{color: 'white'}}>Done</Text>
            </TouchableOpacity>
            <Text style={{color: '#00000060'}}>If you disable today, the task will be considered as tomorrow</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 40,
        borderRadius: 11,
    }
});
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AddListButton, RemoveListItemButton, StandardButton } from '@/components/buttons';
import { TodoAddTaskModal } from '@/components/todoAddTaskModal';
import uuid from 'react-native-uuid'

export default function ToDoScreen() {
  const [tasks, setTasks] = useState<{id: string; text: string}[]>([])
  const [showModal, setShowModal] = useState(false)

  function addTask(text: string){
    setTasks(prev => [...prev, {id: uuid.v4().toString(), text}])  
  }

  function removeTask(id: string) {
    setTasks(prev => prev.filter( task => task.id !== id))
  }

  function deleteAllTasks () {
    setTasks([])
  }

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.title}>Todo list</Text>
      <FlatList style={styles.flatList} data={tasks} keyExtractor={(item,) => item.id} renderItem={({item, index}) => 
        <View style={styles.itemWrapper}>
          <Text style={styles.taskItem}>{`${index + 1}. ${item.text}`}</Text>
          <RemoveListItemButton onPress={() => removeTask(item.id)} />
        </View>}/>
      <View style={styles.dangerButtonWrapper}>
        <StandardButton title="Delete all" onPress={deleteAllTasks} isDanger/> 
      </View>
      <View style={styles.addButtonWrapper}>
        <AddListButton onPress={()=>setShowModal(true)} />
      </View>
      <TodoAddTaskModal visible={showModal} onClose={() => setShowModal(false)} onSubmit={addTask}/> 
    </View>
  );
}
const styles = StyleSheet.create({
todoContainer: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatList: {
    width: '90%',
    alignSelf: 'center',
  },
  taskItem: {
    fontSize: 18,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dangerButtonWrapper: {
    paddingBottom: 30,
    paddingLeft: 15,
  }
});

import { AddListButton, RemoveListItemButton, StandardButton } from '@/components/buttons';
import { TodoAddTaskModal } from '@/components/todoAddTaskModal';
import { queries } from '@/hooks/quries';
import { userTable } from '@/schemas/schemas';
import { db } from '@/utils/sqLiteConfig';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';


export default function ToDoScreen() {
  const [showModal, setShowModal] = useState(false)
  const {data: session} = queries.useAuthStatus()
  const userId = session?.userId
  if(!userId){
    return <Text>User not logged in</Text>
  }
  const {data} = queries.useGetTodos(userId)


  function addTask(text: string){
      
  }

  function removeTask(id: string) {
    
  }


  async function deleteAllTasks () {
    const result = await db.insert(userTable).values([{ username: 'John', password: 'John1' }])
    console.log(result)
  }

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.title}>Todo list</Text>
      {data == null ? <Text style={styles.noTasks}>No tasks yet</Text> : 
        <FlatList style={styles.flatList} data={data} keyExtractor={(item,) => item.id.toString()} renderItem={({item, index}) => 
         <View style={styles.itemWrapper}>
         <Text style={styles.taskItem}>{`${index + 1}. ${item.text}`}</Text>
          <RemoveListItemButton onPress={() => removeTask(item.id.toString())} />
       </View>}/>
      }
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
  },
  noTasks: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
});

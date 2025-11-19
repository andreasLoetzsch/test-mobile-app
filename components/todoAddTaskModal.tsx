import { useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

type TodoModalProps = {
    visible: boolean,
    onClose: () => void,
    onSubmit: (task: string) => void
}

export const TodoAddTaskModal = ({visible, onClose, onSubmit}: TodoModalProps) => {
    const [taskText, setTaskText] = useState("")
    const handleSubmit = () => {
        if(!taskText.trim()) return;
        onSubmit(taskText);
        setTaskText("");
        onClose();
    }
    return (
        <Modal visible={visible} transparent animationType='slide'>
            <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPressOut={onClose}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <TextInput 
                     placeholder='Enter task'
                     value={taskText}
                     onChangeText={setTaskText}
                     />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a84ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
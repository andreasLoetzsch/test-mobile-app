import { StyleSheet, Pressable, Text, TouchableOpacity, View } from "react-native"
import { IconSymbol } from "./ui/icon-symbol.ios"

interface StandardButtonProps{
    title: string, 
    onPress: () => void,
    isDanger?: boolean,  
}
type ListButton= {
    onPress: () => void
}

export const StandardButton:  React.FC<StandardButtonProps> = ({
    title, onPress, isDanger =  false}: StandardButtonProps) => {

    const dangerStyle = {backgroundColor: "#DC2626"}
    const safeStyle = {backgroundColor: "#7CFC00"}
    return (
        <Pressable onPress={onPress} style={[styles.buttonStandard, isDanger ? dangerStyle : safeStyle]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export const AddListButton: React.FC<ListButton> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.addListButtonContainer}>
            <View style={styles.addListButtonIconWrapper}>
            <IconSymbol name="list.bullet" size={28} color="black"  />
            <IconSymbol name="plus.circle.fill" size={14} color="#0a84ff" style={styles.addListButtonPlusIcon} />
      </View>
    </TouchableOpacity>
    )
}

export const RemoveListItemButton: React.FC<ListButton> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
            <View style={styles.iconButtonContent}>
                <IconSymbol name="trash.fill" size={16} color="white"/>
            </View>
        </TouchableOpacity>
    )
}

 
const styles = StyleSheet.create({
    buttonStandard: {
        height: 40,
        width: 100,
        borderRadius: 25,
        justifyContent: 'center',
    },
    addListButtonContainer: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    addListButtonIconWrapper: {
        position: 'relative',
    },
    addListButtonPlusIcon: {
        position: 'absolute',
        bottom: -2,
        right: -2,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconButton: {
    backgroundColor: '#DC2626',
    height: 20,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  iconButtonContent: {
    flexDirection: 'row',
    gap: 6,
  },
})
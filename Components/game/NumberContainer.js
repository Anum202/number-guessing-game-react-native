import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors'

const NumberContainer = ({children}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}
export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent400,
        padding: 24,
        borderRadius: 8,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: Colors.accent400,
        fontFamily: 'open-sans-bold',
        fontSize: 36,
        // fontWeight: 'bold',
    },
}); 
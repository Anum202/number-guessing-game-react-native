import {View, Text, Image, StyleSheet} from 'react-native';
import Title from '../Components/ui/Title';
import PrimaryButton from '../Components/ui/PrimaryButton';
import Colors from '../constants/colors';

const GameOverScreen = ({roundsNumber, userNumber, onStartnewGame}) => {
    return (
        <View style={styles.rootContainer}>
            <Title>GAME OVER !</Title>
            <View style={styles.imgContainer}>
                <Image 
                    source={require('../assets/images/success.png')} 
                    style={styles.imgStyles}
                />
            </View>
            <Text style={styles.summaryText}>
                Your phone needed <Text style={styles.highlightText}>{roundsNumber} </Text> 
                rounds to guess the number <Text style={styles.highlightText}>{userNumber}</Text>.
            </Text>  
            <PrimaryButton onPress={onStartnewGame}>Start New Game</PrimaryButton>
        </View>

    )
}
export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36, 
    },
    imgStyles: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlightText: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    }
});
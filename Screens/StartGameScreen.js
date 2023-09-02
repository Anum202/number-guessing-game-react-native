import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import PrimaryButton from '../Components/ui/PrimaryButton';
import Title from '../Components/ui/Title';
import Card from '../Components/ui/Card';
import InstructionText from '../Components/ui/InstructionText';
import Colors from '../constants/colors';

const StartGameScreen = ({onPickNumber}) => {
    const [enteredNumber, setEnteredNumber] = useState('');

    const enteredNumberHandler = (e) => {
        setEnteredNumber(e);
    }

    const resetInputHandler = () => {
        setEnteredNumber('');
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert(
                'Invalid Number !',
                'Input must be a number between 1 and 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        onPickNumber(chosenNumber);
    }

    return(
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
            <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput 
                style={styles.input}
                maxLength={2}
                keyboardType='number-pad'
                value={enteredNumber}
                onChangeText={enteredNumberHandler}
            />
            <View style={styles.btnsContainer}>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.btnContainer}>                        
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>         
            </Card>
        </View>
    )
}
export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent400,
        borderBottomWidth: 2,
        color: Colors.accent400,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        
    },
    btnContainer:{
        flex: 1,
    },
});
import { useState, useEffect } from "react";
import {View, Text, StyleSheet, FlatList, Alert } from "react-native";
import {Ionicons} from '@expo/vector-icons';

import Title from "../Components/ui/Title";
import NumberContainer from "../Components/game/NumberContainer";
import PrimaryButton from '../Components/ui/PrimaryButton';
import InstructionText from "../Components/ui/InstructionText";
import Card from "../Components/ui/Card";
import GuessLogItem from "../Components/ui/GuessLogItem";

    //function to generate random number.
    function generateRandomNumber(min, max, exclude){
    const randomNum = Math.floor(Math.random() * (max - min)) + min;
    if(randomNum === exclude){
        generateRandomNumber(min, max, exclude);
    }
    else{
        return randomNum;
    }
}

    let minBoundary = 1;
    let maxBoundary = 100;

    const GameScreen = ({userNumber, onGameOver}) => {
    let initialGuess = generateRandomNumber(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() =>{
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess, userNumber, onGameOver]);

    useEffect(() =>{
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    const nextGuessHandler = (direction) => {  //direction => 'lower' or 'higher'
        if((direction === 'lower' && currentGuess < userNumber) || (direction === 'higher' && currentGuess > userNumber)){
            Alert.alert(
                "Don't lie !",
                "You know that this is wrong ...",
                [{text: 'Sorry !', style: 'cancel'}]
            );
            return;
        }
        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        console.log(minBoundary, maxBoundary);
        const newRandomNum = generateRandomNumber(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNum);
        setGuessRounds(previousRounds => [ newRandomNum, ...previousRounds]);
    }

    const guessRoundsListLength = guessRounds.length;


    return(
        <View style={styles.container}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
            <InstructionText style={styles.instructionText}>Lower or Higher ?</InstructionText>
            <View style={styles.btnsContainer}>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color='white'/>
                    </PrimaryButton>
                </View>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Ionicons name="md-add" size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
            </Card>
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound =><Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData) => 
                        <GuessLogItem 
                            roundNumber={guessRoundsListLength - itemData.index} 
                            guess={itemData.item}
                        />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}
export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    btnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        
    },
    btnContainer:{
        flex: 1,
    },
    instructionText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
})
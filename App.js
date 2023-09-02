import { useState, useEffect, useCallback } from 'react';
import {Text, StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from '@expo/vector-icons/Entypo';

import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const pickedNumberHandler = (pickedNumber) => {
      setUserNumber(pickedNumber);
      setGameIsOver(false);
  }

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/> 
  }
  if(userNumber && gameIsOver){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartnewGame={startNewGameHandler}/>
  }

  return (
    <LinearGradient colors={[Colors.primary700,Colors.accent400]} style={styles.container}>
      <ImageBackground 
        source={require('./assets/images/background-image.jpg')}
        style={styles.container}
        resizeMode={'cover'}
        imageStyle={styles.bgImageStyles}
        >
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
         {screen}
         {/* <Entypo name="rocket" size={50} /> */}
      </SafeAreaView>      
      </ImageBackground>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  bgImageStyles: {
    opacity: 0.15,
  }
});

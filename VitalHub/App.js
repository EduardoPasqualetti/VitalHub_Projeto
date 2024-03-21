import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from './src/screens/Navigation/Navigation';
import { Login } from './src/screens/Login/Login';
import { Register } from './src/screens/Register/Register';
import { VerifyEmail } from './src/screens/VerifyEmail/VerifyEmail';
import { ResetPwd } from './src/screens/ResetPwd/ResetPwd';
import { Recover } from './src/screens/Recover/Recover';
import { Profile } from './src/screens/Profile/Profile';

const Stack = createNativeStackNavigator()

import { useFonts, MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold } from '@expo-google-fonts/montserrat-alternates';
import { Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { MedicalRecord } from './src/screens/MedicalRecord/MedicalRecord';
import { Home } from './src/screens/Home/Home';
import { SelectClinic } from './src/screens/SelectClinic/SelectClinic';
import { SelectDoctor } from './src/screens/SelectDoctor/SelectDoctor';
import { SelectDate } from './src/screens/SelectDate/SelectDate';
import { SeeLocalAppointment } from './src/screens/SeeLocalAppointment/SeeLocalAppointment';
import { SeePrescription } from './src/screens/SeePrescription/SeePrescription';
import { Main } from './src/screens/Main/Main';
import { InsertRecord } from './src/screens/InsertRecord/InsertRecord';
import { Camera, CameraPhoto } from './src/components/Camera/Camera';


export default function App() {
  ''

  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_400Regular
  })

  if (!fontsLoaded && !fontsError) {
    return null
  }

  return (

    // Envolve a estrutura da navegacao
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Login"

          component={Login}

          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name='Main'

          component={Main}


        />

        {/* <Stack.Screen
          name='Navigation'

          component={Navigation}

          options={{ title: 'Navigation' }}
        /> */}

        <Stack.Screen
          name='Home'

          component={Home}

          options={{ title: 'Home' }}
        />


        <Stack.Screen
          name="MedicalRecord"

          component={MedicalRecord}

          options={{ title: 'MedicalRecord' }}
        />
        <Stack.Screen
          name="InsertRecord"

          component={InsertRecord}

          options={{ title: 'InsertRecord' }}
        />

        <Stack.Screen
          name="Register"

          component={Register}

          options={{ title: 'Register' }}
        />

        <Stack.Screen
          name="Profile"

          component={Profile}

          options={{ title: 'Profile' }}
        />

        <Stack.Screen
          name="Recover"

          component={Recover}

          options={{ title: 'Recover' }}
        />

        <Stack.Screen
          name="VerifyEmail"

          component={VerifyEmail}

          options={{ title: 'VerifyEmail' }}
        />

        <Stack.Screen
          name="ResetPwd"

          component={ResetPwd}

          options={{ title: 'ResetPwd' }}
        />
        <Stack.Screen
          name="SelectClinic"

          component={SelectClinic}

          options={{ title: 'SelectClinic' }}
        />
        <Stack.Screen
          name="SelectDoctor"

          component={SelectDoctor}

          options={{ title: 'SelectDoctor' }}
        />
        <Stack.Screen
          name="SelectDate"

          component={SelectDate}

          options={{ title: 'SelectDate' }}
        />

        <Stack.Screen
          name="SeeLocalAppointment"

          component={SeeLocalAppointment}

          options={{ title: 'SeeLocalAppointment' }}
        />
        <Stack.Screen
          name="SeePrescription"

          component={SeePrescription}

          options={{ title: 'SeePrescription' }}
        />
        <Stack.Screen
          name="CameraPhoto"

          component={CameraPhoto}

          options={{ title: 'CameraPhoto' }}
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
}


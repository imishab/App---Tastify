import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Adjust according to your store path
import Toast from 'react-native-toast-message';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerShown: false }} />
        <Stack.Screen name="check-out" options={{ headerShown: false }} />
        <Stack.Screen name="profile/account" options={{ headerShown: false }} />

      </Stack>
      <Toast />
    </Provider>
  );
};

export default RootLayout;

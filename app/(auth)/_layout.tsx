import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
    );
};
export default AuthLayout;

const styles = StyleSheet.create({});

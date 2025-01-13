import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAddAddressMutation } from '@/redux/api/UserApi';
import Toast from 'react-native-toast-message';

const AddAddressModal = ({ visible, onClose, refetch }) => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [addAddress, { isLoading }] = useAddAddressMutation();

    const handleSubmit = async () => {
        try {
            const response = await addAddress({ street, city, state, postalCode, country }).unwrap();

            Toast.show({
                type: 'success',
                text1: 'Address Added Successfuly!',
                position: 'top',
            });
            refetch(); // Trigger refetch to update the address list
            onClose();
        } catch (error) {
            console.error('Failed to add address:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.modalContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Add Address</Text>

                        <Text style={styles.label}>Street</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Street"
                            value={street}
                            onChangeText={setStreet}
                        />
                        <Text style={styles.label}>City</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="City"
                            value={city}
                            onChangeText={setCity}
                        />
                        <Text style={styles.label}>State</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="State"
                            value={state}
                            onChangeText={setState}
                        />
                        <Text style={styles.label}>Postal Code</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Postal Code"
                            value={postalCode}
                            onChangeText={setPostalCode}
                        />

                        <View style={styles.buttonContainer}>
                            <Button title="Submit" onPress={handleSubmit} disabled={isLoading} color="white" />
                            <Button title="Cancel" onPress={onClose} color="red" />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: "100%",
        padding: 30,
        top: 190,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#1E2022',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#BABABA',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 180,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
});

export default AddAddressModal;


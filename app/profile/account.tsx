import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OtherHeader from '@/components/HeaderTwo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDeleteAddressMutation, useGetUserProfileQuery } from '@/redux/api/UserApi';
import AddAddressModal from '@/components/AddressModel';
import { Trash2 } from 'lucide-react-native';


export default function AccountDetails() {
    const { data, error, isLoading, refetch } = useGetUserProfileQuery('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();

    // Loading state
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Error state
    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const handleDeleteAddress = (addressId: string) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this address?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteAddress(addressId).unwrap(); // Call the delete mutation
                            refetch(); // Refetch data after successful deletion
                            Alert.alert("Success", "Address deleted successfully.");
                        } catch (error) {
                            console.error("Failed to delete address:", error);
                            Alert.alert("Error", "Failed to delete the address. Please try again.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <OtherHeader />
            </View>
            <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
                <Text style={styles.sectionTitle}>Your Account Details</Text>
                <View style={styles.card}>
                    {/* Name Display */}
                    <Text style={styles.Title}>Basic Details</Text>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, marginTop: 0 }} />

                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={[styles.input]}
                            value={data?.name || ''}
                            placeholder="Enter your name"
                            placeholderTextColor="#C8C8C8"
                        />
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input]}
                            value={data?.email || ''}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            placeholderTextColor="#C8C8C8"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Phone Number Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={[styles.input]}
                            value={data?.phone || ''}
                            placeholder="Your Phone Number"
                            keyboardType="phone-pad"
                            placeholderTextColor="#C8C8C8"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Address List */}
                    <Text style={styles.Title}>Your Addresses</Text>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, marginTop: 0 }} />
                    {data?.addresses?.map((item: any) => (
                        <View key={item._id} style={styles.addressCard}>
                            <View style={styles.addressLeft}>
                                <Text style={styles.addressType}>{item.street}</Text>
                                <TouchableOpacity onPress={() => handleDeleteAddress(item._id)}>
                                    <Trash2 color='red' size={20} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.phoneNumber}>{item.city}, {item.state}, {item.postalCode}, {item.country}</Text>
                        </View>
                    ))}

                    {/* Add Address Button */}
                    <TouchableOpacity
                        style={styles.addAddress}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.addAddressText}>+ Add New Address</Text>
                    </TouchableOpacity>
                    <AddAddressModal
                        visible={isModalVisible}
                        onClose={() => setModalVisible(false)}
                        refetch={refetch}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensures header stays on top
    },
    card: {
        margin: 14,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    scrollContent: {
        flex: 1,
        marginTop: 50,
        backgroundColor: 'rgb(243, 243, 243)'
    },
    scrollContentContainer: {
        paddingBottom: 20,
    },
    inputContainer: {
        marginBottom: 14,
        paddingLeft: 20,
        paddingRight: 20,

    },
    addressCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#BABABA',
        shadowColor: '#000',

        elevation: 3,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    addressLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    addressType: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 0,
    },
    editIcon: {
        fontSize: 18,
        color: '#666',
    },
    phoneNumber: {
        color: '#666',
        marginBottom: 5,
    },
    address: {
        color: '#666',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: '#000',
    },
    addAddress: {
        backgroundColor: '#000',
        padding: 12,
        margin: 20,
        width: 150,
        borderRadius: 10,
        marginTop: 1,
        alignItems: 'center',
    },
    addAddressText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 0,
        marginLeft: 20,
    },
    Title: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 20,
        color: '#6b6b6b',
        marginBottom: 15,
        marginLeft: 20,
    },
    label: {
        fontSize: 14,
        color: '#1E2022',
        marginBottom: 8,
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

})
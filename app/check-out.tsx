import OtherHeader from '@/components/HeaderTwo';
import { useConfirmOrderMutation, useGetCartQuery, useGetUserProfileQuery } from '@/redux/api/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';

const CheckoutScreen = () => {
    const { data: cart, isLoading, error, refetch } = useGetCartQuery('');
    const [confirmOrder, { data, isSuccess }] = useConfirmOrderMutation();
    const { data: user, isLoading: any } = useGetUserProfileQuery('');


    const [selectedAddress, setSelectedAddress] = useState('home');
    const [selectedPayment, setSelectedPayment] = useState('credit');

    const paymentMethods = [
        { id: 'COD', name: 'Cash On Delivery', icon: require('../assets/images/icons/cod.png') },
        { id: 'UPI', name: 'UPI', icon: require('../assets/images/icons/upi.png') },

        { id: 'google', name: 'Google pay', icon: require('../assets/images/icons/gpay.png') },
    ];

    const addresses = [
        {
            id: 'home',
            type: 'Home',
            phone: '(875) 876-785',
            address: 'Sadia Villa, Habiganj',
        },
        {
            id: 'office',
            type: 'Office',
            phone: '(217) 555-0113',
            address: '6391 Elgin St. Habiganj',
        },
    ];

    const RadioButton = ({ selected }) => (
        <View style={[styles.radio, selected && styles.radioSelected]}>
            {selected && <View style={styles.radioInner} />}
        </View>
    );

    // Calculate subtotal price
    const calculateSubTotal = () => {
        return cart.items.reduce((total: any, item: any) => total + item.quantity * item.product.price, 0);
    };
    const subtotal = calculateSubTotal();

    // Calculate total price
    const calculateTotal = () => {
        return subtotal + 20;
    };
    const total = calculateTotal();

    // Order Confirmed
    const handleConfirmOrder = async () => {
        try {
            await confirmOrder('').unwrap();
            router.replace('/order-placed');

        } catch (err) {
            alert(`Order failed:`);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            Toast.show({
                type: 'success',
                text1: 'Your Products Has Been Successfully Ordered!',
                position: 'top',
            });
        }
    }, [isSuccess]);


    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (userInfo) {
                    setUserInfo(JSON.parse(userInfo));
                }
            } catch (error) {
                console.error('Failed to load user details', error);
            }
        };

        getUserDetails();
    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <OtherHeader />
            </View>

            <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
                <Text style={styles.sectionTitle}>Shipping to</Text>

                {user?.addresses?.map((item: any) => (
                    <TouchableOpacity
                        key={item._id}
                        style={styles.addressCard}
                        onPress={() => setSelectedAddress(item._id)}
                    >
                        <View style={styles.addressHeader}>
                            <View style={styles.addressLeft}>
                                <RadioButton selected={selectedAddress === item._id} />
                                <Text style={styles.addressType}>{item.street}</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.editIcon}>✎</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.phoneNumber}>{item.city}, {item.state},</Text>
                        <Text style={styles.phoneNumber}>{item.postalCode}, {item.country}</Text>

                    </TouchableOpacity>
                ))}

                <Link href="/profile/account" style={styles.addAddress}>
                    <Text style={styles.addAddressText}>Manage Your Addresse</Text>
                </Link>

                <Text style={styles.sectionTitle}>Payment Method</Text>

                {paymentMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={styles.paymentOption}
                        onPress={() => setSelectedPayment(method.id)}
                    >
                        <View style={styles.paymentLeft}>
                            <Image source={method.icon} style={styles.paymentIcon} />
                            <Text style={styles.paymentName}>{method.name}</Text>
                        </View>
                        <RadioButton selected={selectedPayment === method.id} />
                    </TouchableOpacity>
                ))}

                {/* Add padding at bottom to ensure content isn't hidden behind fixed footer */}
                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Fixed Footer */}
            <View style={styles.fixedFooter}>
                <View style={styles.totalSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Sub total</Text>
                        <Text style={styles.totalAmount}>{subtotal}/-</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Delivery Charge</Text>
                        <Text style={styles.totalAmount}>20/-</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.finalAmount}>{total}/-</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.placeOrderButton} onPress={handleConfirmOrder}>
                    <Text style={styles.placeOrderText}>Place to Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    scrollContent: {
        flex: 1,
        marginTop: 50,
        backgroundColor: 'rgb(243, 243, 243)'
    },
    scrollContentContainer: {
        paddingBottom: 20,
    },
    backButton: {
        fontSize: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    cartIcon: {
        backgroundColor: '#000',
        borderRadius: 15,
        padding: 5,
    },
    cartCount: {
        color: '#fff',
        fontSize: 12,
    },
    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensures header stays on top
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 15,
        marginLeft: 20,
    },
    addressCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
    },
    addressType: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
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
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 0,
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
    },
    paymentName: {
        fontSize: 16,
    },
    bottomSpacing: {
        height: 200, // Adjust this value based on your footer height
    },
    fixedFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: -3,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        // elevation: 5,
    },
    totalSection: {
        marginBottom: 15,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 16,
        color: '#666',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: '500',
    },
    finalAmount: {
        fontSize: 18,
        fontWeight: '600',
    },

    addAddress: {
        backgroundColor: '#000',
        padding: 12,
        margin: 20,
        width: 170,
        borderRadius: 10,
        marginTop: 1,
        alignItems: 'center',
    },
    addAddressText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    placeOrderButton: {
        backgroundColor: '#000',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
    },
    placeOrderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CheckoutScreen;
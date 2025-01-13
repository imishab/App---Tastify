import OtherHeader from '@/components/HeaderTwo';
import { useGetCartQuery } from '@/redux/api/UserApi';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';


const CartScreen = () => {
    const { data: cart, isLoading, error, refetch } = useGetCartQuery('');

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error.error}</Text>
            </View>
        );
    }

    // QuantityControl Component
    const QuantityControl = ({ itemId, quantity, updateQuantity }) => (
        <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(itemId, quantity - 1)}>
                <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(itemId, quantity + 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );

    // Function to update the quantity
    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity <= 0) return; // Prevent quantity from going below 1

        try {
            await refetch();
        } catch (err) {
            console.error('Error updating cart:', err);
        }
    };

    // Calculate total price
    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
    };

    const total = calculateTotal();

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <OtherHeader />
            </View>
            {cart.items.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                </View>
            ) : (
                <ScrollView style={styles.itemList}>
                    <Text style={styles.cartText}>Your Cart</Text>
                    {cart.items.map((item) => (
                        <View key={item.product._id} style={styles.cartItem}>
                            <View style={styles.itemImage}>
                                <Image
                                    source={{ uri: `http://192.168.1.5:4000${item.product.image}` }}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.product.title}</Text>
                                <Text style={styles.itemPrice}>{item.product.price}/-</Text>
                                <Text style={styles.itemPrice}>{item.product.price} x {item.quantity}</Text>
                            </View>
                            <QuantityControl
                                itemId={item.product._id}
                                quantity={item.quantity}
                                updateQuantity={updateQuantity}
                            />
                        </View>
                    ))}
                </ScrollView>
            )}

            {cart.items.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalPrice}>{total}/-</Text>
                    </View>
                    <View style={styles.totalbtnContainer}>
                        <Link href="/menu" style={styles.addmoreButton}>
                            <Text style={styles.addmoreButtonText}>Add More Products</Text>
                        </Link>
                        <Link href="/check-out" style={styles.buyButton}>
                            <Text style={styles.buyButtonText}>Buy Now</Text>
                        </Link>
                    </View>
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(243, 243, 243)'
    },
    emptyCartText: {
        fontSize: 18,
        color: '#555',
        fontWeight: 'bold',
    },
    cartText: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: 700
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        fontSize: 24,
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensures header stays on top
    },
    itemList: {
        flex: 1,
        marginTop: 100,
        backgroundColor: 'rgb(243, 243, 243)'

    },
    cartItem: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: 'rgb(143, 143, 143)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemSize: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        color: '#666',
    },
    quantityText: {
        marginHorizontal: 15,
        fontSize: 16,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingBottom: 30,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    totalLabel: {
        fontSize: 18,
        fontWeight: '500',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '600',
        color: '#f4511e',
    },
    totalbtnContainer: {
        flexDirection: 'row',  // Arrange items horizontally
        justifyContent: 'space-between', // Space between buttons
        alignItems: 'center',  // Center items vertically
        paddingHorizontal: 0, // Add some padding on sides
        marginVertical: 1,    // Add some vertical margin
    },
    buyButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 1,
        borderRadius: 8,
        width: '49%',
    },
    addmoreButton: {
        backgroundColor: 'rgb(224, 224, 224)',
        paddingVertical: 12,
        paddingHorizontal: 1,
        borderRadius: 8,
        width: '49%',
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 13,
        padding: 5,
        fontWeight: 700,
        textAlign: 'center',
    },
    addmoreButtonText: {
        color: '#000',
        fontSize: 13,
        padding: 5,
        fontWeight: 700,
        textAlign: 'center',
    }
});

export default CartScreen;
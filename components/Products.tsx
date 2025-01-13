import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useAddToCartMutation, useGetProductsQuery } from '@/redux/api/UserApi';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';

const Products = () => {
    const { data: products, isLoading, isError, error } = useGetProductsQuery('');

    const [addToCart] = useAddToCartMutation();

    // State to manage loading for individual products
    const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

    // State to track products added to the cart
    const [cartProducts, setCartProducts] = useState<Set<string>>(new Set());

    // Handle add to cart
    const handleAddToCart = async (productId: string) => {
        try {
            setLoadingProduct(productId); // Set loading state for the specific product
            await addToCart({
                productId,
                quantity: 1,
            }).unwrap();

            // Update cartProducts state to include the added product
            setCartProducts((prev) => new Set(prev).add(productId));

            Toast.show({
                type: 'success',
                text1: 'Product Added to the Cart!',
                position: 'top',
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to add product to cart. Please try again.');
            console.error('Add to cart error:', error);
        } finally {
            setLoadingProduct(null); // Reset loading state
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (isError) {
        console.error('Error fetching products:', error);
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load products.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.productHeading}>All Products</Text>
            <View style={styles.row}>
                {products.map((product: {
                    _id: string;
                    title: string;
                    desc: string;
                    price: number;
                    mrp: number;
                    category: string;
                    image: string;
                }) => (
                    <View
                        key={product._id}
                        style={[styles.card, { backgroundColor: '#fff' }]}
                    >
                        <Link href={`/product/${product._id}`}>

                            {/* Product Image */}

                            <Image
                                source={{ uri: `http://192.168.1.5:4000${product.image}` }} // Wrap the URL in an object with `uri`
                                style={styles.image}
                                resizeMode="contain"
                            />


                            {/* Product Title */}
                            <Text style={styles.title}>{product.title}</Text>

                            {/* Price */}
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>Rs.{product.price}/-</Text>
                                <Text style={styles.mrp}>Rs.{product.mrp}/-</Text>
                            </View>
                        </Link>
                        {/* Buy Now Button */}
                        {/* Add to Cart or View Cart Button */}
                        {cartProducts.has(product._id) ? (
                            <TouchableOpacity
                                style={[styles.button, styles.viewCartButton]}
                                onPress={() => router.push('/cart')}
                            >
                                <Text style={styles.viewCartText}>View Cart</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    loadingProduct === product._id && styles.disabledButton,
                                ]}
                                onPress={() => handleAddToCart(product._id)}
                                disabled={loadingProduct === product._id}
                            >
                                <Text style={styles.buttonText}>
                                    {loadingProduct === product._id ? 'Adding...' : 'Add to cart'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 4,
        shadowRadius: 10,
    },
    image: {
        width: '100%',
        height: 150,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    mrp: {
        fontSize: 12,
        color: 'gray', // Customize as needed
        textDecorationLine: 'line-through',
        marginTop: -10
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        marginVertical: 5,
        color: '#000',
    },
    productHeading: {
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 5,
        marginBottom: 15,
        color: '#000',
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        color: '#000',
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
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
        color: 'red',
        fontSize: 16,
    },
    viewCartButton: {
        backgroundColor: '#28a745',
    },
    viewCartText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Products;

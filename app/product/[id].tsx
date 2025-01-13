import { useAddToCartMutation, useGetProductByIdQuery, UserApi } from "@/redux/api/UserApi";
import Button from "@/components/Button";
import OtherHeader from "@/components/HeaderTwo";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const ProductPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    // Get the addToCart mutation
    const [addToCart, { isLoading: isAddingToCart, isSuccess }] = UserApi.useAddToCartMutation();

    // Handle add to cart
    const handleAddToCart = async () => {
        try {
            await addToCart({
                productId: id,
                quantity: 1
            }).unwrap();

            // Replace the current route with cart instead of pushing a new route
            router.replace('/cart');

        } catch (error) {
            Alert.alert('Error', 'Failed to add product to cart. Please try again.');
            console.error('Add to cart error:', error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            Toast.show({
                type: 'success',
                text1: 'Product Added to the Cart!',
                position: 'top',
            });
        }
    }, [isSuccess]);

    if (!id) {
        return <Text>This Product is not Available</Text>;
    }

    const { data: product, isLoading, error } = useGetProductByIdQuery(id);

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching product details.</Text>;
    return (

        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerWrapper}>
                    <OtherHeader />
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.container}>
                        {/* Image Slider */}
                        <Swiper style={styles.swiper} showsPagination={true}>

                            <Image source={{ uri: `http://192.168.1.5:4000${product.image}` }} style={styles.image} />

                        </Swiper>

                        {/* Product Details */}
                        <ScrollView style={styles.details}>
                            <Text style={styles.brand}>Tastify's</Text>
                            <Text style={styles.title}>{product.title}</Text>
                            <Text style={styles.category}>{product.category}</Text>

                            {/* Ratings */}
                            <View style={styles.ratingContainer}>
                                <Text style={styles.star}>★★★★☆</Text>
                            </View>

                            {/* Price Section */}
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>₹{product.price}</Text>
                                <Text style={styles.mrp}>₹{product.mrp}</Text>
                            </View>

                            {/* About Section */}
                            <Text style={styles.heading}>About Product</Text>
                            <Text style={styles.description}>{product.desc}</Text>

                        </ScrollView>


                    </View>
                </ScrollView>

            </SafeAreaView>
            {/* Bottom Fixed Section */}
            <View style={styles.bottomSection}>
                <Text style={styles.totalPrice}> ₹{product.price}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        text={isAddingToCart ? "Adding..." : "Add to cart"}
                        bgColor="#DDDDDD"
                        textColor="#000"
                        onPress={handleAddToCart}
                        disabled={isAddingToCart}
                    />
                    {/* <Button
                        text="Buy now"
                        bgColor="#000"
                        textColor="#FFFFFF"
                        onPress={''}
                    /> */}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        marginTop: 50, // Adjust this value based on the header height
    },
    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensures header stays on top
    },
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    swiper: {
        height: 350,
        marginBottom: 130
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    details: {
        padding: 16,
        paddingTop: 30,
        backgroundColor: "#fff",
        flex: 1,
        height: 500
    },
    brand: {
        fontSize: 14,
        color: "gray",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 4,
    },
    category: {
        fontSize: 16,
        color: "gray",
    },
    ratingContainer: {
        marginVertical: 8,
    },
    star: {
        fontSize: 16,
        color: "#ffa500",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green",
        marginRight: 8,
    },
    mrp: {
        fontSize: 16,
        color: "gray",
        textDecorationLine: "line-through",
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#333",
    },
    bottomSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    totalPrice: {
        fontSize: 25,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 5
    },
    cartButton: {
        backgroundColor: "#fff",
        padding: 12,
        color: "#000",
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 8,
    },
    buyButton: {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    buttonTextTwo: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
    },
});

export default ProductPage;

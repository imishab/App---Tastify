import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';

// Local Images
import p1 from '../assets/images/products/p1.png';
import p2 from '../assets/images/products/p2.png';
import p3 from '../assets/images/products/p1.png';

const products = [
    {
        id: 1,
        title: 'Chicken Powder',
        price: 'Rs.250/-',
        image: p1,
        bgColor: '#FFEDD5',
        subtitle: 'Curry Powders'
    },
    {
        id: 2,
        title: 'Red Chilli Powder',
        price: 'Rs.250/-',
        image: p2,
        bgColor: '#E0E7FF',
        subtitle: 'Curry Powders'

    },
    {
        id: 3,
        title: 'Cheese Powder',
        price: 'Rs.250/-',
        image: p3,
        bgColor: '#DBEAFE',
        subtitle: 'Curry Powders'

    },
];

const ProductSlider = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {products.map((product) => (
                    <View
                        key={product.id}
                        style={[styles.card, { backgroundColor: product.bgColor }]}
                    >
                        {/* Product Title */}
                        <Text style={styles.subtitle}>{product.subtitle}</Text>
                        {/* Product Title */}
                        <Text style={styles.title}>{product.title}</Text>
                        {/* Product Image */}
                        <Image
                            source={product.image}
                            style={styles.image}
                            resizeMode="contain"
                        />



                        {/* Price */}
                        <Text style={styles.price}>{product.price}</Text>

                        {/* Buy Now Button */}
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 0,
    },
    scrollContainer: {
        paddingHorizontal: 0,
    },
    card: {
        width: 200,
        borderRadius: 10,
        padding: 15,
        marginRight: 15,
        elevation: 4,
        shadowRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 2,
        color: '#000',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '500',
        marginVertical: 0,
        marginTop: 10,
        color: '#787878',
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
});

export default ProductSlider;

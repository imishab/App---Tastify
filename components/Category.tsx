import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useGetCategoriesQuery } from '@/redux/api/UserApi';

interface Category {
    _id: string;
    title: string;
}

const Category = () => {
    const { data: fetchedCategories = [], isLoading, isError, error } = useGetCategoriesQuery('');
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Prepend the default "All" category
    const categories: Category[] = [
        { _id: 'all', title: 'All' },
        ...fetchedCategories,
    ];

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (isError) {
        console.error('Error fetching categories:', error);
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load categories.</Text>
            </View>
        );
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
        >
            {categories.map((category: Category) => (
                <TouchableOpacity
                    key={category._id}
                    style={styles.categoryTab}
                    onPress={() => setActiveCategory(category._id)}
                >
                    <Text style={activeCategory === category._id ? styles.activeTabText : styles.tabText}>
                        {category.title}
                    </Text>
                    {activeCategory === category._id && <View style={styles.activeUnderline} />}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};


export default Category

const styles = StyleSheet.create({
    categoryContainer: {
        paddingLeft: 20,
    },
    categoryTab: {
        marginRight: 20,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
        color: '#aaa',
    },
    activeTabText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    activeUnderline: {
        height: 2,
        width: '100%',
        backgroundColor: '#000',
        marginTop: 5,
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
})
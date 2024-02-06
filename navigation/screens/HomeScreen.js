import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import WelcomeMessage from '../../components/WelcomeMessage';
import FlashSales from '../../components/FlashSales';
import Electronics from '../../components/Electronics';
import PhoneTablets from '../../components/Phones&Tablets';
import Appliances from '../../components/Appliances';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  categoryItem: {
    flexBasis: '48%',
    marginBottom: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    height: 150,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
});

export default function HomeScreen({ navigation }) {
  const categoryName = [
    "Electronics",
    "Gaming",
    "Phones & Tablets",
    "Health & Beauty",
    "Appliances",
    "Supermarket"
  ];

  const categoryImage = [
    "https://ng.jumia.is/cms/0-1-homepage/0-0-thumbnails/2024/tv.png",
    "https://ng.jumia.is/cms/0-5-brand-festival/2023/Consumer-deals/300x400/gaming-deals.png",
    "https://ng.jumia.is/cms/0-1-homepage/0-0-thumbnails/2024/Smartphone.jpg",
    "https://ng.jumia.is/cms/0-1-category-pages/health-beauty/300x400/skin-care.jpg",
    "https://ng.jumia.is/cms/0-1-category-pages/appliances/300x400/fridges_300x400.png",
    "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/w35-Grocery/Gadget-upgrade/Grocery-big-savings/Artboard_1_copy_5.jpg"
  ];

  const handleCategoryPress = (item) => {
    // Navigate to the Details screen and pass the selected category and tab as parameters
    navigation.navigate('Categories', { selectedCategory: item });
  };

  const renderCategoryItem = (item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleCategoryPress(item)}
      style={styles.categoryItem}
    >
      <Image source={{ uri: categoryImage[index] }} style={{ width: 80, height: 80, marginBottom: 10 }} />
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <WelcomeMessage />
      <View style={styles.categoryContainer}>
        {categoryName.map((item, index) => renderCategoryItem(item, index))}
      </View>
      <FlashSales />
      <Electronics />
      <PhoneTablets />
      <Appliances />
    </ScrollView>
  );
}

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CarCard = ({ carName, carImage }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{carName}</Text>
      {carImage ? (
        <Image source={{ uri: carImage }} style={styles.image} />
      ) : (
        <Text>Imagem não encontrada</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#eee'
  },
  name: {
    fontSize: 18,
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 120,
    resizeMode: 'contain'
  }
});

export default CarCard;

import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = ({ onOpenMenu }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <TouchableOpacity onPress={onOpenMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color={colors.text} />
      </TouchableOpacity>

      {/* Pode manter logo ou título aqui */}

      <TouchableOpacity style={styles.imageButton}>
        <Image
          source={require('../assets/logo-removebg-preview 1.svg')} // caminho da imagem local
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 5,
  },
  imageButton: {
    padding: 5,
  },
  image: {
    width: 45,
    height: 45,
  },
});

export default Header;

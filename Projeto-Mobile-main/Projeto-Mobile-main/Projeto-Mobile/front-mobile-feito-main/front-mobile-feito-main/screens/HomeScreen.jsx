import React, { useState, useContext, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Animated,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import CarCard from '../components/CarCard';
import { getCarImage, saveOrUpdateCar, deleteCar } from '../services/api';
import { ThemeContext } from '../contexts/ThemeContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  const [carName, setCarName] = useState('');
  const [carImage, setCarImage] = useState(null);
  const { colors, isDark, toggleTheme } = useContext(ThemeContext);
  const { favorites, addFavorite, removeFavorite, isFavorite, updateFavorite } = useContext(FavoritesContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const [modalVisible, setModalVisible] = useState(false);
  const [favoriteDescription, setFavoriteDescription] = useState('');
  const [favoriteRating, setFavoriteRating] = useState('');
  const [editingCarId, setEditingCarId] = useState(null);

  const handleSearch = async () => {
    if (!carName.trim()) {
      return;
    }
    try {
      const image = await getCarImage(carName);
      setCarImage(image);
      setEditingCarId(null);
    } catch (error) {
      console.error('Erro ao buscar imagem do carro:', error);
    }
  };

  const saveFavorite = async () => {
    const ratingNumber = parseInt(favoriteRating);
    if (!carName.trim()) {
      return;
    }

    const carData = {
      id: editingCarId || null,
      nome: carName,
      imagem: carImage,
      descricao: favoriteDescription || '',
      rating: isNaN(ratingNumber) ? null : ratingNumber,
      isFavorite: true,
    };

    try {
      const savedCar = await saveOrUpdateCar(carData);
      if (isFavorite(carName)) {
        updateFavorite({
          id: savedCar.id,
          carName,
          carImage: savedCar.imagem,
          description: savedCar.descricao,
          rating: savedCar.rating,
        });
      } else {
        addFavorite({
          id: savedCar.id,
          carName,
          carImage: savedCar.imagem,
          description: savedCar.descricao,
          rating: savedCar.rating,
        });
      }
      setEditingCarId(savedCar.id);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
    }
  };

  const deleteFavorite = async () => {
    if (!carName || !editingCarId) {
      return;
    }
    try {
      await deleteCar(editingCarId);
      removeFavorite(carName);
      setModalVisible(false);
      setFavoriteDescription('');
      setFavoriteRating('');
      setEditingCarId(null);
      setCarImage(null);
    } catch (error) {
      console.error('Erro ao deletar favorito:', error);
    }
  };

  const handleFavoritePress = () => {
    if (!carName) {
      return;
    }
    if (isFavorite(carName)) {
      const fav = favorites.find((f) => f.carName === carName);
      setFavoriteDescription(fav?.description || '');
      setFavoriteRating(fav?.rating?.toString() || '');
      setEditingCarId(fav?.id || null);
      setCarImage(fav?.carImage || carImage);
    } else {
      setFavoriteDescription('');
      setFavoriteRating('');
      setEditingCarId(null);
    }
    setModalVisible(true);
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const handleToggleTheme = () => {
    toggleTheme();
    closeMenu();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header onFavorite={handleFavoritePress} onOpenMenu={openMenu} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.primary,
              backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
              shadowColor: colors.shadow,
            },
          ]}
          placeholder="Digite o nome do carro"
          placeholderTextColor={colors.text + '88'}
          value={carName}
          onChangeText={setCarName}
          autoCapitalize="words"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSearch}
            activeOpacity={0.85}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {carImage && (
          <TouchableOpacity onPress={handleFavoritePress} activeOpacity={0.9}>
            <CarCard carName={carName} carImage={carImage} style={styles.carCard} />
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground || colors.background }]}>
            <ScrollView
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {carImage && (
                <View style={styles.modalImageContainer}>
                  <Image source={{ uri: carImage }} style={styles.modalImage} resizeMode="contain" />
                </View>
              )}

              <View style={styles.modalBody}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Favoritar Carro</Text>

                <View style={styles.favoriteRow}>
                  <Text style={[styles.modalLabel, { color: colors.text }]}>Favorito:</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (isFavorite(carName)) removeFavorite(carName);
                      else addFavorite({ id: editingCarId, carName, carImage, description: favoriteDescription, rating: parseInt(favoriteRating) || 0 });
                    }}
                    style={{ marginLeft: 10 }}
                  >
                    <Ionicons
                      name={isFavorite(carName) ? 'star' : 'star-outline'}
                      size={24}
                      color={isFavorite(carName) ? '#ffd700' : colors.text}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.modalLabel, { color: colors.text }]}>Descrição:</Text>
                <TextInput
                  style={[styles.modalInput, { color: colors.text, borderColor: colors.primary, backgroundColor: isDark ? '#222' : '#fff' }]}
                  multiline
                  numberOfLines={2}
                  value={favoriteDescription}
                  onChangeText={setFavoriteDescription}
                  placeholder="Escreva uma descrição"
                  placeholderTextColor={colors.text + '88'}
                />

                <Text style={[styles.modalLabel, { color: colors.text }]}>Nota (1 a 5):</Text>
                <TextInput
                  style={[styles.modalInput, { color: colors.text, borderColor: colors.primary, backgroundColor: isDark ? '#222' : '#fff' }]}
                  keyboardType="numeric"
                  value={favoriteRating}
                  onChangeText={(val) => {
                    if (/^[1-5]?$/.test(val)) setFavoriteRating(val);
                  }}
                  placeholder="Digite uma nota"
                  placeholderTextColor={colors.text + '88'}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: '#000' }}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={saveFavorite}
                    style={[styles.modalButton, { backgroundColor: colors.primary }]}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: colors.buttonText }}>Salvar</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={deleteFavorite}
                  style={[styles.modalButton, { backgroundColor: 'red', marginTop: 10 }]}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: '#fff' }}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {menuVisible && (
        <Pressable style={styles.menuOverlay} onPress={closeMenu}>
          <Animated.View
            style={[
              styles.menuContainer,
              {
                backgroundColor: colors.cardBackground || colors.background,
                transform: [{ translateY: slideAnim }],
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            ]}
          >
            <TouchableOpacity onPress={handleToggleTheme} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: colors.text }]}>
                Alternar Tema {isDark ? '(Claro)' : '(Escuro)'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: colors.text }]}>Fechar Menu</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60 },
  input: { marginBottom: 20, borderWidth: 1, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 14, fontSize: 18, fontWeight: '600' },
  buttonsContainer: { marginBottom: 20, flexDirection: 'row', justifyContent: 'center' },
  button: { paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
  buttonText: { fontSize: 18, fontWeight: '600' },
  carCard: { marginBottom: 30 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000099' },
  modalContent: { maxHeight: height * 0.75, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalScrollContent: { paddingBottom: 20 },
  modalImageContainer: { marginBottom: 15, alignItems: 'center' },
  modalImage: { width: 220, height: 140, borderRadius: 15 },
  modalBody: { flex: 1 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  favoriteRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  modalLabel: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  modalInput: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 15, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 5 },
  menuOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#00000099', justifyContent: 'flex-end' },
  menuContainer: { paddingVertical: 20 },
  menuItem: { paddingVertical: 15, paddingHorizontal: 25 },
  menuText: { fontSize: 18 },
});

export default HomeScreen;

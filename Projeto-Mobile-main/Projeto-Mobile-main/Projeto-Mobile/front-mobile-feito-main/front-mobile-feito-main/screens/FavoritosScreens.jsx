import React, { useContext } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { ThemeContext } from '../contexts/ThemeContext';

const FavoritosScreens = () => {
  const { favorites } = useContext(FavoritesContext);
  const { colors } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.text }]}>
        <Text style={[styles.headerText, { color: colors.text }]}>
          Seus Favoritos
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Você não tem favoritos ainda.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {favorites.map(({ carName, carImage, description, rating }) => (
            <View
              key={carName}
              style={[
                styles.card,
                {
                  backgroundColor:
                    colors.cardBackground ||
                    (colors.background === '#fff' ? '#fafafa' : '#222'),
                },
              ]}
            >
              {carImage && <Image source={{ uri: carImage }} style={styles.image} />}
              <Text style={[styles.carName, { color: colors.text }]}>{carName}</Text>
              <Text style={[styles.description, { color: colors.text }]}>
                {description || 'Sem descrição'}
              </Text>
              <Text style={[styles.rating, { color: colors.text }]}>
                Nota: {rating || '-'}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

  content: {
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexGrow: 1,
  },

  card: {
    borderRadius: 16,
    marginBottom: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 14,
    resizeMode: 'cover',
  },

  carName: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },

  description: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 6,
  },

  rating: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritosScreens;

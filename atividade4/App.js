import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Certifique-se de ter este pacote instalado
import Slider from '@react-native-community/slider'; // Certifique-se de ter este pacote instalado

const { width } = Dimensions.get('window');

const games = [
  {
    id: '1',
    title: 'The Legend of Zelda: Breath of the Wild',
    description: 'Explore o vasto mundo de Hyrule.',
    genre: 'Aventura',
    platform: 'Switch',
    price: 60,
    rating: 4.5,
    image: { uri: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58' },
    detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WCQ9_nHkaqH_QtyL_s0peNmp2uOEQfHASQ&s' },
    details: 'Explore Hyrule, resolva quebra-cabeças e derrote Ganon.',
  },
  {
    id: '2',
    title: 'Super Mario Odyssey',
    description: 'Uma aventura 3D com Mario.',
    genre: 'Plataforma',
    platform: 'Switch',
    price: 50,
    rating: 4.8,
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLg6b7dU4wgzpI5GNn9d_F7Kq3G5l4wVuAQ&s'},
    detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTujOdunJtWItE1MOVp0hcDC5ZId9r66bN5kA&s' },
    details: 'Junte-se a Cappy e resgate a Princesa Peach de Bowser.',
  },
  {
    id: '3',
    title: 'Grand Theft Auto V',
    description: 'Entre na vida em mundo aberto em Grand Theft Auto 5.',
    genre: 'Ação',
    platform: 'PS5',
    price: 40,
    rating: 4.7,
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQStVTI8S4EJwiSfcVT5xVE2qWW6QYLsz5qxg&s' },
    detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ifecCibtWnUE6QuOEliuLycFSd_TEs2w9Q&s' },
    details: 'O jogo se passa no estado ficcional de San Andreas.',
  },
  {
    id: '4',
    title: 'Minecraft',
    description: 'Construa, explore e sobreviva em um mundo de blocos.',
    genre: 'Aventura',
    platform: 'PC',
    price: 20,
    rating: 4.6,
    image: { uri: 'https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70070000016597/0a33bcaba879403460afe2ff2aafaaefeede964e0fc11a430f71077867cc87f1' },
    detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7UDXus26LStMAUP1D1BrVaREch1hzM17BA&s' },
    details: 'Minecraft é um jogo sandbox que permite aos jogadores explorar.',
  },
  {
    id: '5',
    title: 'Fortnite',
    description: 'Participe do battle royale e seja o último a ficar de pé.',
    genre: 'Ação',
    platform: 'PC',
    price: 0,
    rating: 4.3,
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutINIkdfG4OGdZJ0dVi4jLJ4KR93o_vyUHg&s' },
    detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOMLj3xZrPA3behYJwVtV3ghYtysbdyAywg&s' },
    details: 'Fortnite é um jogo de battle royale.',
  },
  {
    id: '6',
    title: 'Cyberpunk 2077',
    description: 'Explore o mundo aberto de Night City neste RPG futurista.',
    genre: 'RPG',
    platform: 'PS5',
    price: 45,
    rating: 4.0,
    image: { uri: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/5ce6513b3343bf3c37a97d5894f91f5d2862371e7b502841.png' },
    detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UpvfCuJ8tJMei0YmoWow-WzlKIUHZFpB_A&s' },
    details: 'Cyberpunk 2077 é um RPG de mundo aberto.',
  },
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedPlatform, setSelectedPlatform] = useState('Todas');
  const [priceRange, setPriceRange] = useState(60); // Ajustado para um valor máximo mais realista

  const genres = ['Todos', 'Aventura', 'Plataforma', 'RPG', 'Ação'];
  const platforms = ['Todas', 'Switch', 'PS5', 'Xbox', 'PC'];

  const filteredGames = games.filter(game =>
    (selectedGenre === 'Todos' || game.genre === selectedGenre) &&
    (selectedPlatform === 'Todas' || game.platform === selectedPlatform) &&
    (game.price <= priceRange)
  );

  const toggleFavorite = (game) => {
    setFavoriteGames((prevFavorites) => {
      if (prevFavorites.includes(game.id)) {
        return prevFavorites.filter((id) => id !== game.id);
      } else {
        return [...prevFavorites, game.id];
      }
    });
  };

  const renderGameItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedGame(item)}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <FontAwesome
                name={favoriteGames.includes(item.id) ? 'star' : 'star-o'}
                size={24}
                color={favoriteGames.includes(item.id) ? '#ffd700' : '#ccc'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catálogo de Jogos</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://cms-assets.xboxservices.com/assets/ae/50/ae508467-2673-43d5-9fb9-53570ac3a51d.jpg?n=XGPU_Super-Hero-1400_Update-10-31-24_1920x1080.jpg' }}
          style={styles.middleImage}
        />
      </View>

      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedGenre}
            onValueChange={(itemValue) => setSelectedGenre(itemValue)}
          >
            {genres.map((genre) => (
              <Picker.Item key={genre} label={genre} value={genre} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPlatform}
            onValueChange={(itemValue) => setSelectedPlatform(itemValue)}
          >
            {platforms.map((platform) => (
              <Picker.Item key={platform} label={platform} value={platform} />
            ))}
          </Picker>
        </View>

        <View style={styles.sliderContainer}>
          <Text>Preço: até ${priceRange}</Text>
          <Slider
            minimumValue={0}
            maximumValue={60}
            step={1}
            value={priceRange}
            onSlidingComplete={(value) => setPriceRange(value)}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {favoriteGames.length > 0 && (
          <View>
            <Text style={styles.subHeader}>Favoritos</Text>
            <FlatList
              data={games.filter((game) => favoriteGames.includes(game.id))}
              keyExtractor={(item) => item.id}
              renderItem={renderGameItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <Text style={styles.subHeader}>Todos os Jogos</Text>
        <FlatList
          data={filteredGames}
          keyExtractor={(item) => item.id}
          renderItem={renderGameItem}
          showsVerticalScrollIndicator={false}
          extraData={favoriteGames} // Adiciona extraData para garantir que a lista seja re-renderizada corretamente
        />
      </ScrollView>

      {selectedGame && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedGame}
          onRequestClose={() => setSelectedGame(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedGame.title}</Text>
                <Image source={selectedGame.detailsImage} style={styles.detailsImage} />
                <Text style={styles.modalDescription}>{selectedGame.details}</Text>
                <TouchableOpacity onPress={() => setSelectedGame(null)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  middleImage: {
    width: width - 20,
    height: 180,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  detailsImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
});
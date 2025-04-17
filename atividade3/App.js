import React, { useState } from 'react';
 import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
 
 const games = [
   {
     id: '1',
     title: 'The Legend of Zelda: Breath of the Wild',
     description: 'Explore o vasto mundo de Hyrule nesta aventura de mundo aberto.',
     image: { uri: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58' },
     detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WCQ9_nHkaqH_QtyL_s0peNmp2uOEQfHASQ&s' },
     details: 'Em The Legend of Zelda: Breath of the Wild, os jogadores exploram um vasto mundo aberto repleto de paisagens diversas, quebra-cabeças desafiadores e inimigos formidáveis. Como Link, você deve descobrir os segredos de Hyrule e derrotar o malvado Calamity Ganon. O jogo oferece uma experiência rica com seu sistema climático dinâmico, física realista e uma variedade de armas e ferramentas para descobrir.',
   },
   {
     id: '2',
     title: 'Super Mario Odyssey',
     description: 'Junte-se a Mario em uma aventura 3D massiva ao redor do mundo!',
     image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLg6b7dU4wgzpI5GNn9d_F7Kq3G5l4wVuAQ&s'},
     detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTujOdunJtWItE1MOVp0hcDC5ZId9r66bN5kA&s' },
     details: 'Super Mario Odyssey leva os jogadores em uma jornada por vários mundos, cada um com seu próprio tema e desafios únicos. Mario se junta a Cappy, um chapéu senciente, para resgatar a Princesa Peach das garras de Bowser. O jogo introduz novas mecânicas, como capturar inimigos e objetos, permitindo uma solução criativa de problemas e exploração.',
   },
   {
     id: '3',
     title: 'Grand Theft Auto V',
     description: 'Entre na vida em mundo aberto em Grand Theft Auto 5.',
     image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQStVTI8S4EJwiSfcVT5xVE2qWW6QYLsz5qxg&s' },
     detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ifecCibtWnUE6QuOEliuLycFSd_TEs2w9Q&s' },
     details: 'O jogo se passa no estado ficcional de San Andreas, com a história da campanha um jogador seguindo três criminosos e seus esforços para realizarem assaltos sob a pressão de uma agência governamental. O mundo aberto permite que os jogadores naveguem livremente pelas áreas rurais e urbanas de San Andreas.',
   },
   {
     id: '4',
     title: 'Minecraft',
     description: 'Construa, explore e sobreviva em um mundo de blocos.',
     image: { uri: 'https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70070000016597/0a33bcaba879403460afe2ff2aafaaefeede964e0fc11a430f71077867cc87f1' },
     detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7UDXus26LStMAUP1D1BrVaREch1hzM17BA&s' },
     details: 'Minecraft é um jogo sandbox que permite aos jogadores explorar, construir e sobreviver em um mundo de blocos gerado proceduralmente. Com seus modos criativo e de sobrevivência, os jogadores podem construir estruturas elaboradas, minerar recursos e enfrentar criaturas hostis. A natureza aberta do jogo incentiva a criatividade e a colaboração.',
   },
   {
     id: '5',
     title: 'Fortnite',
     description: 'Participe do battle royale e seja o último a ficar de pé.',
     image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutINIkdfG4OGdZJ0dVi4jLJ4KR93o_vyUHg&s' },
     detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOMLj3xZrPA3behYJwVtV3ghYtysbdyAywg&s' },
     details: 'Fortnite é um jogo de battle royale onde os jogadores competem para ser o último a ficar de pé em um mapa que encolhe constantemente. Com seus gráficos vibrantes e jogabilidade acelerada, Fortnite se tornou um fenômeno cultural. Os jogadores podem construir estruturas, coletar armas e se unir a amigos para alcançar a vitória.',
   },
   {
     id: '6',
     title: 'Cyberpunk 2077',
     description: 'Explore o mundo aberto de Night City neste RPG futurista.',
     image: { uri: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/5ce6513b3343bf3c37a97d5894f91f5d2862371e7b502841.png' },
     detailsImage: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UpvfCuJ8tJMei0YmoWow-WzlKIUHZFpB_A&s' },
     details: 'Cyberpunk 2077 é um RPG de mundo aberto ambientado no futuro distópico de Night City. Os jogadores assumem o papel de V, um mercenário com habilidades personalizáveis e uma história pessoal. O jogo apresenta um mundo ricamente detalhado, narrativas ramificadas e uma variedade de mecânicas de combate e hacking.',
   },
 ];
 
 export default function App() {
   const [selectedGame, setSelectedGame] = useState(null);
 
   return (
     <View style={styles.container}>
       <Text style={styles.header}>Catálogo de Jogos</Text>
 
       <View style={styles.imageContainer}>
         <Image
           source={{ uri: 'https://cms-assets.xboxservices.com/assets/ae/50/ae508467-2673-43d5-9fb9-53570ac3a51d.jpg?n=XGPU_Super-Hero-1400_Update-10-31-24_1920x1080.jpg' }}
           style={styles.middleImage}
         />
       </View>
 
       <FlatList
         data={games}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
           <TouchableOpacity onPress={() => setSelectedGame(item)}>
             <View style={styles.card}>
               <Image source={item.image} style={styles.image} />
               <View style={styles.textContainer}>
                 <Text style={styles.title}>{item.title}</Text>
                 <Text style={styles.description}>{item.description}</Text>
               </View>
             </View>
           </TouchableOpacity>
         )}
       />
 
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
                 <Button title="Fechar" onPress={() => setSelectedGame(null)} />
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
     fontSize: 32,
     fontWeight: 'bold',
     color: '#333',
     marginTop: 20, // Add margin to push the title down
     marginBottom: 20,
     textAlign: 'center',
   },
   imageContainer: {
     alignItems: 'center',
     marginBottom: 20,
   },
   middleImage: {
     width: '100%',
     height: 200,
   },
   card: {
     backgroundColor: '#e0e0e0',
     borderRadius: 8,
     marginBottom: 10,
     overflow: 'hidden',
     flexDirection: 'row',
   },
   image: {
     width: 100,
     height: 100,
   },
   textContainer: {
     flex: 1,
     padding: 10,
   },
   title: {
     fontSize: 18,
     fontWeight: 'bold',
   },
   description: {
     fontSize: 14,
     color: '#666',
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
     width: '80%',
   },
   detailsImage: {
     width: '100%',
     height: 200,
     marginBottom: 20,
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
 });

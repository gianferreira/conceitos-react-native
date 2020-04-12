import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProjet() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Gian Ferreira'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>       
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="ligh-content" backgroundColor="#7159c1"/>
          <FlatList 
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({ item: project }) => (
              <Text style={styles.project}>{project.title}</Text>
            )}
          />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleAddProjet}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>     
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  project: {
    color: '#FFF',
    fontSize: 26
  },

  button: {
    backgroundColor: '#FFF',
    height: 50,
    margin: 20,    
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#7159c1',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App(){
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    api.get('projects').then(res=>{
      console.log(res.data);
      setProjects(res.data);
    });
  }, []);

  async function handleAddProject(){
    const res = await api.post('projects', {
      title: `NEW PROJECT ${Date.now()}`,
      owner: 'TESTER',
    });

    const project = res.data;

    setProjects([...projects, project]); 
  } 


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#222888"/>
      
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project=>project.id}
          renderItem={({item: project})=>(
            <Text style={styles.title}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.button} 
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* <View style={styles.container}>
        {projects.map(project=><Text style={styles.title} key={project.id}>{project.title}</Text>)}
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#156336',
  },

  title:{
    color: '#ff458f',
    fontSize: 32,
    fontWeight: 'bold',
  },

  button:{
    backgroundColor: '#f29556',
    margin: 10,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText:{
    fontSize: 40,
    fontWeight: 'bold',
  },
});

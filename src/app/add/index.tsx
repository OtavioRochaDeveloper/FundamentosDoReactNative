import  { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import { styles } from "./styles"
import { colors } from "../../../styles/colors"
import { Categories } from "@/components/categories"
import { Input } from "@/components/input"
import { Button } from "@/components/button"

import { linkStorage } from '@/storage/link-storage'

export default function Add() {

  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  async function handleAdd() {
    try {
      if (!category){
        return Alert.alert("Categoria", "Selecione a categoria")
      }

      if (!name.trim()){
        return Alert.alert("Nome", "Preencha o nome")
     }

      if (!url.trim()){
        return Alert.alert("URL", "Preencha a URL")
      }

      await linkStorage.save({
        id: new Date().getTime().toString(),
        category,
        name,
        url
      })

      Alert.alert("Sucesso", "Novo link adicionado", [
        {text:"ok", onPress: () => router.back()}
      ])

  } catch ( error) {
    Alert.alert ("Erro", "Nao foi possivel salvar o link")
  }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color={colors.gray[200]} />
      </TouchableOpacity>

      <Text style={styles.title}>Novo</Text>
    </View>

    <Text style={styles.label}>Selecione uma categoria</Text>
    <Categories onChange={setCategory} selected={category} />

    <View style={styles.form}>
      <Input placeholder="Nome" onChangeText={setName}/>
      <Input placeholder="URL" onChangeText={setUrl} autoCapitalize='none'/>
      <Button title="Adicionar" onPress={handleAdd}/>
    </View>
  </View>
  )
}
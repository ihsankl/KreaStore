import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';

const postRef = firestore().collection('post');

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        onInit()
        return () => {
            
        }
    }, [])

    const onInit = async() => {
        try {
            const data = []
            const x = await postRef.get()
            x.forEach(docs => {
                let currentId = docs.id
                let appObj = {...docs.data(), ['id']: currentId}
                data.push(appObj)
                setData(data)
            })
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    
    return (
        <View>
            {data.map((v,i)=> {
                return <Text>{v?.title}</Text>
            })}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})

import React, {useState,useEffect,useContext} from 'react';
import { StyleSheet, Dimensions, ScrollView, Button, Text } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
// import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
const mainController = require('../controllers/main');
import Toast from 'react-native-simple-toast';
const keys = require('../config/keys');


// class Home extends React.Component {
function Home ({navigation}) {

  const [data,setData] = useState([]);
  const [articles, setArticles] = useState([]);

  React.useEffect(() => {
    if (!articles.length)
      getPosts()
  })

  let allPostsUrl = keys.backendApiEndpoint + '/lastsixposts';

  
  const getPosts = async () => {
    const { token, user } = await mainController.getToken();
    fetch(allPostsUrl,{
      headers:{
          "Authorization":"Bearer " + token
      }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result.selectedPosts.length)
        setData(result.selectedPosts)
        let articlesCollective = [];
        for (let i =0 ; i<result.selectedPosts.length; i++ ) {
          articlesCollective.push({
            title: result.selectedPosts[i].question6 + " " + result.selectedPosts[i].question7 + "\n" + result.selectedPosts[i].house_struct + ", " + result.selectedPosts[i].house_type,
            price: "Rs " + result.selectedPosts[i].question3,
            image: result.selectedPosts[i].pic1,
            cta: 'View House'
          })

        }

        setArticles(articlesCollective);
    })
  }

  const renderArticles = () => {

    return (
    
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        
        <Block flex>
        {/* <Button><Text>Logout</Text></Button> */}
          <Card item={articles[0]} horizontal  />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView>
    )
  }

  const logout = async () => {
    await mainController.unsetToken();
    Toast.show('Log Out Successful');
    navigation.navigate('Login')
  }

    return (
      <Block flex center style={styles.home}>


        {
          articles && articles.length ?
          renderArticles() 
          :
          <Text>Loading...</Text>
          }

          {/* <Button title = 'Logout'
          onPress= {() => { logout() }}><Text>Logout</Text></Button> */}
      </Block>
    );
  
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;

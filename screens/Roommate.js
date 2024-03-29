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
function Roommate ({navigation}) {

  const [data,setData] = useState([]);
  const [articles, setArticles] = useState([]);

  React.useEffect(() => {
    if (!articles.length)
      getRoommates()
  })

  let allPostsUrl = keys.backendApiEndpoint + '/allroommates';

  
  const getRoommates = async () => {
    const { token, user } = await mainController.getToken();
    fetch(allPostsUrl,{
      headers:{
          "Authorization":"Bearer " + token
      }
    }).then(res=>res.json())
    .then(result=>{
        let articlesCollective = [];
        for (let i =0 ; i<10; i++ ) {
          articlesCollective.push({
            title: result.posts[i].postedBy.fullName + "\n" + result.posts[i].question8 + " " + result.posts[i].question9,
            image: result.posts[i].pic1,
            cta: 'View Roommate'
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

export default Roommate;

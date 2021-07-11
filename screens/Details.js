
import React, {useState,useEffect,useContext} from 'react';
const mainController = require('../controllers/main');
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card } from "../components/";
const keys = require('../config/keys');

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

// class Details extends React.Component {

function Details ({ navigation, route }) {

  const houseId = route.params.data;

  console.log("House Id : ", houseId);

  const [data,setData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState([]);
  
  React.useEffect(() => {
      
      getDetails()
  })

  let getDetailsurl = keys.backendApiEndpoint + `/house/${houseId}`;
  
  let tp = []
  let im = []
  const getDetails = async () => {
    const { token, user } = await mainController.getToken();
    fetch(getDetailsurl,{
      headers:{
          "Authorization":"Bearer " + token
      }
    }).then(res=>res.json())
    .then(result=>{
        
        console.log("hello world")
        console.log(result)
        console.log(result.house.question5)
        
        
        tp.push({
          title: result.house.question5 + " " + result.house.question6,
          image: result.house.pic1,
          description: result.house.house_type + " " + result.house.house_struct
        })
        tp.push({
          title: result.house.question7 + " " + result.house.question8,
          image: result.house.pic2,
          description: result.house.house_type + " " + result.house.house_struct
        })
        tp.push({
          title: result.house.question9,
          image: result.house.pic3,
          description: result.house.house_type + " " + result.house.house_struct
        })

        im.push({
          image: result.house.pic1
        })
        im.push({
          image: result.house.pic2
        })
        im.push({
          image: result.house.pic3
        })
      
        setCategories(tp);
        setImg(im);
       
    })
  }



  const renderProduct = (item, index) => {
    // const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        // onPress={() => navigation.navigate("Pro", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productPrice}
            >
              {item.price}
            </Text>
            <Text center size={34}>
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.description}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  const renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Pune Maharashtra
        </Text>
        <Block flex>
         
          <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2
              }}
            >
              {categories &&
                categories.map((item, index) =>
                  renderProduct(item, index)
                )}
            </ScrollView>
          </Block>
        </Block>
      </Block>
    );
  };

  const renderAlbum = () => {

    return (
      <Block
        flex
        style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}
      >
        <Text bold size={16} style={styles.title}>
          Album
        </Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate("Home")}
            >
            
            </Text>
          </Block>
          <Block
            row
            space="between"
            style={{ marginTop: theme.SIZES.BASE, flexWrap: "wrap" }}
          >
            
              <Block key={Math.random()} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: "http://res.cloudinary.com/safcloud/image/upload/v1608753061/tenousedata/dea0qtoqrgo29alpuqea.jpg"}}
                  style={styles.albumThumb}
                />
                </Block>
                <Block key={Math.random()} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: "http://res.cloudinary.com/safcloud/image/upload/v1608753061/tenousedata/dea0qtoqrgo29alpuqea.jpg" }}
                  style={styles.albumThumb}
                />
                </Block>
                <Block key={Math.random()} style={styles.shadow}></Block>
                <Image
                  resizeMode="cover"
                  source={{ uri: "http://res.cloudinary.com/safcloud/image/upload/v1608753061/tenousedata/dea0qtoqrgo29alpuqea.jpg"}}
                  style={styles.albumThumb}
                />
              
          </Block>
        </Block>
      </Block>
    );
  };

    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {renderCards()}
          {renderAlbum()}
        </ScrollView>
      </Block>
    );
  
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Details;

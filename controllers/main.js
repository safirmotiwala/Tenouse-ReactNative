// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

exports.getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwt');
    const user = await AsyncStorage.getItem('user');
    return {
        token,
        user
    }
  } catch (e) {
    return null;
  }
};

exports.setToken = async (token, user) => {
  try {
    await AsyncStorage.setItem('jwt', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    return null;
  }
};

exports.unsetToken = async () => {
    try {
      await AsyncStorage.setItem('jwt', '');
      await AsyncStorage.setItem('user', '');
    } catch (e) {
      return null;
    }
};

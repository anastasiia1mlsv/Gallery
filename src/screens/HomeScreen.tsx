import React, { FunctionComponent, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator, useWindowDimensions, Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageStore from '../stores/ImageStore';
import { observer } from 'mobx-react';
import { RootNavigationProps } from "../navigation/types.";
import { customTheme } from "../components/CustomeTheme";
import { getPhotosFromUnsplash } from "../apiService/ApiPhotos";
import { checkInternetConnection } from "../utils/functionInternet";


const HomeScreen : FunctionComponent <RootNavigationProps<'HomeScreen'>> = observer(() => {
  const theme = customTheme();
  const width = useWindowDimensions().width;
  const photoWidth = width * 0.45;
  const photoHeight = width * 0.45;
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      await getPhotosFromUnsplash();
    } catch (error) {
      setError(error as string);
      const isConnected = await checkInternetConnection();
      if(!isConnected){
        Alert.alert("No internet connection. Please try again later");
      } else {
        Alert.alert("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    ImageStore.incrementPage();
    fetchData();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    ImageStore.page = 1;
    fetchData();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: theme.colors.backgroundColor}}>
      {error ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>
          ) : (
            <FlatList
              data={ImageStore.images}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) =>
                  <TouchableOpacity
                    onPress={() => {navigation.navigate('ImageScreen', {imageUrl: item.urls.regular})}}
                    style={{ margin: 5 }}>
                    <Image source={{ uri: item.urls.small }} style={{ height: photoHeight, width: photoWidth }} />
                  </TouchableOpacity>
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }
              ListFooterComponent={loading ?
                <ActivityIndicator size="large" color={theme.colors.shadowColor} /> : null
              }
            />
      )}
    </View>
  );
});

export default HomeScreen;

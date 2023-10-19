import NetInfo from "@react-native-community/netinfo";

export const checkInternetConnection = async () => {
  const response = await NetInfo.fetch();
  return response.isConnected;
}

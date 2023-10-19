import { DefaultTheme } from '@react-navigation/native';

export const customTheme = () => {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backgroundColor: '#e1d05c',
      textColor: '#fff',
      shadowColor: '#000',
      buttonColor: {
        primary: '#484747',
      },
    }
  }
}

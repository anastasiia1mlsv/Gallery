import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootNavigationList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  PostDetails: { id: string };
  NotFound: undefined;
  HomeScreen: undefined;
  ImageScreen:{
    imageUrl: string
  }
};

export type RootNavigationProps<T extends keyof RootNavigationList> =
  StackScreenProps<RootNavigationList, T>;

export type HomeTabParamList = {
  Popular: undefined;
  Latest: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootNavigationProps<keyof RootNavigationList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationList {}
  }
}

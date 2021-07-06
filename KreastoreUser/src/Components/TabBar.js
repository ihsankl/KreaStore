import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';

import {color} from '../Theme/Color';

export function TabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  // Home
  // Top Up
  // Post Item
  // Profile
  const RenderIcon = ({label, isFocused}) => {
    switch (label) {
      case 'Home':
        return (
          <View
            style={{
              padding: 8,
              backgroundColor: isFocused && color.secondary,
              borderRadius: 999,
            }}>
            <Feather
              name="home"
              size={24}
              color={isFocused ? color.white : color.text}
            />
          </View>
        );
      case 'Store':
        return (
          <View
            style={{
              padding: 8,
              backgroundColor: isFocused && color.secondary,
              borderRadius: 999,
            }}>
            <SimpleLineIcons
              name="basket"
              size={24}
              color={isFocused ? color.white : color.text}
            />
          </View>
        );
      case 'News':
        return (
          <View
            style={{
              padding: 8,
              backgroundColor: isFocused && color.secondary,
              borderRadius: 999,
            }}>
            <Entypo
              name="news"
              size={24}
              color={isFocused ? color.white : color.text}
            />
          </View>
        );

      default:
        return (
          <View
            style={{
              padding: 8,
              backgroundColor: isFocused && color.secondary,
              borderRadius: 999,
            }}>
            <Feather
              name="user"
              size={24}
              color={isFocused ? color.white : color.text}
            />
          </View>
        );
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 45,
        backgroundColor: color.accent2,
        elevation: 5
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <RenderIcon label={label} isFocused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

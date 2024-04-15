import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationCreator = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateNotification = async () => {
    // Request permission to receive notifications
    const { granted } = await Notifications.requestPermissionsAsync();

    if (!granted) {
      console.error('Notification permissions denied.');
      return;
    }

    // Set the notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: null,
    });

    // Reset the input fields after scheduling the notification
    setTitle('');
    setMessage('');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: 200 }}
        placeholder="Notification Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: 200 }}
        placeholder="Notification Message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Create Notification" onPress={handleCreateNotification} />
    </View>
  );
};

export default NotificationCreator;

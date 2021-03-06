import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  const previousToken = await AsyncStorage.getItem('pushtoken');
  if (previousToken) {
    return;
  } else {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }

    const token = Notifications.getExponentPushTokenAsync();
    axios.post(PUSH_ENDPOINT, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
  }
};

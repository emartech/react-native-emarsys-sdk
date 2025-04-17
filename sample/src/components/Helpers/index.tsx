import { Alert } from 'react-native';

type ShowAlertCallback = () => void;

const showAlert = (
  title: string,
  desc: string,
  extra?: string,
  callback?: ShowAlertCallback
): void => {
  Alert.alert(
    title,
    desc + (extra ?? ''),
    [
      {
        text: 'OK',
        onPress: () => {
          if (callback) {
            callback();
          }
        },
      },
    ],
    { cancelable: true }
  );
};

export default showAlert;

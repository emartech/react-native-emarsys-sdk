import { ScrollView as RNScrollView, Pressable, Text, Alert as RNAlert, View, StyleSheet } from 'react-native';

export function ScrollView({ children }: { children: React.ReactNode }) {
  return (
    <RNScrollView style={styles.scrollView}>
      {children}
    </RNScrollView>
  );
}

export function Button({ title, action, printResult = false }: { title: string; action: () => Promise<any>; printResult?: boolean }) {
  return (
    <Pressable onPress={async () => {
      try {
        const result = await action();
        if (printResult) {
          Alert(title, `Done: ${result}`);
        } else {
          Alert(title, 'Done');
        }
      } catch (e) {
        Alert(title, `Error: ${JSON.stringify(e)}`);
      }
    }} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const showLog = true;
const showAlert = true;
export function Alert(title: string, message: string) {
  if (showLog) {
    console.log(title, '-', message);
  }
  if (showAlert) {
    RNAlert.alert(title, message, [{ text: 'OK' }]);
  }
}

export function Separator() {
  return (
    <View style={styles.separator} />
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <Text style={styles.sectionTitle}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 28,
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0070f2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#0070f2',
    fontSize: 17,
  },
  separator: {
    backgroundColor: '#999',
    height: 1,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
    color: '#333',
  },
});

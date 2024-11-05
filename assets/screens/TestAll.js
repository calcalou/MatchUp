import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View, ScrollView, TextInput } from 'react-native';

const App = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, padding: 20 }}>
            <TextInput placeholder="Tape ici..." style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} />
            {/* Ajoute d'autres éléments ici */}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;

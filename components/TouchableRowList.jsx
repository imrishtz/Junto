import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet 
} from 'react-native';

const TouchableRowList = props => {
  const [ list, name, key, empty ] = props;
  return (
  <View style={styles.selectedParticipants}>
    {list && list.length > 0 ? 
      list.map((item) => {
        return (
          <View 
          key={item[key]}
          style={styles.selectedBoxTouchable}
          >
            <TouchableCmp
              onPress={() => removeParticipant(item[key])}
              activeOpacity={0.6}
            >
              <View 
                style={styles.selectedBox}>
                <BodyText style={styles.selectedParticipantText}>
                  {item[name]}
                </BodyText>
              </View>
            </TouchableCmp>
          </View>
        );
      }) :
      <BodyText >{empty}</BodyText>
    }
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TouchableRowList;
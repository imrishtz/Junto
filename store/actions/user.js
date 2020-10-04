import * as firebase from "firebase";
import User from "../../models/user";
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export const setUser = (user) => {
  return async (dispatch) => {
    if (!user) {
      return;
    }
    //check if exists
    firebase.database()
        .ref('/users/')
        .once('value', ((snapshot) => {
          const users = snapshot.val();
          let isExists = false;
          let refKey;
          for (const key in users) {
            if (user.phoneNumber === users[key].phoneNumber) {
              isExists = true;
              refKey = key;
              break;
            }
          }
          if (isExists) {
            const oldUser = new User(user.phoneNumber, refKey);
            dispatch({
              type: SET_USER,
              user: oldUser,
            });
          } else { // new user
            const ref = firebase.database()
              .ref('/users/')
              .push({phoneNumber: user.phoneNumber})
              // .(user.phoneNumber)
              .then(() => {
                console.log("\nuser then=");
                console.log("\nuser then ref =" + JSON.stringify(ref));
                const newUser = new User(user.phoneNumber, ref);
                dispatch({
                  type: SET_USER,
                  user: newUser,
                });
            }).catch((err) => {
              console.log('err=' + err.message);
            })
          }
        })).catch((err) => {
          console.log('err=' + err.message);
        })
  };
}

export const logout = () => {
  return async (dispatch) => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
    });
  };
}
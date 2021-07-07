import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import Header from '../../Components/Header';
import KreaButton from '../../Components/KreaButton';
import {color} from '../../Theme/Color';
import {setAlert} from '../../Redux/Action/alert';
import {getUserData} from '../../Redux/Action/userData';
import {putPhone} from '../../Redux/Action/Put';

const Index = props => {
  const [phone, setPhone] = useState('');
  const [next, setNext] = useState(false);
  const [code, setCode] = useState('');
  const [generateCode, setGenerate] = useState('1234');

  useEffect(() => {
    return () => {};
  }, []);

  const isNext = () => {
    setNext(true);
  };

  //untuk generate OTP
  const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  //untuk gateaway send sms
  const sendOTP = () => {};

  const isValidasiCode = async () => {
    try {
      const data = await props.getUserData.data;
      const id = await props.getUserData.data.id;
      if (code == generateCode) {
        await props.dispatch(
          setAlert({
            ...props.alert,
            isLoading: true,
          }),
        );
        await props.dispatch(putPhone(id, {...data, phone: phone}));
        await props.dispatch(getUserData(id));
        props.navigation.navigate('Verify Profile');
      } else {
        await props.dispatch(
          setAlert({
            ...props.alert,
            isError: true,
            msg: 'Kode OTP Salah',
            status: 'error',
          }),
        );
      }
      await props.dispatch(
        setAlert({
          ...props.alert,
          isLoading: false,
        }),
      );
    } catch (error) {
      await props.dispatch(
        setAlert({
          // ...props.alert,
          isError: true,
          msg: error.message,
          status: 'error',
        }),
      );
    }
    await props.dispatch(
      setAlert({
        ...props.alert,
        isLoading: false,
      }),
    );
  };

  return (
    <View style={{display: 'flex', flex: 1, backgroundColor: color.accent2}}>
      <Header title={'Verifikasi'} />
      <View style={{backgroundColor: color.accent2, flex: 1, marginTop: 24}}>
        {next ? (
          <>
            <View style={{backgroundColor: color.white, padding: 16}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, marginBottom: 20}}>
                Masukan Kode Verifikasi
              </Text>
              <Text style={{textAlign: 'center', color: color.text}}>
                Kode Verifikasi (OTP) kamu telah dikirim melalui SMS ke
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                {phone}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <OTPInputView
                  style={{
                    width: '80%',
                    height: 100,
                    marginHorizontal: 20,
                    fontSize: 50,
                  }}
                  pinCount={4}
                  code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  onCodeChanged={code => setCode(code.replace(/[^0-9]/g, ''))}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                  }}
                />
              </View>

              <Text style={{color: color.text, textAlign: 'center'}}>
                Tidak menerima kode ?
              </Text>
              <Text style={{color: color.text, textAlign: 'center'}}>
                <Text style={{color: color.primary}}>Kirim Ulang</Text>
                {` atau `}
                <Text style={{color: color.primary}}>
                  coba Metode Verifikasi Lain.
                </Text>
              </Text>
            </View>
            <View>
              <KreaButton
                btnStyle={{margin: 24}}
                text={'Lanjut'}
                onPress={() => isValidasiCode()}
                disabled={code.length < 4 && true}
              />
            </View>
          </>
        ) : (
          <>
            <View style={{backgroundColor: color.white, padding: 16}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, marginBottom: 20}}>
                Tambah No. Telpon
              </Text>
              <View style={{flexDirection: 'row'}}>
                <SimpleLineIcons
                  name="screen-smartphone"
                  style={{
                    color: color.text,
                    fontSize: 25,
                  }}
                />
                <TextInput
                  style={styles.textInput}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={e => {
                    setPhone(e.replace(/[^0-9]/g, ''));
                  }}
                />
              </View>
            </View>
            <View>
              <KreaButton
                btnStyle={{margin: 24}}
                text={'Lanjut'}
                onPress={() => isNext()}
                disabled={phone.length < 9 && true}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    putPhone: state.putPhone,
    alert: state.alert,
    getUserData: state.getUserData,
  };
};

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    width: '100%',
    padding: 2,
    marginBottom: 10,
    borderBottomColor: color.text,
    borderBottomColor: color.grey,
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: color.primary,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: color.text,
  },

  underlineStyleHighLighted: {
    borderColor: color.primary,
  },
});

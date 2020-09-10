library flipper_login;

import 'package:flipper_login/services/proxy_service.dart';
import 'package:flutter/material.dart';
import 'package:loading/indicator/ball_pulse_indicator.dart';
import 'package:loading/loading.dart';

import 'helpers/style.dart';
import 'providers/auth.dart';
import 'widgets/custom_text.dart';

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll('#', '');
    if (hexColor.length == 6) {
      hexColor = 'FF' + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  // ignore: sort_constructors_first
  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}

class Login extends StatefulWidget {
  const Login({Key key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController number = TextEditingController();
  bool _loading = false;
  @override
  void initState() {
    super.initState();
    proxyService.loading.listen((loading) {
      setState(() {
        _loading = loading;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final AuthProvider auth = AuthProvider();
    return SingleChildScrollView(
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        const SizedBox(
          height: 30,
        ),
        RichText(
            text: TextSpan(children: [
          const TextSpan(text: 'Welcome to'),
          TextSpan(
              text: ' Flipper', style: TextStyle(color: Colors.blue.shade900)),
          const TextSpan(text: ' app'),
        ], style: const TextStyle(color: black))),
        const SizedBox(height: 10),
        CustomText(
          text: auth.errorMessage ?? '',
          color: red,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 12, right: 12, bottom: 12),
          child: Container(
            decoration: BoxDecoration(
                color: white,
                border: Border.all(color: Colors.blue, width: 0.2),
                borderRadius: BorderRadius.circular(10),
                boxShadow: [
                  BoxShadow(
                      color: grey.withOpacity(0.3),
                      offset: const Offset(2, 1),
                      blurRadius: 2)
                ]),
            child: Padding(
              padding: const EdgeInsets.only(left: 8.0),
              child: TextField(
                keyboardType: TextInputType.phone,
                controller: number,
                decoration: const InputDecoration(
                    icon: Icon(Icons.phone_android, color: grey),
                    border: InputBorder.none,
                    hintText: '+250 788 3600 58',
                    hintStyle: TextStyle(
                        color: grey, fontFamily: 'Sen', fontSize: 18)),
              ),
            ),
          ),
        ),
        const SizedBox(height: 5),
        const Padding(
          padding: EdgeInsets.all(8.0),
          child: Text(
            'After entering your phone number, click on verify to authenticate yourself! Then wait up to 20 seconds to get th OTP and procede',
            textAlign: TextAlign.center,
            style: TextStyle(color: grey),
          ),
        ),
        const SizedBox(height: 10),
        Stack(
          children: [
            _loading
                ? SizedBox(
                    width: 380,
                    height: 60,
                    child: RaisedButton(
                      color: Colors.blue,
                      onPressed: () {},
                      child: Loading(
                        indicator: BallPulseIndicator(),
                        size: 50.0,
                        color: Colors.white,
                      ),
                    ),
                  )
                : SizedBox(
                    width: 380,
                    height: 60,
                    child: RaisedButton(
                      color: Colors.blue,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5.0),
                          side: const BorderSide(
                            color: Colors.blue,
                          )),
                      padding: const EdgeInsets.all(0.0),
                      onPressed: () {
                        auth.verifyPhone(context, number.text);
                      },
                      child: const Text(
                        'Verify',
                        style: TextStyle(color: Colors.white, fontSize: 20),
                      ),
                    ),
                  )
          ],
        ),
      ]),
    );
  }
}

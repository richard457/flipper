import 'package:flipper/home/widget/calculator-buttons.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flipper/util/HexColor.dart';
import 'package:flutter/material.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';

class KeyPadWidget extends StatefulWidget {
  KeyPadWidget({Key key}) : super(key: key);

  @override
  _KeyPadWidgetState createState() => _KeyPadWidgetState();
}

class _KeyPadWidgetState extends State<KeyPadWidget> {
  @override
  Widget build(BuildContext context) {
    var moneyFormat =
        new MoneyMaskedTextController(leftSymbol: '\$', decimalSeparator: ".");
    moneyFormat.updateValue(0);

    return Scaffold(
      body: Center(
        child: Wrap(
          children: <Widget>[
            Align(
              child: Container(
                width: 380,
                height: 60,
                color: HexColor("#4bcffa"),
                child: Row(
                  children: <Widget>[
                    SizedBox(width: 40),
                    SizedBox(
                      height: 120,
                      child: FlatButton(
                        color: HexColor("#4bcffa"),
                        onPressed: () {},
                        child: Text(
                          "Tickets",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontFamily: "Heboo-Regular"),
                        ),
                      ),
                    ),
                    SizedBox(width: 40),
                    SizedBox(
                      height: 120,
                      child: FlatButton(
                        color: HexColor("#4bcffa"),
                        onPressed: () {},
                        child: Text(
                          "Charge Frw0.00",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontFamily: "Heboo-Regular"),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
            Container(
              width: MediaQuery.of(context).size.width,
              color: Colors.white30,
              child: ListTile(
                trailing: FlatButton(
                  child: Text(
                    "Frw 500",
                    style: TextStyle(color: HexColor("#95a5a6")),
                  ),
                ),
                leading: FlatButton(
                  onPressed: () {
                    Router.navigator.pushNamed(Router.bottom);
                  },
                  child: Text(
                    "Add a note",
                    style: TextStyle(color: HexColor("#95a5a6")),
                  ),
                ),
              ),
            ),
            CalculatorButtons(
              onTap: _onPress,
            )
          ],
        ),
      ),
    );
  }

  void _onPress({String buttonText}) {}
}
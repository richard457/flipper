import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/util/data_manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:redux/src/store.dart';

class RetailPrice extends StatefulWidget {
  const RetailPrice({Key key, this.vm}) : super(key: key);
  @override
  _RetailPriceState createState() => _RetailPriceState();
  final CommonViewModel vm;
}

class _RetailPriceState extends State<RetailPrice> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 300,
        child: TextFormField(
          keyboardType: TextInputType.number,
          style: GoogleFonts.lato(
            fontStyle: FontStyle.normal,
            color: Theme.of(context).accentColor,
            fontSize: Theme.of(context).textTheme.bodyText1
                .copyWith(fontSize: 12)
                .fontSize,
          ),
          onChanged: (String retailPrice) async {
            if (retailPrice != '' || retailPrice == null) {
              final Store<AppState> store = StoreProvider.of<AppState>(context);
              final VariationTableData variation = await widget
                  .vm.database.variationDao
                  .getVariationById(variantId: widget.vm.variant.id);

              await DataManager.updateVariation(
                variation: variation,
                store: store,
                variantName: 'Regular',
                retailPrice: double.parse(retailPrice),
              );
              setState(() {
                DataManager.retailPrice = double.parse(retailPrice);
              });
            } else {
              setState(() {
                DataManager.retailPrice = 0.0;
              });
            }
          },
          decoration: const InputDecoration(
              hintText: 'Retail Price', focusColor: Colors.blue),
        ),
      ),
    );
  }
}
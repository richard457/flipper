import 'package:customappbar/commonappbar.dart';
import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/generated/l10n.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flipper/routes/router.gr.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class CreateCategoryInputScreen extends StatefulWidget {
  CreateCategoryInputScreen({Key key}) : super(key: key);

  @override
  _CreateCategoryInputScreenState createState() =>
      _CreateCategoryInputScreenState();
}

class _CreateCategoryInputScreenState extends State<CreateCategoryInputScreen> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            onPop: () {
              Router.navigator.pop();
            },
            title: S.of(context).createCategory,
            icon: Icons.keyboard_backspace,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              child: TextFormField(
                style: TextStyle(color: Colors.black),
                onChanged: (name) {
                  vm.database.categoryDao.updateCategory(
                    //ignore: missing_required_param
                    CategoryTableData(
                      updatedAt: DateTime.now(),
                      // id: vm.tempCategoryId,
                      focused: false,
//                      branchId: vm.branch.id,
                      name: name,
                    ),
                  );
                },
                decoration: InputDecoration(
                    hintText: S.of(context).name, focusColor: Colors.blue),
              ),
            ),
          ),
        );
      },
    );
  }
}

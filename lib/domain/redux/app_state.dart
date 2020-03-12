import 'package:built_collection/built_collection.dart';
import "package:built_value/built_value.dart";
import 'package:flipper/couchbase.dart';
import 'package:flipper/data/main_database.dart';
import 'package:flipper/model/app_action.dart';
import 'package:flipper/model/branch.dart';
import 'package:flipper/model/business.dart';
import 'package:flipper/model/cart.dart';
import 'package:flipper/model/category.dart';
import 'package:flipper/model/couch_db_client_instance.dart';
import 'package:flipper/model/flipper_color.dart';
import 'package:flipper/model/hint.dart';
import 'package:flipper/model/key_pad.dart';
import 'package:flipper/model/order.dart';
import 'package:flipper/model/permission.dart';
import 'package:flipper/model/price.dart';
import 'package:flipper/model/product.dart';
import 'package:flipper/model/sheet.dart';
import 'package:flipper/model/unit.dart';
import 'package:flipper/model/user.dart';
import 'package:flipper/model/variation.dart';

part 'app_state.g.dart';

abstract class AppState implements Built<AppState, AppStateBuilder> {
  @nullable
  User get user;

  @nullable
  int get userId;

  @nullable
  Business get currentActiveBusiness;

  @nullable
  int get tab;

  @nullable
  Business get nextActiveBusiness;

  @nullable
  Sheets get sheet;

  @nullable
  AppActions get action;

  @nullable
  Price get price;

  @nullable
  String get businessId;

  @nullable
  Unit get unit;

  @nullable
  Unit get customUnit;
  @nullable
  Product get customItem;

  @nullable
  Category get customCategory;

  @nullable
  BuiltList<Unit> get units;

  @nullable
  BuiltList<User> get users;

  @nullable
  int get focusedUnit;

  @nullable
  Category get category;

  @nullable
  Permission get permissions;

  @nullable
  List<Branch> get branches;

  @nullable
  List<Business> get businesses;

  @nullable
  Branch get branch;

  @nullable
  Business get business;

  @nullable
  Hint get hint;

  Database get database;

  CouchBase get couch;

  @nullable
  int get tempCategoryId;

  @nullable
  Unit get currentUnit;

  @nullable
  FlipperColor get currentColor;

  @nullable
  Variation get variant;

  BuiltList<Variation> get itemVariations;

  @nullable
  Product get currentActiveSaleItem;

  @nullable
  Product get cartItem;

  BuiltList<Product> get items;

  @nullable
  int get currentIncrement;

  BuiltList<Cart> get carts;

  @nullable
  int get cartQuantities;
  @nullable
  Order get order;

  @nullable
  KeyPad get keypad;

  @nullable
  Product get tmpItem;

  @nullable
  CouchDbClient get couchDbClient;
  AppState._();
  factory AppState([void Function(AppStateBuilder) updates]) = _$AppState;

  factory AppState.init() => AppState((a) => a
    ..database = Database()
    ..couch = CouchBase(shouldInitDb: true)
    ..units = ListBuilder()
    ..carts = ListBuilder()
    ..itemVariations = ListBuilder()
    ..items = ListBuilder()
    ..businesses = List<Business>()
    ..branches = List<Branch>());

  AppState clear() {
    // Add here anything else that also needs to be carried over.
    return AppState.init().rebuild((s) => () => {});
  }
}

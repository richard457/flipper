import 'package:moor/moor.dart';

class Token extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get token => text()();
}
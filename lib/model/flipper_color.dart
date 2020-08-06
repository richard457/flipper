import 'package:built_value/built_value.dart';

part 'flipper_color.g.dart';

abstract class FlipperColor
    implements Built<FlipperColor, FlipperColorBuilder> {
  String get hexCode;
  FlipperColor._();

  factory FlipperColor([void Function(FlipperColorBuilder) updates]) =
      _$FlipperColor;
}

import 'package:flutter/material.dart';
import 'user_model.dart';

class AppState extends ChangeNotifier {
  ViewState _currentView = ViewState.welcome;
  String _language = 'ar'; // Default Arabic
  User? _currentUser;
  Child? _activeChild;
  final List<Child> _children = [
    Child(id: 'c1', name: 'أحمد', age: 7, avatar: '🧑‍🚀', stars: 12),
    Child(id: 'c2', name: 'سارة', age: 5, avatar: '🦄', stars: 25),
  ];

  ViewState get currentView => _currentView;
  String get language => _language;
  bool get isRTL => _language == 'ar';
  User? get currentUser => _currentUser;
  Child? get activeChild => _activeChild;
  List<Child> get children => List.unmodifiable(_children);

  void navigateTo(ViewState view) {
    _currentView = view;
    notifyListeners();
  }

  void setLanguage(String lang) {
    _language = lang;
    notifyListeners();
  }

  void toggleLanguage() {
    _language = _language == 'ar' ? 'en' : 'ar';
    notifyListeners();
  }

  void login(String email, String password) {
    _currentUser = User(
      id: 'u1',
      name: _language == 'ar' ? 'محمد علي' : 'Mohamed Ali',
      email: email,
    );
    _currentView = ViewState.dashboard;
    notifyListeners();
  }

  void logout() {
    _currentUser = null;
    _activeChild = null;
    _currentView = ViewState.portalSelection;
    notifyListeners();
  }

  void setActiveChild(Child child) {
    _activeChild = child;
    notifyListeners();
  }

  void addChild(String name, int age, String avatar) {
    final newChild = Child(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      name: name,
      age: age,
      avatar: avatar,
    );
    _children.add(newChild);
    notifyListeners();
  }
}

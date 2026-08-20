enum ViewState {
  welcome,
  portalSelection,
  familySelection,
  login,
  register,
  dashboard,
  plan,
  tokenBoards,
  report,
  videoRecords,
  findMyChild,
  communityMessages,
  calendar,
  marketplace,
  billing,
  support,
  settings,
  childWelcome,
  childPortal,
}

class User {
  final String id;
  final String name;
  final String email;
  final String role;

  User({
    required this.id,
    required this.name,
    required this.email,
    this.role = 'parent',
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      role: json['role'] ?? 'parent',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'role': role,
    };
  }
}

class Child {
  final String id;
  final String name;
  final int age;
  final String? avatar;
  final int stars;

  Child({
    required this.id,
    required this.name,
    required this.age,
    this.avatar,
    this.stars = 0,
  });

  factory Child.fromJson(Map<String, dynamic> json) {
    return Child(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      age: json['age'] ?? 0,
      avatar: json['avatar'],
      stars: json['stars'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'age': age,
      'avatar': avatar,
      'stars': stars,
    };
  }
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/user_model.dart';

class AuthScreen extends StatefulWidget {
  final bool isRegister;
  const AuthScreen({super.key, this.isRegister = false});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _emailController = TextEditingController();
  final _confirmEmailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _nameController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _confirmEmailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final isAr = appState.isRTL;
    final isRegister = widget.isRegister;

    return Scaffold(
      backgroundColor: const Color(0xFFF8F1FE),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(
            isAr ? Icons.arrow_forward : Icons.arrow_back,
            color: const Color(0xFF6B38D4),
          ),
          onPressed: () => appState.navigateTo(ViewState.familySelection),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: TextButton.icon(
              onPressed: () => appState.toggleLanguage(),
              icon: const Icon(Icons.language, size: 18, color: Color(0xFF6B38D4)),
              label: Text(
                isAr ? 'English' : 'عربي',
                style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF6B38D4)),
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 440),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // 3D Purple Mascot Avatar Header
                  Container(
                    width: 110,
                    height: 110,
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF6B38D4).withAlpha(40),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        )
                      ],
                    ),
                    child: ClipOval(
                      child: Image.asset(
                        'assets/images/mascot.png',
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return const Icon(Icons.emoji_emotions, size: 60, color: Color(0xFF6B38D4));
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  Text(
                    isRegister
                        ? (isAr ? 'إنشاء حساب جديد' : 'Create an Account')
                        : (isAr ? 'تسجيل الدخول' : 'Welcome Back'),
                    style: const TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.extrabold,
                      color: Color(0xFF1D1A23),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    isRegister
                        ? (isAr ? 'انضم إلى مجتمعنا الداعم اليوم.' : 'Join our supportive community today.')
                        : (isAr ? 'أدخل بريدك الإلكتروني وكلمة المرور' : 'Enter your email & password to continue'),
                    style: const TextStyle(fontSize: 14, color: Color(0xFF494454)),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),

                  // Form Container Card
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: const Color(0xFFE9DDFF)),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF6B38D4).withAlpha(20),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        )
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        if (isRegister) ...[
                          TextField(
                            controller: _nameController,
                            decoration: InputDecoration(
                              labelText: isAr ? 'الاسم الكامل' : 'Full Name',
                              prefixIcon: const Icon(Icons.person_outline, color: Color(0xFF6B38D4)),
                              filled: true,
                              fillColor: const Color(0xFFF3EBF8),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(16),
                                borderSide: BorderSide.none,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        TextField(
                          controller: _emailController,
                          keyboardType: TextInputType.emailAddress,
                          decoration: InputDecoration(
                            labelText: isAr ? 'البريد الإلكتروني' : 'Email Address',
                            prefixIcon: const Icon(Icons.email_outlined, color: Color(0xFF6B38D4)),
                            filled: true,
                            fillColor: const Color(0xFFF3EBF8),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16),
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        if (isRegister) ...[
                          TextField(
                            controller: _confirmEmailController,
                            keyboardType: TextInputType.emailAddress,
                            decoration: InputDecoration(
                              labelText: isAr ? 'تأكيد البريد الإلكتروني' : 'Confirm Email',
                              prefixIcon: const Icon(Icons.email_outlined, color: Color(0xFF6B38D4)),
                              filled: true,
                              fillColor: const Color(0xFFF3EBF8),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(16),
                                borderSide: BorderSide.none,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        TextField(
                          controller: _passwordController,
                          obscureText: true,
                          decoration: InputDecoration(
                            labelText: isAr ? 'كلمة المرور' : 'Password',
                            prefixIcon: const Icon(Icons.lock_outline, color: Color(0xFF6B38D4)),
                            filled: true,
                            fillColor: const Color(0xFFF3EBF8),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16),
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        if (isRegister) ...[
                          TextField(
                            controller: _confirmPasswordController,
                            obscureText: true,
                            decoration: InputDecoration(
                              labelText: isAr ? 'تأكيد كلمة المرور' : 'Confirm Password',
                              prefixIcon: const Icon(Icons.lock_outline, color: Color(0xFF6B38D4)),
                              filled: true,
                              fillColor: const Color(0xFFF3EBF8),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(16),
                                borderSide: BorderSide.none,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        const SizedBox(height: 12),

                        ElevatedButton(
                          onPressed: () {
                            if (isRegister && _emailController.text != _confirmEmailController.text) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    isAr
                                        ? 'البريد الإلكتروني وتأكيد البريد غير متطابقين'
                                        : 'Email addresses do not match',
                                  ),
                                ),
                              );
                              return;
                            }
                            appState.login(
                              _emailController.text.isEmpty ? 'parent@looply.com' : _emailController.text,
                              _passwordController.text,
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF6B38D4),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            elevation: 4,
                          ),
                          child: Text(
                            isRegister
                                ? (isAr ? 'تسجيل الحساب' : 'Register')
                                : (isAr ? 'تسجيل الدخول' : 'Sign In'),
                            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                        ),
                        const SizedBox(height: 16),

                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              isRegister
                                  ? (isAr ? 'لديك حساب بالفعل؟ ' : 'Already have an account? ')
                                  : (isAr ? 'ليس لديك حساب؟ ' : 'Don\'t have an account? '),
                              style: const TextStyle(color: Color(0xFF494454)),
                            ),
                            TextButton(
                              onPressed: () {
                                appState.navigateTo(isRegister ? ViewState.login : ViewState.register);
                              },
                              child: Text(
                                isRegister
                                  ? (isAr ? 'تسجيل الدخول' : 'Log in')
                                  : (isAr ? 'إنشاء حساب جديد' : 'Create an account'),
                                style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF6B38D4)),
                              ),
                            )
                          ],
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

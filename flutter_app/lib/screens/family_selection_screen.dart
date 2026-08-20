import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/user_model.dart';

class FamilySelectionScreen extends StatelessWidget {
  const FamilySelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final isAr = appState.isRTL;

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
          onPressed: () => appState.navigateTo(ViewState.portalSelection),
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
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // 3D Purple Mascot Logo Header
                Container(
                  width: 110,
                  height: 110,
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF6B38D4).withAlpha(30),
                        blurRadius: 20,
                        offset: const Offset(0, 8),
                      )
                    ],
                  ),
                  child: ClipOval(
                    child: Image.asset(
                      'assets/images/mascot_waving.png',
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Image.asset('assets/images/mascot.png');
                      },
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                const Text(
                  'Looply Family',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.extrabold,
                    color: Color(0xFF1D1A23),
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  isAr ? 'من سيسجل الدخول؟' : 'Who is logging in?',
                  style: const TextStyle(
                    fontSize: 16,
                    color: Color(0xFF494454),
                  ),
                ),
                const SizedBox(height: 40),

                Wrap(
                  spacing: 24,
                  runSpacing: 24,
                  alignment: WrapAlignment.center,
                  children: [
                    // Parent Portal Card
                    GestureDetector(
                      onTap: () => appState.navigateTo(ViewState.login),
                      child: Container(
                        width: 220,
                        padding: const EdgeInsets.all(24),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(28),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF6366F1).withAlpha(20),
                              blurRadius: 20,
                              offset: const Offset(0, 8),
                            )
                          ],
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: 100,
                              height: 100,
                              decoration: const BoxDecoration(
                                color: Color(0xFFEEF2FF),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(
                                Icons.person,
                                size: 56,
                                color: Color(0xFF6366F1),
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              isAr ? 'بوابة ولي الأمر' : 'Parent Portal',
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF1D1A23),
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              isAr ? 'إدارة ومتابعة ودعم' : 'Manage, track, and support',
                              style: const TextStyle(
                                fontSize: 12,
                                color: Color(0xFF494454),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Child Portal Card
                    GestureDetector(
                      onTap: () => appState.navigateTo(ViewState.childWelcome),
                      child: Container(
                        width: 220,
                        padding: const EdgeInsets.all(24),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(28),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFFA855F7).withAlpha(20),
                              blurRadius: 20,
                              offset: const Offset(0, 8),
                            )
                          ],
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: 100,
                              height: 100,
                              decoration: BoxDecoration(
                                color: const Color(0xFFF3E8FF),
                                shape: BoxShape.circle,
                                border: Border.all(color: Colors.white, width: 4),
                              ),
                              child: const Icon(
                                Icons.star_rounded,
                                size: 60,
                                color: Color(0xFFA855F7),
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              isAr ? 'بوابة الأطفال' : 'Child Portal',
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF1D1A23),
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              isAr ? 'لعب وتحديات ومكافآت' : 'Play, learn, and earn rewards',
                              style: const TextStyle(
                                fontSize: 12,
                                color: Color(0xFF494454),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

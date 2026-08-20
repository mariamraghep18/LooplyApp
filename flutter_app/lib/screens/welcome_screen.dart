import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/user_model.dart';

class WelcomeScreenWidget extends StatelessWidget {
  const WelcomeScreenWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final isAr = appState.isRTL;

    return Scaffold(
      backgroundColor: const Color(0xFFFFFDF9),
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFFBEB),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.bolt, color: Colors.amber, size: 18),
                        SizedBox(width: 4),
                        Text(
                          'Looply Play Pro',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFD97706),
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                  TextButton.icon(
                    onPressed: () => appState.toggleLanguage(),
                    icon: const Icon(Icons.language, size: 18, color: Color(0xFFFF7A00)),
                    label: Text(
                      isAr ? 'English' : 'عربي',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF2A2B47)),
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              child: Center(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 500),
                    child: Container(
                      padding: const EdgeInsets.all(28),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(36),
                        border: Border.all(color: const Color(0xFFFDE8E8), width: 2),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.orange.withAlpha(20),
                            blurRadius: 30,
                            offset: const Offset(0, 10),
                          )
                        ],
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // Mascot Image
                          Container(
                            width: 100,
                            height: 100,
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF3EBF8),
                              shape: BoxShape.circle,
                              border: Border.all(color: Colors.white, width: 3),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.purple.withAlpha(30),
                                  blurRadius: 15,
                                  offset: const Offset(0, 5),
                                )
                              ],
                            ),
                            child: ClipOval(
                              child: Image.asset(
                                'assets/images/welcome_poster.png',
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) {
                                  return Image.asset('assets/images/mascot.png');
                                },
                              ),
                            ),
                          ),
                          const SizedBox(height: 20),

                          Text(
                            isAr ? 'أهلاً بك في Looply ∞' : 'Welcome to Looply. ∞',
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.black,
                              color: Color(0xFF1D1A23),
                            ),
                          ),
                          const SizedBox(height: 12),

                          Text(
                            isAr
                                ? 'مساحة رقمية من نوع جديد، صُممت لتجعل رحلة كل طفل أكثر توازناً، تفاعلاً، ودعماً.'
                                : 'A new kind of digital space, designed to make every child\'s journey more connected, engaging, and supported.',
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF494454),
                              height: 1.5,
                            ),
                          ),
                          const SizedBox(height: 20),

                          // Colored Divider
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(width: 24, height: 4, decoration: BoxDecoration(color: const Color(0xFFFF4D8D), borderRadius: BorderRadius.circular(2))),
                              const SizedBox(width: 4),
                              Container(width: 24, height: 4, decoration: BoxDecoration(color: const Color(0xFFFFB800), borderRadius: BorderRadius.circular(2))),
                              const SizedBox(width: 4),
                              Container(width: 24, height: 4, decoration: BoxDecoration(color: const Color(0xFF00C4CC), borderRadius: BorderRadius.circular(2))),
                              const SizedBox(width: 4),
                              Container(width: 24, height: 4, decoration: BoxDecoration(color: const Color(0xFF7C3AED), borderRadius: BorderRadius.circular(2))),
                            ],
                          ),
                          const SizedBox(height: 20),

                          Text(
                            isAr
                                ? 'حيث يلتقي التعلم بالتواصل، والتنمية باللعب، وكل خطوة تقربنا أكثر.'
                                : 'Where learning meets communication, development meets play, and every step brings us closer together.',
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1D1A23),
                            ),
                          ),
                          const SizedBox(height: 32),

                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () => appState.navigateTo(ViewState.portalSelection),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFFFF7A00),
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(vertical: 18),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                elevation: 4,
                              ),
                              child: Text(
                                isAr ? 'ابدأ الآن — Let\'s Get Started' : 'Let\'s Get Started',
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

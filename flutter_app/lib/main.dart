import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import 'models/app_state.dart';
import 'models/user_model.dart';
import 'screens/welcome_screen.dart';
import 'screens/portal_selection_screen.dart';
import 'screens/family_selection_screen.dart';
import 'screens/auth_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/child_portal_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppState(),
      child: const LooplyApp(),
    ),
  );
}

class LooplyApp extends StatelessWidget {
  const LooplyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final isAr = appState.isRTL;

    return MaterialApp(
      title: 'Looply - Family & Rehab Care',
      debugShowCheckedModeBanner: false,
      locale: Locale(appState.language),
      supportedLocales: const [
        Locale('ar', ''),
        Locale('en', ''),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: GoogleFonts.cairo().fontFamily,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF7A00),
          primary: const Color(0xFFFF7A00),
          secondary: const Color(0xFF7C3AED),
        ),
      ),
      home: Directionality(
        textDirection: isAr ? TextDirection.rtl : TextDirection.ltr,
        child: _buildCurrentScreen(appState.currentView),
      ),
    );
  }

  Widget _buildCurrentScreen(ViewState view) {
    switch (view) {
      case ViewState.welcome:
        return const WelcomeScreenWidget();
      case ViewState.portalSelection:
        return const PortalSelectionScreen();
      case ViewState.familySelection:
        return const FamilySelectionScreen();
      case ViewState.login:
        return const AuthScreen(isRegister: false);
      case ViewState.register:
        return const AuthScreen(isRegister: true);
      case ViewState.dashboard:
      case ViewState.plan:
      case ViewState.tokenBoards:
      case ViewState.report:
      case ViewState.communityMessages:
        return const DashboardScreen();
      case ViewState.childWelcome:
      case ViewState.childPortal:
        return const ChildPortalScreen();
      default:
        return const WelcomeScreenWidget();
    }
  }
}

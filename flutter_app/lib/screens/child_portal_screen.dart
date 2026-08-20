import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_state.dart';
import '../models/user_model.dart';

class ChildPortalScreen extends StatelessWidget {
  const ChildPortalScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final isAr = appState.isRTL;
    final child = appState.activeChild ??
        (appState.children.isNotEmpty
            ? appState.children.first
            : Child(id: 'c1', name: 'أحمد', age: 7, avatar: '🧑‍🚀', stars: 12));

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF818CF8), Color(0xFFC084FC), Color(0xFFF472B6)],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Top Bar for Child
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.home, color: Colors.white, size: 32),
                      onPressed: () => appState.navigateTo(ViewState.familySelection),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.white.withAlpha(200),
                        borderRadius: BorderRadius.circular(30),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.star_rounded, color: Colors.amber, size: 28),
                          const SizedBox(width: 6),
                          Text(
                            '${child.stars}',
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.extrabold,
                              color: Color(0xFF1E293B),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),

              // Child Header & Avatar
              const SizedBox(height: 10),
              CircleAvatar(
                radius: 44,
                backgroundColor: Colors.white,
                child: Text(
                  child.avatar ?? '🚀',
                  style: const TextStyle(fontSize: 48),
                ),
              ),
              const SizedBox(height: 10),
              Text(
                isAr ? 'أهلاً بك يا ${child.name}! 🌟' : 'Welcome, ${child.name}! 🌟',
                style: const TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.extrabold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 30),

              // Games / Tasks Grid
              Expanded(
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(36),
                      topRight: Radius.circular(36),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        isAr ? 'تحديات اليوم 🎯' : 'Today\'s Challenges 🎯',
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1E293B),
                        ),
                      ),
                      const SizedBox(height: 16),

                      Expanded(
                        child: GridView.count(
                          crossAxisCount: 2,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                          children: [
                            _buildTaskCard(
                              title: isAr ? 'تمارين النطق' : 'Speech Practice',
                              emoji: '🗣️',
                              starsReward: 5,
                              color: const Color(0xFFFEF3C7),
                            ),
                            _buildTaskCard(
                              title: isAr ? 'لعبة التركيز' : 'Focus Game',
                              emoji: '🧩',
                              starsReward: 10,
                              color: const Color(0xFFE0E7FF),
                            ),
                            _buildTaskCard(
                              title: isAr ? 'تمارين الحركة' : 'Motor Skills',
                              emoji: '🏃‍♂️',
                              starsReward: 8,
                              color: const Color(0xFFDCFCE7),
                            ),
                            _buildTaskCard(
                              title: isAr ? 'متجر المكافآت' : 'Reward Store',
                              emoji: '🎁',
                              starsReward: 0,
                              color: const Color(0xFFFCE7F3),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTaskCard({
    required String title,
    required String emoji,
    required int starsReward,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(5),
            blurRadius: 10,
            offset: const Offset(0, 4),
          )
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(emoji, style: const TextStyle(fontSize: 40)),
          const SizedBox(height: 8),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 14,
              color: Color(0xFF1E293B),
            ),
          ),
          if (starsReward > 0) ...[
            const SizedBox(height: 6),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.star_rounded, color: Colors.amber, size: 16),
                const SizedBox(width: 4),
                Text(
                  '+$starsReward',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xFFD97706),
                  ),
                )
              ],
            )
          ]
        ],
      ),
    );
  }
}

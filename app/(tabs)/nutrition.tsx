
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface Recipe {
  id: string;
  name: string;
  category: 'weight-loss' | 'muscle-gain' | 'maintenance';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: number;
  cost: number;
  ingredients: string[];
  instructions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Grilled Chicken & Vegetables',
    category: 'weight-loss',
    calories: 320,
    protein: 35,
    carbs: 15,
    fat: 12,
    cookTime: 25,
    cost: 4.50,
    difficulty: 'Easy',
    ingredients: [
      '6oz chicken breast',
      '1 cup broccoli',
      '1 cup bell peppers',
      '1 tbsp olive oil',
      'Salt and pepper',
      'Garlic powder'
    ],
    instructions: [
      'Season chicken with salt, pepper, and garlic powder',
      'Heat olive oil in a pan over medium-high heat',
      'Cook chicken for 6-7 minutes per side until done',
      'Steam vegetables for 5-7 minutes',
      'Serve hot'
    ]
  },
  {
    id: '2',
    name: 'Protein Power Bowl',
    category: 'muscle-gain',
    calories: 650,
    protein: 45,
    carbs: 55,
    fat: 22,
    cookTime: 20,
    cost: 6.00,
    difficulty: 'Easy',
    ingredients: [
      '1 cup quinoa',
      '6oz lean ground turkey',
      '1/2 avocado',
      '1 cup black beans',
      '1/4 cup Greek yogurt',
      'Mixed greens',
      'Hot sauce'
    ],
    instructions: [
      'Cook quinoa according to package directions',
      'Brown ground turkey in a pan with seasonings',
      'Warm black beans',
      'Assemble bowl with quinoa as base',
      'Top with turkey, beans, avocado, and yogurt',
      'Add greens and hot sauce to taste'
    ]
  },
  {
    id: '3',
    name: 'Overnight Protein Oats',
    category: 'muscle-gain',
    calories: 420,
    protein: 28,
    carbs: 45,
    fat: 12,
    cookTime: 5,
    cost: 2.50,
    difficulty: 'Easy',
    ingredients: [
      '1/2 cup rolled oats',
      '1 scoop protein powder',
      '1 tbsp chia seeds',
      '1 cup almond milk',
      '1 tbsp almond butter',
      '1/2 banana',
      'Cinnamon'
    ],
    instructions: [
      'Mix oats, protein powder, and chia seeds in a jar',
      'Add almond milk and stir well',
      'Add almond butter and mashed banana',
      'Sprinkle with cinnamon',
      'Refrigerate overnight',
      'Enjoy cold in the morning'
    ]
  },
  {
    id: '4',
    name: 'Zucchini Noodle Stir-Fry',
    category: 'weight-loss',
    calories: 280,
    protein: 22,
    carbs: 18,
    fat: 14,
    cookTime: 15,
    cost: 3.75,
    difficulty: 'Easy',
    ingredients: [
      '2 large zucchini, spiralized',
      '4oz shrimp',
      '1 cup snap peas',
      '1 bell pepper',
      '2 tbsp coconut oil',
      'Ginger and garlic',
      'Soy sauce'
    ],
    instructions: [
      'Spiralize zucchini into noodles',
      'Heat coconut oil in a wok',
      'Stir-fry shrimp until pink',
      'Add vegetables and cook for 3-4 minutes',
      'Add zucchini noodles and toss for 2 minutes',
      'Season with soy sauce and serve'
    ]
  },
  {
    id: '5',
    name: 'Sweet Potato & Black Bean Bowl',
    category: 'maintenance',
    calories: 480,
    protein: 18,
    carbs: 72,
    fat: 16,
    cookTime: 30,
    cost: 3.25,
    difficulty: 'Easy',
    ingredients: [
      '1 large sweet potato',
      '3/4 cup black beans',
      '1/4 cup quinoa',
      '2 tbsp tahini',
      'Mixed greens',
      '1/4 cup pumpkin seeds',
      'Lime juice'
    ],
    instructions: [
      'Roast cubed sweet potato at 400°F for 25 minutes',
      'Cook quinoa according to package directions',
      'Warm black beans with spices',
      'Make tahini dressing with lime juice',
      'Assemble bowl with greens as base',
      'Top with sweet potato, quinoa, beans, and seeds',
      'Drizzle with tahini dressing'
    ]
  }
];

const CATEGORIES = [
  { key: 'all', label: 'All Recipes', icon: 'fork.knife' },
  { key: 'weight-loss', label: 'Weight Loss', icon: 'minus.circle' },
  { key: 'muscle-gain', label: 'Muscle Gain', icon: 'plus.circle' },
  { key: 'maintenance', label: 'Maintenance', icon: 'equal.circle' },
];

export default function NutritionScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = selectedCategory === 'all' 
    ? SAMPLE_RECIPES 
    : SAMPLE_RECIPES.filter(recipe => recipe.category === selectedCategory);

  const renderCategorySelector = () => (
    <View style={styles.categorySelector}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              selectedCategory === category.key && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <IconSymbol 
              name={category.icon as any} 
              size={20} 
              color={selectedCategory === category.key ? colors.card : colors.text} 
            />
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category.key && styles.selectedCategoryButtonText
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderRecipeCard = (recipe: Recipe) => (
    <TouchableOpacity
      key={recipe.id}
      style={styles.recipeCard}
      onPress={() => setSelectedRecipe(recipe)}
    >
      <View style={styles.recipeHeader}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(recipe.category) }]}>
          <Text style={styles.categoryBadgeText}>{recipe.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.recipeStats}>
        <View style={styles.statItem}>
          <IconSymbol name="flame" size={16} color={colors.accent} />
          <Text style={styles.statText}>{recipe.calories} cal</Text>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="clock" size={16} color={colors.primary} />
          <Text style={styles.statText}>{recipe.cookTime} min</Text>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="dollarsign.circle" size={16} color={colors.secondary} />
          <Text style={styles.statText}>${recipe.cost.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.macros}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{recipe.protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{recipe.carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{recipe.fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecipeDetail = () => {
    if (!selectedRecipe) return null;

    return (
      <View style={styles.recipeDetail}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setSelectedRecipe(null)}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.detailContent}>
          <View style={styles.detailStats}>
            <View style={styles.detailStatItem}>
              <IconSymbol name="flame" size={20} color={colors.accent} />
              <Text style={styles.detailStatText}>{selectedRecipe.calories} calories</Text>
            </View>
            <View style={styles.detailStatItem}>
              <IconSymbol name="clock" size={20} color={colors.primary} />
              <Text style={styles.detailStatText}>{selectedRecipe.cookTime} minutes</Text>
            </View>
            <View style={styles.detailStatItem}>
              <IconSymbol name="dollarsign.circle" size={20} color={colors.secondary} />
              <Text style={styles.detailStatText}>${selectedRecipe.cost.toFixed(2)} per serving</Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>• {ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {selectedRecipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>{index + 1}</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weight-loss': return colors.error;
      case 'muscle-gain': return colors.secondary;
      case 'maintenance': return colors.primary;
      default: return colors.textSecondary;
    }
  };

  if (selectedRecipe) {
    return (
      <SafeAreaView style={[commonStyles.container]} edges={['top']}>
        {renderRecipeDetail()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>Nutrition Guide</Text>
        <Text style={commonStyles.textSecondary}>Healthy & affordable recipes for your goals</Text>
      </View>

      {renderCategorySelector()}

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        {filteredRecipes.map(renderRecipeCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  categorySelector: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 6,
  },
  selectedCategoryButtonText: {
    color: colors.card,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  recipeCard: {
    ...commonStyles.card,
    marginBottom: 16,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  macroLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  recipeDetail: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailStats: {
    paddingVertical: 20,
  },
  detailStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailStatText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  ingredientItem: {
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  instructionNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 12,
    minWidth: 24,
  },
  instructionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    flex: 1,
  },
});

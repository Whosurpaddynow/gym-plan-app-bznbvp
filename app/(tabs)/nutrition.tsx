
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
import { useGameification } from '@/hooks/useGameification';

import * as Haptics from 'expo-haptics';

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
  logged?: boolean;
}

const SAMPLE_RECIPES: Recipe[] = [
  // Weight Loss Recipes
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    category: 'weight-loss',
    calories: 350,
    protein: 35,
    carbs: 15,
    fat: 18,
    cookTime: 20,
    cost: 8,
    difficulty: 'Easy',
    ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil', 'Lemon'],
    instructions: ['Season and grill chicken', 'Chop vegetables', 'Mix salad', 'Add dressing'],
    logged: false,
  },
  {
    id: '2',
    name: 'Green Smoothie',
    category: 'weight-loss',
    calories: 220,
    protein: 15,
    carbs: 35,
    fat: 8,
    cookTime: 5,
    cost: 6,
    difficulty: 'Easy',
    ingredients: ['Spinach', 'Banana', 'Protein powder', 'Almond milk', 'Chia seeds'],
    instructions: ['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately'],
    logged: false,
  },
  {
    id: '3',
    name: 'Zucchini Noodles with Turkey',
    category: 'weight-loss',
    calories: 280,
    protein: 28,
    carbs: 12,
    fat: 15,
    cookTime: 15,
    cost: 7,
    difficulty: 'Easy',
    ingredients: ['Zucchini', 'Ground turkey', 'Marinara sauce', 'Garlic', 'Italian herbs'],
    instructions: ['Spiralize zucchini', 'Cook turkey with garlic', 'Add sauce and herbs', 'Serve over zucchini noodles'],
    logged: false,
  },
  {
    id: '4',
    name: 'Cauliflower Rice Bowl',
    category: 'weight-loss',
    calories: 320,
    protein: 25,
    carbs: 18,
    fat: 16,
    cookTime: 25,
    cost: 9,
    difficulty: 'Medium',
    ingredients: ['Cauliflower', 'Chicken thighs', 'Bell peppers', 'Onion', 'Coconut oil', 'Spices'],
    instructions: ['Rice cauliflower in food processor', 'Season and cook chicken', 'Sauté vegetables', 'Combine and serve'],
    logged: false,
  },
  {
    id: '5',
    name: 'Greek Yogurt Parfait',
    category: 'weight-loss',
    calories: 250,
    protein: 20,
    carbs: 25,
    fat: 8,
    cookTime: 5,
    cost: 5,
    difficulty: 'Easy',
    ingredients: ['Greek yogurt', 'Berries', 'Nuts', 'Honey', 'Granola'],
    instructions: ['Layer yogurt in bowl', 'Add berries and nuts', 'Drizzle with honey', 'Top with granola'],
    logged: false,
  },
  {
    id: '6',
    name: 'Egg White Veggie Scramble',
    category: 'weight-loss',
    calories: 180,
    protein: 22,
    carbs: 8,
    fat: 6,
    cookTime: 10,
    cost: 4,
    difficulty: 'Easy',
    ingredients: ['Egg whites', 'Spinach', 'Mushrooms', 'Tomatoes', 'Herbs'],
    instructions: ['Heat pan with cooking spray', 'Sauté vegetables', 'Add egg whites', 'Scramble until cooked'],
    logged: false,
  },

  // Muscle Gain Recipes
  {
    id: '7',
    name: 'Protein Power Bowl',
    category: 'muscle-gain',
    calories: 650,
    protein: 45,
    carbs: 55,
    fat: 25,
    cookTime: 25,
    cost: 12,
    difficulty: 'Medium',
    ingredients: ['Quinoa', 'Lean beef', 'Sweet potato', 'Broccoli', 'Avocado', 'Greek yogurt'],
    instructions: ['Cook quinoa', 'Grill beef', 'Roast sweet potato', 'Steam broccoli', 'Assemble bowl'],
    logged: false,
  },
  {
    id: '8',
    name: 'Post-Workout Wrap',
    category: 'muscle-gain',
    calories: 580,
    protein: 38,
    carbs: 48,
    fat: 22,
    cookTime: 15,
    cost: 9,
    difficulty: 'Easy',
    ingredients: ['Whole wheat tortilla', 'Turkey breast', 'Hummus', 'Vegetables', 'Cheese'],
    instructions: ['Warm tortilla', 'Spread hummus', 'Add turkey and vegetables', 'Roll tightly'],
    logged: false,
  },
  {
    id: '9',
    name: 'Salmon and Rice Bowl',
    category: 'muscle-gain',
    calories: 720,
    protein: 42,
    carbs: 65,
    fat: 28,
    cookTime: 30,
    cost: 15,
    difficulty: 'Medium',
    ingredients: ['Salmon fillet', 'Brown rice', 'Asparagus', 'Teriyaki sauce', 'Sesame seeds'],
    instructions: ['Cook rice', 'Season and bake salmon', 'Steam asparagus', 'Glaze with teriyaki', 'Garnish with seeds'],
    logged: false,
  },
  {
    id: '10',
    name: 'Chicken and Pasta',
    category: 'muscle-gain',
    calories: 680,
    protein: 40,
    carbs: 72,
    fat: 18,
    cookTime: 25,
    cost: 10,
    difficulty: 'Medium',
    ingredients: ['Chicken breast', 'Whole wheat pasta', 'Marinara sauce', 'Parmesan', 'Basil'],
    instructions: ['Cook pasta', 'Grill and slice chicken', 'Heat sauce', 'Combine all ingredients', 'Top with cheese'],
    logged: false,
  },
  {
    id: '11',
    name: 'Protein Pancakes',
    category: 'muscle-gain',
    calories: 450,
    protein: 35,
    carbs: 40,
    fat: 15,
    cookTime: 15,
    cost: 6,
    difficulty: 'Easy',
    ingredients: ['Protein powder', 'Oats', 'Eggs', 'Banana', 'Milk', 'Berries'],
    instructions: ['Blend oats into flour', 'Mix all ingredients', 'Cook pancakes in pan', 'Top with berries'],
    logged: false,
  },
  {
    id: '12',
    name: 'Steak and Potatoes',
    category: 'muscle-gain',
    calories: 750,
    protein: 48,
    carbs: 45,
    fat: 35,
    cookTime: 35,
    cost: 18,
    difficulty: 'Hard',
    ingredients: ['Sirloin steak', 'Baby potatoes', 'Green beans', 'Butter', 'Garlic', 'Herbs'],
    instructions: ['Season steak', 'Roast potatoes with herbs', 'Grill steak to preference', 'Steam green beans', 'Serve together'],
    logged: false,
  },

  // Maintenance Recipes
  {
    id: '13',
    name: 'Balanced Buddha Bowl',
    category: 'maintenance',
    calories: 480,
    protein: 22,
    carbs: 45,
    fat: 24,
    cookTime: 30,
    cost: 10,
    difficulty: 'Medium',
    ingredients: ['Brown rice', 'Chickpeas', 'Roasted vegetables', 'Tahini', 'Spinach'],
    instructions: ['Cook rice', 'Roast chickpeas and vegetables', 'Make tahini dressing', 'Assemble bowl'],
    logged: false,
  },
  {
    id: '14',
    name: 'Mediterranean Chicken',
    category: 'maintenance',
    calories: 520,
    protein: 35,
    carbs: 32,
    fat: 26,
    cookTime: 25,
    cost: 11,
    difficulty: 'Medium',
    ingredients: ['Chicken thighs', 'Quinoa', 'Olives', 'Feta cheese', 'Cucumber', 'Olive oil'],
    instructions: ['Marinate chicken in herbs', 'Cook quinoa', 'Grill chicken', 'Make Greek salad', 'Combine and serve'],
    logged: false,
  },
  {
    id: '15',
    name: 'Veggie Stir Fry',
    category: 'maintenance',
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 16,
    cookTime: 20,
    cost: 8,
    difficulty: 'Easy',
    ingredients: ['Mixed vegetables', 'Tofu', 'Brown rice', 'Soy sauce', 'Ginger', 'Garlic'],
    instructions: ['Cook rice', 'Press and cube tofu', 'Stir fry vegetables and tofu', 'Add sauce', 'Serve over rice'],
    logged: false,
  },
  {
    id: '16',
    name: 'Turkey Meatballs',
    category: 'maintenance',
    calories: 460,
    protein: 32,
    carbs: 38,
    fat: 20,
    cookTime: 30,
    cost: 9,
    difficulty: 'Medium',
    ingredients: ['Ground turkey', 'Whole wheat breadcrumbs', 'Egg', 'Marinara sauce', 'Zucchini noodles'],
    instructions: ['Mix turkey with breadcrumbs and egg', 'Form meatballs', 'Bake in oven', 'Serve with sauce and zucchini noodles'],
    logged: false,
  },
  {
    id: '17',
    name: 'Tuna Avocado Salad',
    category: 'maintenance',
    calories: 380,
    protein: 28,
    carbs: 15,
    fat: 24,
    cookTime: 10,
    cost: 7,
    difficulty: 'Easy',
    ingredients: ['Canned tuna', 'Avocado', 'Mixed greens', 'Cherry tomatoes', 'Lemon', 'Olive oil'],
    instructions: ['Drain tuna', 'Mash avocado with lemon', 'Mix tuna with avocado', 'Serve over greens with tomatoes'],
    logged: false,
  },
  {
    id: '18',
    name: 'Lentil Soup',
    category: 'maintenance',
    calories: 340,
    protein: 20,
    carbs: 48,
    fat: 8,
    cookTime: 45,
    cost: 6,
    difficulty: 'Easy',
    ingredients: ['Red lentils', 'Vegetable broth', 'Carrots', 'Celery', 'Onion', 'Spices'],
    instructions: ['Sauté vegetables', 'Add lentils and broth', 'Simmer until tender', 'Season to taste'],
    logged: false,
  },
  {
    id: '19',
    name: 'Chicken Caesar Wrap',
    category: 'maintenance',
    calories: 490,
    protein: 30,
    carbs: 35,
    fat: 24,
    cookTime: 15,
    cost: 8,
    difficulty: 'Easy',
    ingredients: ['Grilled chicken', 'Romaine lettuce', 'Caesar dressing', 'Parmesan', 'Whole wheat tortilla'],
    instructions: ['Slice grilled chicken', 'Toss lettuce with dressing', 'Add chicken and cheese', 'Wrap tightly'],
    logged: false,
  },
  {
    id: '20',
    name: 'Overnight Oats',
    category: 'maintenance',
    calories: 320,
    protein: 15,
    carbs: 45,
    fat: 10,
    cookTime: 5,
    cost: 4,
    difficulty: 'Easy',
    ingredients: ['Rolled oats', 'Greek yogurt', 'Milk', 'Chia seeds', 'Berries', 'Honey'],
    instructions: ['Mix oats with milk and yogurt', 'Add chia seeds and honey', 'Refrigerate overnight', 'Top with berries'],
    logged: false,
  },

  // Additional Healthy Options
  {
    id: '21',
    name: 'Quinoa Stuffed Peppers',
    category: 'maintenance',
    calories: 410,
    protein: 18,
    carbs: 52,
    fat: 16,
    cookTime: 40,
    cost: 9,
    difficulty: 'Medium',
    ingredients: ['Bell peppers', 'Quinoa', 'Black beans', 'Corn', 'Cheese', 'Spices'],
    instructions: ['Cook quinoa', 'Hollow out peppers', 'Mix quinoa with beans and corn', 'Stuff peppers', 'Bake until tender'],
    logged: false,
  },
  {
    id: '22',
    name: 'Protein Smoothie Bowl',
    category: 'muscle-gain',
    calories: 520,
    protein: 32,
    carbs: 48,
    fat: 18,
    cookTime: 10,
    cost: 8,
    difficulty: 'Easy',
    ingredients: ['Protein powder', 'Frozen berries', 'Banana', 'Granola', 'Nuts', 'Coconut flakes'],
    instructions: ['Blend protein powder with frozen fruit', 'Pour into bowl', 'Top with granola and nuts', 'Add coconut flakes'],
    logged: false,
  },
  {
    id: '23',
    name: 'Asian Lettuce Wraps',
    category: 'weight-loss',
    calories: 290,
    protein: 24,
    carbs: 18,
    fat: 14,
    cookTime: 20,
    cost: 10,
    difficulty: 'Medium',
    ingredients: ['Ground chicken', 'Butter lettuce', 'Water chestnuts', 'Soy sauce', 'Ginger', 'Green onions'],
    instructions: ['Cook chicken with ginger', 'Add water chestnuts and sauce', 'Serve in lettuce cups', 'Garnish with green onions'],
    logged: false,
  },
  {
    id: '24',
    name: 'Sweet Potato Hash',
    category: 'maintenance',
    calories: 450,
    protein: 16,
    carbs: 58,
    fat: 18,
    cookTime: 25,
    cost: 7,
    difficulty: 'Easy',
    ingredients: ['Sweet potatoes', 'Eggs', 'Bell peppers', 'Onion', 'Spinach', 'Olive oil'],
    instructions: ['Dice and roast sweet potatoes', 'Sauté peppers and onion', 'Add spinach', 'Top with fried eggs'],
    logged: false,
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Recipes', icon: 'fork.knife', color: colors.text },
  { key: 'weight-loss', label: 'Weight Loss', icon: 'minus.circle', color: colors.error },
  { key: 'muscle-gain', label: 'Muscle Gain', icon: 'plus.circle', color: colors.secondary },
  { key: 'maintenance', label: 'Maintenance', icon: 'equal.circle', color: colors.primary },
];

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
  getCategoryColor: (category: string) => string;
}

const RecipeCard = React.memo(({ recipe, onPress, getCategoryColor }: RecipeCardProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(recipe);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.recipeCard}>
        <View style={styles.recipeHeader}>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.recipeMetrics}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(recipe.category) }]}>
                <Text style={styles.categoryBadgeText}>
                  {recipe.category.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
              <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>
          </View>
          
          {recipe.logged && (
            <View style={styles.loggedIndicator}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
            </View>
          )}
        </View>

        <View style={styles.nutritionInfo}>
          <View style={styles.nutritionItem}>
            <IconSymbol name="flame.fill" size={16} color={colors.accent} />
            <Text style={styles.nutritionText}>{recipe.calories} cal</Text>
          </View>
          <View style={styles.nutritionItem}>
            <IconSymbol name="timer" size={16} color={colors.primary} />
            <Text style={styles.nutritionText}>{recipe.cookTime} min</Text>
          </View>
          <View style={styles.nutritionItem}>
            <IconSymbol name="dollarsign.circle" size={16} color={colors.secondary} />
            <Text style={styles.nutritionText}>${recipe.cost}</Text>
          </View>
        </View>

        <View style={styles.macroBreakdown}>
          <View style={styles.macroBar}>
            <View style={[styles.macroSegment, { flex: recipe.protein, backgroundColor: colors.error }]} />
            <View style={[styles.macroSegment, { flex: recipe.carbs, backgroundColor: colors.secondary }]} />
            <View style={[styles.macroSegment, { flex: recipe.fat, backgroundColor: colors.accent }]} />
          </View>
          <View style={styles.macroLabels}>
            <Text style={styles.macroLabelText}>P: {recipe.protein}g</Text>
            <Text style={styles.macroLabelText}>C: {recipe.carbs}g</Text>
            <Text style={styles.macroLabelText}>F: {recipe.fat}g</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function NutritionScreen() {
  const { logMeal, addXp } = useGameification();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(SAMPLE_RECIPES);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [targetCalories] = useState(2000);

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const loggedRecipes = recipes.filter(recipe => recipe.logged);
  const caloriesProgress = dailyCalories / targetCalories;

  const handleLogMeal = (recipe: Recipe) => {
    setRecipes(prev => prev.map(r => 
      r.id === recipe.id ? { ...r, logged: true } : r
    ));
    setDailyCalories(prev => prev + recipe.calories);
    
    logMeal(); // This will trigger XP gain and achievement checks
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    setSelectedRecipe(null);
  };

  const renderNutritionHeader = () => (
    <View style={styles.nutritionHeader}>
      <Text style={styles.headerTitle}>Today's Nutrition</Text>
      
      <View style={styles.caloriesContainer}>
        <View style={styles.caloriesInfo}>
          <Text style={styles.caloriesNumber}>{dailyCalories}</Text>
          <Text style={styles.caloriesLabel}>/ {targetCalories} calories</Text>
        </View>
        
        <View style={styles.progressRing}>
          <View style={styles.progressBackground}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min(caloriesProgress * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(caloriesProgress * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>
            {loggedRecipes.reduce((sum, recipe) => sum + recipe.protein, 0)}g
          </Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>
            {loggedRecipes.reduce((sum, recipe) => sum + recipe.carbs, 0)}g
          </Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>
            {loggedRecipes.reduce((sum, recipe) => sum + recipe.fat, 0)}g
          </Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
    </View>
  );

  const renderCategorySelector = () => (
    <View style={styles.categorySelector}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryButtons}>
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
                color={selectedCategory === category.key ? colors.card : category.color} 
              />
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.key && styles.selectedCategoryButtonText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const getCategoryColor = (category: string) => {
    const categoryData = CATEGORIES.find(cat => cat.key === category);
    return categoryData?.color || colors.primary;
  };

  const renderRecipeDetail = () => {
    if (!selectedRecipe) return null;

    return (
      <View style={styles.recipeDetail}>
        <View style={styles.detailHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedRecipe(null)}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
          
          {!selectedRecipe.logged && (
            <TouchableOpacity 
              style={styles.logMealButton}
              onPress={() => handleLogMeal(selectedRecipe)}
            >
              <IconSymbol name="plus.circle.fill" size={20} color={colors.card} />
              <Text style={styles.logMealButtonText}>Log Meal</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.detailContent}>
          <View style={styles.detailNutrition}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionDetailItem}>
                <Text style={styles.nutritionDetailValue}>{selectedRecipe.calories}</Text>
                <Text style={styles.nutritionDetailLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionDetailItem}>
                <Text style={styles.nutritionDetailValue}>{selectedRecipe.protein}g</Text>
                <Text style={styles.nutritionDetailLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionDetailItem}>
                <Text style={styles.nutritionDetailValue}>{selectedRecipe.carbs}g</Text>
                <Text style={styles.nutritionDetailLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionDetailItem}>
                <Text style={styles.nutritionDetailValue}>{selectedRecipe.fat}g</Text>
                <Text style={styles.nutritionDetailLabel}>Fat</Text>
              </View>
            </View>
          </View>

          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <IconSymbol name="circle.fill" size={6} color={colors.primary} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.instructionsSection}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {selectedRecipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
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
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        {renderNutritionHeader()}
        {renderCategorySelector()}
        
        <View style={styles.recipesContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Recipes' : CATEGORIES.find(c => c.key === selectedCategory)?.label}
          </Text>
          
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={setSelectedRecipe}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  nutritionHeader: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  caloriesInfo: {
    flex: 1,
  },
  caloriesNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  caloriesLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  progressRing: {
    alignItems: 'center',
  },
  progressBackground: {
    width: 80,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  macroLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  recipesContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  recipeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  recipeMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.card,
  },
  difficultyText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  loggedIndicator: {
    marginLeft: 12,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  macroBreakdown: {
    marginTop: 8,
  },
  macroBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  macroSegment: {
    height: '100%',
  },
  macroLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroLabelText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  recipeDetail: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  logMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  logMealButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  detailContent: {
    flex: 1,
    padding: 20,
  },
  detailNutrition: {
    marginBottom: 24,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nutritionDetailItem: {
    alignItems: 'center',
  },
  nutritionDetailValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  nutritionDetailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  ingredientsSection: {
    marginBottom: 24,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  instructionsSection: {
    marginBottom: 24,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.card,
  },
  instructionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    lineHeight: 24,
  },
});

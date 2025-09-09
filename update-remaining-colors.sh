#!/bin/bash

# Screen Rant Color System Update Script
# This script helps find and replace remaining hard-coded colors

echo "🎨 Screen Rant Color System Update Script"
echo "=========================================="

# Function to find remaining red colors
find_red_colors() {
    echo "🔍 Finding remaining red color classes..."
    echo ""
    
    echo "📍 Text red colors:"
    grep -r "text-red-[0-9]" components/ app/ --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" | head -10
    
    echo ""
    echo "📍 Background red colors:"
    grep -r "bg-red-[0-9]" components/ app/ --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" | head -10
    
    echo ""
    echo "📍 Border red colors:"
    grep -r "border-red-[0-9]" components/ app/ --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" | head -10
}

# Function to show replacement patterns
show_replacements() {
    echo ""
    echo "🔄 Replacement Patterns:"
    echo "======================="
    echo "text-red-600 → text-brand-primary"
    echo "text-red-500 → text-brand-primary"
    echo "text-red-700 → text-brand-hover"
    echo "bg-red-600 → bg-brand-primary"
    echo "bg-red-700 → bg-brand-hover"
    echo "bg-red-50 → bg-brand-muted"
    echo "bg-red-100 → bg-brand-muted"
    echo "border-red-600 → border-brand-primary"
    echo "border-red-200 → border-brand-muted"
    echo ""
}

# Function to perform replacements (with confirmation)
perform_replacements() {
    echo "⚠️  This will modify files. Make sure you have a backup!"
    read -p "Do you want to proceed with automatic replacements? (y/N): " confirm
    
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        echo "🔄 Performing replacements..."
        
        # Replace text colors
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/text-red-600/text-brand-primary/g'
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/text-red-500/text-brand-primary/g'
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/text-red-700/text-brand-hover/g'
        
        # Replace background colors
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/bg-red-600/bg-brand-primary/g'
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/bg-red-700/bg-brand-hover/g'
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/bg-red-50/bg-brand-muted/g'
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/bg-red-100/bg-brand-muted/g'
        
        # Replace border colors
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/border-red-600/border-brand-primary/g'
        find components/ app/ -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs sed -i '' 's/border-red-200/border-brand-muted/g'
        
        echo "✅ Replacements completed!"
        echo "📝 Please review the changes and test the application."
    else
        echo "❌ Replacements cancelled."
    fi
}

# Main menu
case "${1:-menu}" in
    "find")
        find_red_colors
        ;;
    "replace")
        show_replacements
        perform_replacements
        ;;
    "patterns")
        show_replacements
        ;;
    *)
        echo "Usage:"
        echo "  ./update-remaining-colors.sh find     - Find remaining red colors"
        echo "  ./update-remaining-colors.sh patterns - Show replacement patterns"
        echo "  ./update-remaining-colors.sh replace  - Perform automatic replacements"
        echo ""
        find_red_colors
        show_replacements
        ;;
esac 
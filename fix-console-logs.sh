#!/bin/bash

# Replace console.log with logger.info, console.error with logger.error, console.warn with logger.warn
# In backend/src directory

echo "Converting console.* to logger.* in backend/src..."

find backend/src -type f -name "*.js" -not -path "*/node_modules/*" -not -path "*/__tests__/*" | while read file; do
  # Skip if file doesn't have console
  if ! grep -q "console\.\(log\|error\|warn\)" "$file"; then
    continue
  fi

  echo "Processing: $file"

  # Add logger require if not present
  if ! grep -q "const logger = require.*logger" "$file"; then
    sed -i "1s/^/const logger = require('..\/utils\/logger');\n/" "$file"
  fi

  # Replace patterns
  sed -i "s/console\.log(/logger.info(/g" "$file"
  sed -i "s/console\.error(/logger.error(/g" "$file"
  sed -i "s/console\.warn(/logger.warn(/g" "$file"
  sed -i "s/console\.debug(/logger.debug(/g" "$file"
done

echo "✅ Conversion complete"

HERMES_DSYM_PATH="$PODS_ROOT/hermes-engine/dSYM"
if [ -d "$HERMES_DSYM_PATH" ]; then
  cp -r "$HERMES_DSYM_PATH" "$BUILT_PRODUCTS_DIR"
fi

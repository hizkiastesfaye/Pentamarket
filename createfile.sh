#!/bin/bash
base_path="src/features"

# Define the directories
#directories=("Users" "Products" "Orders" "Carts" "Inventory" "SupportTicket")

# Define the files
# files=("Controller.js" "Model.js" "Routes.js" "Service.js")

# for dir in "${directories[@]}"; do
#	for file in "${files[@]}"; do
#		touch "$base_path/$dir/$file"
#	done
# done
touch "$base_path/app.js" 
touch "$base_path/runserver.js"

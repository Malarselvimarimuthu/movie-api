# DEFINATIONS

PURPLE='\033[0;35m'
GREEN='\033[0;32m'
NC='\033[0m' 

# Step 1
printf "${PURPLE}Generating package.json${NC}\n"
npm init

# Step 2
printf "${PURPLE}Generating project${NC}\n"
npm install express dotenv
npm i -D typescript @types/express @types/node
npm install -D concurrently nodemon

# Step 3
printf "${PURPLE}Generating tsconfig.json${NC}\n"
npx tsc --init

# Step 4
printf "${PURPLE}Generating .gitignore${NC}\n"
echo "/node_modules" >> .gitignore

# Step 5
printf "${PURPLE}Generating .env${NC}\n"
echo ".env" >> .gitignore
echo "/build" >> .gitignore
echo ".DS_Store" >> .gitignore

# Step 6
printf "${PURPLE}Generating .prettierrc${NC}\n"
echo "{" >> .prettierrc
echo "\"trailingComma\": \"none\"," >> .prettierrc
echo "\"tabWidth\": 2," >> .prettierrc
echo "\"semi\": true," >> .prettierrc
echo "\"singleQuote\": true," >> .prettierrc
echo "\"printWidth\": 120" >> .prettierrc
echo "}" >> .prettierrc

# Step 7
printf "${PURPLE}Generating Folder Structure...${NC}\n"
mkdir src
cd src
touch index.ts
mkdir configs
cd configs
touch sample.ts
cd ..
mkdir controllers
cd controllers
touch sample.ts
cd ..
mkdir middlewares
cd middlewares
touch sample.ts
cd ..
mkdir models
cd models
touch sample.ts
cd ..
mkdir routes
cd routes
touch sample.ts
cd ..
mkdir types
cd types
touch sample.ts
cd ..
mkdir utils
cd utils
touch sample.ts
cd ..
mkdir interfaces
cd interfaces
touch sample.ts
cd ..
mkdir helpers
cd helpers
touch sample.ts
cd ..
mkdir constants
cd constants
touch sample.ts
cd ..
cd ..

# Step 8
printf "${PURPLE}Creating setup readme file${NC}\n"
touch SETUP.txt
echo "Package.json script config: " >> SETUP.txt
echo "\n\n"
echo "\n{" >> SETUP.txt
echo "\"scripts\": {
    \"build\": \"npx tsc\",
    \"start\": \"node dist/index.js\",
    \"dev\": \"concurrently \\\"npx tsc --watch\\\" \\\"nodemon -q dist/index.js\\\"\"
  }" >> SETUP.txt
echo "}\n\n" >> SETUP.txt

echo "tsconfig.ts script config: " >> SETUP.txt
echo "\n\n"
echo "\n{" >> SETUP.txt
echo "\"compilerOptions\": {
    \"outDir\": \"./dist\"
  }" >> SETUP.txt
echo "}\n" >> SETUP.txt

echo Step1:"npm run build" is the command to 
echo built the dist file 

#Step 9
printf "${PURPLE}Installing default packages${NC}\n"
npm i aws-sdk axios bcryptjs cors cron crypto jsonwebtoken mongoose multer razorpay uuid socket.io path joi
npm i -D @types/axios @types/bcryptjs @types/cors @types/cron @types/express @types/jsonwebtoken @types/uuid concurrently


username=$(whoami)
current_dir=$(basename "$(pwd)")

# Execute the chown command
sudo chown -R "$username" "$current_dir"


# Process completed
printf "\n"
printf "${GREEN}*************************************************${NC}\n"
printf "${GREEN}***                                           ***${NC}\n"
printf "${GREEN}***        PROJECT CREATED SUCCUSSFULLY       ***${NC}\n"
printf "${GREEN}***                                           ***${NC}\n"
printf "${GREEN}***${NC}            ${PURPLE}TEMPLATED${NC}           ${GREEN}***${NC}\n"
printf "${GREEN}*************************************************${NC}\n"





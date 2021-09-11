echo install api node modules
(cd ./snake-api && npm install)

echo build api
(cd ./snake-api && npm run build)

echo install aws cdk
npm install -g aws-cdk

echo install iac node modules
(cd ./snake-iac && npm install)

echo get existing stacks
(cd ./snake-iac && cdk list)

echo generate CloudFormation template
(cd ./snake-iac && cdk synthesize)
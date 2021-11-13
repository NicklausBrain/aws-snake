# aws-snake
AWS &amp; CDK evaluation project

# Prerequisites
- [Configure AWS account](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html)
  - [Create AWS access key](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
```
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"sudo installer -pkg AWSCLIV2.pkg -target /
```
- Configure AWS CLI using the created access key
```
aws configure
```
- [Install Node LTS](https://nodejs.org/en/download/)
```
brew install node # mac
sudo apt-get install nodejs # debian
```
- Install AWS CDK toolkit
```
npm install -g aws-cdk
```
- Install the target SDK/Runtime (in our case TypeScript)
```
npm install -g typescript
```
# Deploying from the local env
- open repository root folder
```
cd aws-snake
```
- install api node modules
```
(cd ./snake-api && npm install)
```
- build api project
```
(cd ./snake-api && npm run build)
```
- deploy the CDK toolkit stack into an AWS environment
```
(cd ./snake-iac && cdk bootstrap)
```
- compare local and remote stack configs
```
(cd ./snake-iac && cdk diff)
```
- deploy the stack to AWS
```
(cd ./snake-iac && cdk deploy)
```
# Configuring CI/CD
- Fork this repository
- Configure test and prod [virtual environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#creating-an-environment)

- [Configure forked repository with AWS secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository):
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`

- Create a Github Action from [ci-cd.yml](.github/workflows/ci-cd.yml) file

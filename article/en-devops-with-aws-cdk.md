# DevOps with AWS CDK

In this article, I want to share my experience with an interesting technology that, I believe, sets the future for the Infrastructure as a Code in general, namely AWS CDK.
 
    In addition to the textual report, you will also have a sample project that you can use as a bootstrap for your own.

Essentialy AWS CDK allows you to code your infrastracture in a general-purpose programming language of your choice. Or at least almost, the languagess supported are: csharp|fsharp|go|java|javascript|python|typescript

Our encounter with AWS CDK was quite accidental. We've been requested for a relatively simple project, MVP rather. The project needed to be delivered in a season with a small team (4-6 people). We could not afford to have a dedicated DevOps role but maintaining configuration for several environments appeared to be a pressing need early on. And yes, it had to be built upon AWS, <i>while my previous experience was mostly about Azure, so using more-less familiar ARM templates or Azure CLI were not an options.</i>


Handling the configuration shift.

# Outro
AWS CDK settled the precident. Release of the Terraform CDK is proof the the future of the IaC is in using the common programming languages instead of domain/wendor specific ones.
This not just lowers the entrance gap for the Continuos delivery discipline BUT aloows the team to be trully cross-functional wich is essential for agile development.

Catch sentences:
- DevOps, Continous delivery and Infrastructure as a code are big words today
- Make your application self-sufeccient: just download the code, run it and see
- Aws CDK pushes it to the next level.

# Useful links
- https://acloudguru.com/blog/engineering/cloudformation-terraform-or-cdk-guide-to-iac-on-aws
- https://aws.amazon.com/blogs/aws/new-cloudformation-drift-detection/
- https://searchaws.techtarget.com/tip/Compare-AWS-CDK-vs-CloudFormation-and-the-state-of-IaC-on-AWS
https://www.nclouds.com/blog/what-is-aws-cdk-and-why-should-your-devops-teams-use-it/
- https://www.hashicorp.com/blog/building-azure-resources-with-typescript-using-the-cdk-for-terraform
- https://awsmaniac.com/hey-azure-and-google-cloud-we-need-the-aws-cdk-from-you-too/
- https://www.youtube.com/watch?v=HcmPi7-IVQo
- https://habr.com/ru/post/524892/
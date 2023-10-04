import * as cdk from 'aws-cdk-lib';
import * as codeCommit from 'aws-cdk-lib/aws-codecommit';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LearnCodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = new codeCommit.Repository(this, "Repository", {
      repositoryName: "learn-codepipeline"
    });

    const pipeline =new pipelines.CodePipeline(this, "Pipeline", {
        pipelineName: "learn-codepipeline",
        synth: new pipelines.CodeBuildStep("Synth", {
          input: pipelines.CodePipelineSource.codeCommit(repository, 'master'),
          commands: [
            'npm ci',
            'npm run build',
          ]
        }),
      }
    );



    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LearnCodepipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

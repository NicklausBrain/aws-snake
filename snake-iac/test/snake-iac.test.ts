import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SnakeIac from '../lib/snake-iac-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SnakeIac.SnakeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

module.exports = {
  branches: ['master', 'main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'docs', release: false },
          { type: 'style', release: false },
          { type: 'refactor', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'test', release: false },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'chore', section: 'Chore' },
          { type: 'docs', section: 'Miscellaneous' },
          { type: 'style', section: 'Miscellaneous' },
          { type: 'refactor', section: 'Refactoring' },
          { type: 'perf', section: 'Miscellaneous' },
          { type: 'test', section: 'Miscellaneous' },
        ],
      },
    ],
    // '@semantic-release/npm',
    '@semantic-release/github',
    '@semantic-release/git',
    [
      '@semantic-release/exec',
      // {
      //   publishCmd: 'npm run deploy:prod',
      // },
    ],
    [
      'semantic-release-slack-bot',
      {
        notifyOnSuccess: true,
        notifyOnFail: true,
        packageName: 'Todo Backend',
        markdownReleaseNotes: true,
        slackWebhook:
          'https://hooks.slack.com/services/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',
      },
    ],
  ],
};

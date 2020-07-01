module.exports = {
  name: 'pong-score',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pong-score',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};

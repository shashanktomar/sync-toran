import replace from 'replace-in-file';

const testhelperFile = './lib/testhelper.js';

console.log('\n========Patching testhelper========\n');
try {
  replace.sync({
    files: testhelperFile,
    from: [/var _underscore2.*/g, /_underscore/g],
    to: ['', '_']
  });
} catch (error) {
  console.error('File replace error:', error);
}

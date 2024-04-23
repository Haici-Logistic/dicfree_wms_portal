module.exports = {
  apps: [
    {
      name: 'dicfree_portal',
      namespace: 'dicfree',
      script: 'bun',
      args: 'dev',
      ignore_watch: ['node_modules', 'logs', 'tmp', '*.pyc'],
      error_file: './logs/error.log',
      out_file: './logs/out.log'
    }
  ]
};

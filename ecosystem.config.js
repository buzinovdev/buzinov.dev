module.exports = {
  apps: [
    {
      name: 'buzinov.dev',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      args: "node"
    }, {
      name: "api",
      port: '8000',
      exec_mode: "cluster",
      instances: "1",
      script: "./api/index.js",
      args: "start",
    },
  ],
};
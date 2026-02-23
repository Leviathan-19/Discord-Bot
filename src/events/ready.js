module.exports = {
  name: 'ready',
  execute(client) {
    console.log(`Bot funcionando como ${client.user.tag}`);
  },
};
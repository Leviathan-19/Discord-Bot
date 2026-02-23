const { SlashCommandBuilder } = require('discord.js');
const movieService = require('../../services/movieService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Buscar una película o serie')
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('Título de la película')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();

    if (!focusedValue) return;

    const results = await movieService.searchTitlesByPrefix(focusedValue);

    await interaction.respond(
      results.map(movie => ({
        name: movie.title,
        value: movie.title
      }))
    );
  },

  async execute(interaction) {
    const title = interaction.options.getString('title');

    await interaction.reply(`🔎 Buscando información de: ${title}`);
    
    // Aquí luego puedes hacer:
    // const movie = await movieService.getByTitle(title);
  }
};
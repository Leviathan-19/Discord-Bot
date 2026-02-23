require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
const commandsPath = path.join(__dirname, "src/commands");

function loadCommands(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith(".js")) {
      const command = require(fullPath);
      if (command.data) {
        commands.push(command.data.toJSON());
      }
    }
  }
}

loadCommands(commandsPath);

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN_DISCORD);

(async () => {
  try {
    console.log("🔄 Registrando comandos...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.APPLICATION_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Comandos registrados correctamente");
  } catch (error) {
    console.error(error);
  }
})();
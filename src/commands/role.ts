import { ChatInputCommandInteraction, Client, GuildMemberRoleManager, SlashCommandBuilder } from 'discord.js'

const SlashCommand = new SlashCommandBuilder() 
    .setName("role")
    .setDescription("Atribui ou remove um cargo de um usuário.")

    .addStringOption(option =>
        option.setName("action")
        .setDescription("Qual a ação que será feita sobre o usuário.")
        .setRequired(true)

        .addChoices(
            { name: "Atribuir", value: "assign" },
            { name: "Remover", value: "remove" }
        )
    )

    .addUserOption(option =>
        option.setName("target")
        .setDescription("O usuário no qual será realizada a ação.")
        .setRequired(true)
    )

    .addRoleOption(option =>
        option.setName("role")
        .setDescription("O cargo que será atribuido ou removido.")
        .setRequired(true)
    )

export default {
    data: SlashCommand,
    async execute(client: Client, interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser("target");
        const role = interaction.options.getRole("role");
        
        const action = interaction.options.getString("action");

        const userHasPermissions = interaction.memberPermissions.has("Administrator") || interaction.memberPermissions.has("ManageRoles");
        const authorRole = interaction.member.roles as GuildMemberRoleManager;
        const clientMember = interaction.guild.members.resolve(client.user.id);

        const isOwner = interaction.guild.ownerId == interaction.user.id;

        if ((!userHasPermissions || authorRole.highest.position >= role.position) && !isOwner) {
            interaction.reply(`Você não tem permissões o sulficiente para alterar o cargo do(a) ${target.username}.`);
            return;
        }

        if (role.position >= clientMember.roles.highest.position) {
            interaction.reply(
                `Desculpe, mas eu não tenho permissões o sulficiente para alterar o cargo ${role.name}. \nPara funcionar, coloque o cargo @${clientMember.roles.highest.id} acima de todos os outros cargos do servidor.`
            );
            return;
        }

        try {
            const member = interaction.guild.members.resolve(client.user.id);
            if (action == "assign") {
                await member.roles.add(role.id);                
                interaction.reply("Cargo atribuido com sucesso!");
            } else if (member.roles.cache.find(r => r.id == role.id)) {
                await member.roles.remove(role.id);
                interaction.reply("Cargo removido com sucesso!");
            }
        } catch (err) {
            interaction.reply(
                "Não foi possível atribuir/remover o cargo ao usuário, verifique se eu possuo permissões o sulficiente para isso e e tente novamente."
            );
        }
    }
}
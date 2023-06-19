const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a kick",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du Kick",
            required: false
        }

    ],

    async run(bot, message, args) {

            let user = args.getUser("membre")
            if(!user) return message.reply("Pas de membre a kick !")
            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply("Pas de membre a kick !")

            let reason = args.getStrig("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if(message.user.id === user.id) return message.reply("Essaie pas de te kick !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peut pas kick le proprietaire du serveur !")
            if(member && !member.Kickable) return message.reply("Je ne peux pas kick ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir ce membre !")

            try {await user.send(`Tu as ete Kick du serveur &{message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a Kick ${user.tag} pour la raison : \`${reason}\``)

            await member.kick(reason)
    }
}
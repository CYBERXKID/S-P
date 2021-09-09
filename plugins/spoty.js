/* Copyright (C) 2021 TERROR BOY.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WHITE DEVIL-->> TERROR BOY
*/

const ktb = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const Language = require('../language');
const Lang = Language.getString('spotify');
let FM = Config.WORKTYPE == 'public' ? false : true

Amdi.addCommand({ pattern: 'spotify ?(.*)', fromMe: FM, desc: Lang.SPO_DESC,  deleteCommand: false}, async (message, match) => {

  const link = match[1]
    
      if (!link) return await message.client.sendMessage(message.jid,Lang.SPO_NEED,MessageType.text, {quoted: message.data})
      var payload = await ktb.spotify(link)
      var downloading = await message.client.sendMessage(message.jid,Lang.SPO_DOWN,MessageType.text, {quoted: message.data});
      var spo_link = await axios.get(payload.link, { responseType: 'arraybuffer'})
    
        var uploading = await message.client.sendMessage(message.jid,Lang.SPO_UP,MessageType.text, {quoted: message.data});
        await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
        await message.client.sendMessage(message.jid,Buffer.from(spo_link.data), MessageType.document, {filename: payload.title + '.mp3', mimetype: 'audio/mpeg', quoted: message.data})
        return await message.client.deleteMessage(message.jid, {id: uploading.key.id, remoteJid: message.jid, fromMe: true})

      .catch(
        async (err) => await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data}),
    )
  },
)

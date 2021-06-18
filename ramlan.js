const {
	WAConnection,
	MessageType,
	Presence,
	Mimetype,
	GroupSettingChange,
	mentionedJid
} = require("@adiwajshing/baileys")
const imageToBase64 = require('image-to-base64')
const moment = require("moment-timezone")
const speed = require('performance-now')
const base64Img = require('base64-img')
const imgbb = require('imgbb-uploader')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { exec } = require("child_process")
const fetch = require('node-fetch')
const ms = require('parse-ms')
const crypto = require('crypto')
const axios = require('axios')
const cheerio = require('cheerio')
const FormData = require('form-data')
const toMs = require('ms')
const fs = require("fs")
const { fetchJson } = require('./lib/fetcher')
const { nad } = require('./language')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const a = '```'
const {
	color,
	bgcolor
} = require('./lib/color')
const {
	getBuffer,
	getGroupAdmins,
	getRandom,
	banner,
	start,
	info,
	success,
	close
} = require('./lib/functions')
//Load Json

/*
SETTINGS
*/
botName = "YAN GANZ BOT" // NAMA BOT
ownerName = "YAN GANZ" // NAMA OWNER
vhtear = "sayahafiz" // https://vhtear.com
xteam = "APIKEY" // https://api.xteam.xyz
prefix = "x" // PREFIX / AWALAN
blocked = []
limitawal = "9999" // LIMIT USER
memberlimit = "0" // MEMBER LIMIT GROUP
cr = "*YAN BOT GANZ*" // FAKE REPLY
const ownerNumber = "62895413606266@s.whatsapp.net" // NOMOR OWNER
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:YAN GANZ\n' // NAMA OWNER
            + 'ORG:YAN GANZ BOT;\n' // NAMA BOT
            + 'TEL;type=CELL;type=VOICE;waid=62895413606266:+62895413606266\n' // NOMOR OWNER
            + 'END:VCARD'
/*
SETTINGS
*/
const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const premium = JSON.parse(fs.readFileSync('./database/premium.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const bad = JSON.parse(fs.readFileSync('./database/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/badword.json'))
const event = JSON.parse(fs.readFileSync('./database/event.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const uang = JSON.parse(fs.readFileSync('./database/uang.json'))
const _limit = JSON.parse(fs.readFileSync('./database/limit.json'))
const audioya = JSON.parse(fs.readFileSync('./media/audio.json'))
const imegya = JSON.parse(fs.readFileSync('./media/image.json'))
const setimker = JSON.parse(fs.readFileSync('./media/stik.json'))
const vidioya = JSON.parse(fs.readFileSync('./media/video.json'))
// End Json
const getLevelingXp = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].xp
	}
}

const getLevelingLevel = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].level
	}
}

const getLevelingId = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].id
	}
}

const addLevelingXp = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingLevel = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].level += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingId = (sender) => {
	const obj = { id: sender, xp: 1, level: 1 }
	_level.push(obj)
	fs.writeFileSync('./database/level.json', JSON.stringify(_level))
}

const getRegisteredRandomId = () => {
	return _registered[Math.floor(Math.random() * _registered.length)].id
}

const addRegisteredUser = (userid, sender, time, serials) => {
	const obj = { id: userid, name: sender, time: time, serial: serials }
	_registered.push(obj)
	fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
}

const createSerial = (size) => {
	return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const checkRegisteredUser = (sender) => {
	let status = false
	Object.keys(_registered).forEach((i) => {
		if (_registered[i].id === sender) {
			status = true
		}
	})
	return status
}

const addATM = (sender) => {
	const obj = { id: sender, uang: 5 }
	uang.push(obj)
	fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
}

const addKoinUser = (sender, amount) => {
	let position = false
	Object.keys(uang).forEach((i) => {
		if (uang[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		uang[position].uang += amount
		fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
	}
}

const checkATMuser = (sender) => {
	let position = false
	Object.keys(uang).forEach((i) => {
		if (uang[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return uang[position].uang
	}
}

const bayarLimit = (sender, amount) => {
	let position = false
	Object.keys(_limit).forEach((i) => {
		if (_limit[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_limit[position].limit -= amount
		fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
	}
}

const confirmATM = (sender, amount) => {
	let position = false
	Object.keys(uang).forEach((i) => {
		if (uang[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		uang[position].uang -= amount
		fs.writeFileSync('./database/uang.json', JSON.stringify(uang))
	}
}

const limitAdd = (sender) => {
	let position = false
	Object.keys(_limit).forEach((i) => {
		if (_limit[i].id == sender) {
			position = i
		}
	})
	if (position !== false) {
		_limit[position].limit += 1
		fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
	}
}

function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);
	return `${pad(hours)} H ${pad(minutes)} M ${pad(seconds)} S`
}
// SLEEP 
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function starts() {
	const rmln = new WAConnection()
	//WWEB
	rmln.version = [2, 2119, 6]
	rmln.logger.level = 'warn'
	console.log(banner.string)
	rmln.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Scan BosQue'))
	})
	rmln.on('credentials-updated', () => {
		fs.writeFileSync('./MrR4M.json', JSON.stringify(rmln.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Ke Hati Dia')
	})
	fs.existsSync('./MrR4M.json') && rmln.loadAuthInfo('./MrR4M.json')
	rmln.on('connecting', () => {
		start('2', 'Sedang Masuk...')
	})
	rmln.on('open', () => {
		success('2', 'Berhasil Masuk')
	})
	await rmln.connect({ timeoutMs: 30 * 1000 })

	rmln.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await rmln.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await rmln.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*WELCOME IN GC ${mdata.subject}*
___________________________
${a}@${num.split('@')[0]} Intro/Dikick!${a}
${a}➸ Nama :${a}
${a}➸ Umur :${a}
${a}➸ Askot :${a}
${a}➸ Gender :${a}
${a}➸ Udah Punya Doi/Blm :${a}
${a}➸ Pap Muka dumlu!${a}
𝗦𝗮𝘃𝗲 𝗡𝗼𝗺𝗼𝗿 𝗔𝗱𝗺𝗶𝗻
___________________________
${a}Jangan jadi kutu lomcat sayang!${a}`
				let buffer = await getBuffer(ppimg)
				rmln.sendMessage(mdata.id, buffer, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await rmln.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `SELAMAT TINGGAL @${num.split('@')[0]}👋*
${a}Jasamu akan saya kubur dalam dalam${a}`
				let buffer = await getBuffer(ppimg)
				rmln.sendMessage(mdata.id, buffer, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	rmln.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
		for (let i of json[1].blocklist) {
			blocked.push(i.replace('c.us', 's.whatsapp.net'))
		}
	})
	rmln.on('message-new', async (Lan) => {
		try {
			if (!Lan.message) return
			if (Lan.key && Lan.key.remoteJid == 'status@broadcast') return
			if (Lan.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(Lan.message)
			const from = Lan.key.remoteJid
			const type = Object.keys(Lan.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			body = (type === 'conversation' && Lan.message.conversation.startsWith(prefix)) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption.startsWith(prefix) ? Lan.message.imageMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption.startsWith(prefix) ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text.startsWith(prefix) ? Lan.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? Lan.message.conversation : (type === 'extendedTextMessage') ? Lan.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && Lan.message.conversation) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption ? Lan.message.imageMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text ? Lan.message.extendedTextMessage.text : ''
			const mesejAnti = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = rmln.user.jid
			const totalchat = await rmln.chats.all()
			const sender = isGroup ? Lan.participant : Lan.key.remoteJid
			pushname = rmln.contacts[sender] != undefined ? rmln.contacts[sender].vname || rmln.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await rmln.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isEventon = isGroup ? event.includes(from) : false
			const isRegistered = checkRegisteredUser(sender)
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isBanned = ban.includes(sender)
			const isPrem = premium.includes(sender) || isOwner
			const isAntiLink = isGroup ? antilink.includes(from) : false
            const isBadWord = isGroup ? badword.includes(from) : false
			const Rank = getLevelingLevel(sender)
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
				return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				rmln.sendMessage(from, teks, text, { quoted: Lan })
			}
			const sendMess = (hehe, teks) => {
				rmln.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? rmln.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : rmln.sendMessage(from, teks.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": memberr } })
			}
			const sendImage = (teks) => {
				rmln.sendMessage(from, teks, image, { quoted: Lan })
			}
			const costum = (pesan, tipe, target, target2) => {
				rmln.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
			}
			const sendPtt = (teks) => {
				rmln.sendMessage(from, audio, mp3, { quoted: Lan })
			}
        const fakestatus = (teks) => {
            rmln.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": cr,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
			var prema = 'Free'
			if (isPrem) {
				prema = 'Premium'
			}
			if (isOwner) {
				prema = 'BOSS'
			}
			var role = 'NEWBIE'
			if (Rank <= 3) {
				role = 'Bronze I'
			} else if (Rank <= 5) {
				role = 'Bronze II'
			} else if (Rank <= 7) {
				role = 'Bronze III'
			} else if (Rank <= 9) {
				role = 'Silver I'
			} else if (Rank <= 11) {
				role = 'Silver II'
			} else if (Rank <= 13) {
				role = 'Silver III'
			} else if (Rank <= 16) {
				role = 'Gold I'
			} else if (Rank <= 18) {
				role = 'Gold II'
			} else if (Rank <= 20) {
				role = 'Gold III'
			} else if (Rank <= 22) {
				role = 'Gold IV'
			} else if (Rank <= 25) {
				role = 'Platinum I'
			} else if (Rank <= 27) {
				role = 'Platinum II'
			} else if (Rank <= 29) {
				role = 'Platinum III'
			} else if (Rank <= 31) {
				role = 'Platinum IV'
			} else if (Rank <= 33) {
				role = 'Diamond I'
			} else if (Rank <= 35) {
				role = 'Diamomd II'
			} else if (Rank <= 37) {
				role = 'Diamond III'
			} else if (Rank <= 39) {
				role = 'Diamond IV'
			} else if (Rank <= 45) {
				role = 'Master'
			} else if (Rank <= 100) {
				role = 'Grand Master'
			}

			if (isGroup && isRegistered && isLevelingOn) {
				const currentLevel = getLevelingLevel(sender)
				const checkId = getLevelingId(sender)
				try {
					if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
					const amountXp = Math.floor(Math.random() * 10) + 500
					const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
					const getLevel = getLevelingLevel(sender)
					addLevelingXp(sender, amountXp)
					if (requiredXp <= getLevelingXp(sender)) {
						addLevelingLevel(sender, 1)
						bayarLimit(sender, 3)
						await reply(nad.levelup(pushname, sender, getLevelingXp, getLevel, getLevelingLevel, role))
					}
				} catch (err) {
					console.error(err)
				}
			}
			const checkLimit = (sender) => {
				let found = false
				for (let lmt of _limit) {
					if (lmt.id === sender) {
						let limitCounts = limitawal - lmt.limit
						if (limitCounts <= 0) return rmln.sendMessage(from, `Limit Anda Sudah Habis\nUpgrade Premium Biar Bebas Limit Kak`, text, { quoted: Lan })
						rmln.sendMessage(from, nad.limitcount(isPrem, limitCounts), text, { quoted: Lan })
						found = true
					}
				}
				if (found === false) {
					let obj = { id: sender, limit: 0 }
					_limit.push(obj)
					fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
					rmln.sendMessage(from, nad.limitcount(isPrem, limitCounts), text, { quoted: Lan })
				}
			}
			const isLimit = (sender) => {
				let position = false
				for (let i of _limit) {
					if (i.id === sender) {
						let limits = i.limit
						if (limits >= limitawal) {
							position = true
							rmln.sendMessage(from, nad.limitend(pushname, prefix), text, { quoted: Lan })
							return true
						} else {
							_limit
							position = true
							return false
						}
					}
				}
				if (position === false) {
					const obj = { id: sender, limit: 0 }
					_limit.push(obj)
					fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
					return false
				}
			}
			if (isRegistered) {
				const checkATM = checkATMuser(sender)
				try {
					if (checkATM === undefined) addATM(sender)
					const uangsaku = Math.floor(Math.random() * 10) + 90
					addKoinUser(sender, uangsaku)
				} catch (err) {
					console.error(err)
				}
			}
			const limitAdd = (sender) => {
				if (isOwner && isPrem) { return false; }
				let position = false
				Object.keys(_limit).forEach((i) => {
					if (_limit[i].id == sender) {
						position = i
					}
				})
				if (position !== false) {
					_limit[position].limit += 1
					fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
				}
			}
			if (isGroup) {
				try {
					const getmemex = groupMembers.length
					if (getmemex <= memberlimit) {
						reply(`maaf kak membernya sedikit, aku gak bisa disini! Minimal member : ${memberlimit}`)
						setTimeout(() => {
							rmln.groupLeave(from)
						}, 5000)
						setTimeout(() => {
							rmln.updatePresence(from, Presence.composing)
							reply("See you kak")
						}, 4000)
						setTimeout(() => {
							rmln.updatePresence(from, Presence.composing)
							reply("Oh iya, jangan lupain aku ya:(")
						}, 3000)
						setTimeout(() => {
							rmln.updatePresence(from, Presence.composing)
							reply("Baru undang aku lagi:)")
						}, 2000)
						setTimeout(() => {
							rmln.updatePresence(from, Presence.composing)
							reply("Membernya tambahin dulu")
						}, 1000)
						setTimeout(() => {
							rmln.updatePresence(from, Presence.composing)
							reply("Aku pamit ya kak:)")
						}, 0)
					}
				} catch (err) { console.error(err) }
			}
				
				for (let kemem of bad) {

				if (budy.includes(kemem)) {

				if (!isGroup) return
				if (!isBadWord) return
				if (isGroupAdmins) return reply('Untung Kau Admin:) Btw Jangan Ngegas Om😘')
				rmln.updatePresence(from, Presence.composing)
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Jangan Ngomong Kasar Ngemtod😡`)
				setTimeout(() => {
					rmln.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 3000)
				setTimeout(() => {
					rmln.updatePresence(from, Presence.composing)
					reply("Babay")
				}, 2000)
				setTimeout(() => {
					rmln.updatePresence(from, Presence.composing)
					reply("Siap Siap Di Kick")
				}, 1000)
				setTimeout(() => {
					rmln.updatePresence(from, Presence.composing)
					reply("Lu Udah Ngomong Kasar")
				}, 0)
			}
			}
			if (budy.includes("https://chat.whatsapp.com/")) {
				if (!isGroup) return
				if (!isAntiLink) return
				if (isGroupAdmins) return reply('Atasan grup mah bebas yakan:v')
				rmln.updatePresence(from, Presence.composing)
				if (budy.includes("#izinbos")) return reply("Iya kak jangan spam ya")
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Gak Boleh Share Link`)
				setTimeout(() => {
					rmln.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 3000)
				setTimeout(() => {
					rmln.updatePresence(from, Presence.composing)
					reply("Hedsot :v")
				}, 2000)
				setTimeout(() => {
					rmln.updatePresence(from, Presence.composing)
					reply("Bismillah")
				}, 1000)
				setTimeout(() => {
					rmln.updatePresence(from, Presence.composing)
					reply("Ready?")
				}, 0)
			}
			colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;32mBABYBOT\x1b[1;37m]', time, color(command), 'dari', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;31mR4ML4N\x1b[1;37m]', time, color('Pesan'), 'dari', color(pushname), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;32mBABYBOT\x1b[1;37m]', time, color(command), 'dari', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m=\x1b[1;37m>', '[\x1b[1;31mR4ML4N\x1b[1;37m]', time, color('Pesan'), 'dari', color(pushname), 'in', color(groupName), 'args :', color(args.length))
			switch (command) {
				case 'help':
				case 'menu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					me = rmln.user
					const reqXp = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
					const uangku = checkATMuser(sender)
					const lvl = getLevelingLevel(sender)
					const ramadhan = await axios.get('https://xinzbot-api.herokuapp.com/api/hitungmundur?apikey=XinzBot&tanggal=12&bulan=4')
					const ucapan = await axios.get('https://xinzbot-api.herokuapp.com/api/ucapan?apikey=XinzBot&timeZone=Asia/Jakarta')
					gmenu = await getBuffer(me.imgUrl)
					const menunya = `━━ 「 *BOT WHATSAPP* 」 ━━
${a}${ucapan.data.result}${a}

Hitung mundur Ramadhan
${ramadhan.data.result}

*INFO USER BOT*
${a}❏ Nama : ${pushname}${a}
${a}❏ User : ${prema}${a}
${a}❏ Uang : ${uangku}${a}
${a}❏ Xp : ${reqXp}${a}
${a}❏ Rank : ${role}${a}
${a}❏ Level : ${lvl}${a}

*INFO BOT*
${a}❏ Nama : ${botName}${a}
${a}❏ Owner : ${ownerName}${a}
${a}❏ Prefix : 「 ${prefix} 」${a}
${a}❏ Total Register : ${_registered.length}${a}
${a}❏ User Premium : ${premium.length}${a}

*LIST MENU*
${a}❏ ${prefix}simplemenu${a}
${a}❏ ${prefix}groupmenu${a}
${a}❏ ${prefix}downloadmenu${a}
${a}❏ ${prefix}makermenu${a}
${a}❏ ${prefix}sertifikatmenu${a}
${a}❏ ${prefix}gabutmenu${a}
${a}❏ ${prefix}randommenu${a}
${a}❏ ${prefix}dompetmenu${a}
${a}❏ ${prefix}toolsmenu${a}
${a}❏ ${prefix}mutualmenu${a}
${a}❏ ${prefix}othermenu${a}
${a}❏ ${prefix}storagemenu${a}
${a}❏ ${prefix}ownermenu${a}

*ABOUT*
${a}❏ ${prefix}runtime${a}
${a}❏ ${prefix}creator${a}
${a}❏ ${prefix}donasi${a}
${a}❏ ${prefix}iklan${a}
${a}❏ ${prefix}speed${a}
${a}❏ ${prefix}info${a}

━━ 「 *BOT WHATSAPP* 」 ━━`
				rmln.sendMessage(from, gmenu, image, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg",  "caption": cr,  "jpegThumbnail": fs.readFileSync(`./src/image/thumbnail.jpeg`) } } }, caption: menunya })
				break
				case 'owner':
				case 'creator':
					rmln.sendMessage(from, { displayname: "Jeff", vcard: vcard }, MessageType.contact, { quoted: Lan })
					rmln.sendMessage(from, 'Tuh Nomor Pacarku >_<, Ehh Ownerku mksdnya:v', MessageType.text, { quoted: Lan })
					break

				case 'donasi':
				case 'donate':
				rmln.sendMessage(from, nad.donasi(), text, { quoted: Lan })
					break
				case 'iklan':
				rmln.sendMessage(from, nad.iklan(botName, ownerNumbers, ownerName), text, { quoted: Lan })
					break

				case 'speed':
				case 'ping':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const timestamp = speed();
					const latensi = speed() - timestamp
					fakestatus(`Speed: ${latensi.toFixed(4)} _ms_`)
					break
				case 'runtime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					runtime = process.uptime()
					runte = `「 *RUNTIME* 」\n${kyun(runtime)}`
					fakestatus(`${runte}`)
					break
					
					case 'info':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					let i = []
				let giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                anu = process.uptime()
					mee = rmln.user
					ca = totalchat
					ginfo = await getBuffer(mee.imgUrl)
					inponya = `━━ 「 *INFO* 」 ━━
${a}❏ Bot type : NodeJS V14${a}
${a}❏ Name : ${rmln.user.name}${a}
${a}❏ Browser : ${rmln.browserDescription[1]}${a}
${a}❏ Server : ${rmln.browserDescription[0]}${a}
${a}❏ Version : ${rmln.browserDescription[2]}${a}
${a}❏ Speed : ${latensii.toFixed(4)} Second${a}
${a}❏ Handphone : ${rmln.user.phone.device_manufacturer}${a}
${a}❏ Versi WA : ${rmln.user.phone.wa_version}${a}
${a}❏ Group Chat : ${giid.length}${a}
${a}❏ Personal Chat : ${totalchat.length - giid.length}${a}
${a}❏ Total Chat : ${totalchat.length}${a}
${a}❏ Total Block Contact : ${blocked.length}${a}

*THANKS TO*
${a}❏ Ramlan ID${a}
${a}❏ Hafidz Abdillah${a}
${a}❏ MrG3P5${a}
${a}❏ MrHRTZ${a}
${a}❏ Nafiz${a}
${a}❏ Itsmeiky${a}
${a}❏ DuingZ${a}
${a}❏ Arga${a}
${a}❏ Nayla${a}
${a}❏ Fadhil${a}
${a}❏ Adiwajshing/baileys${a}
${a}❏ MhankBarBar${a}
${a}❏ SlavyanDesu${a}
${a}❏ Penyedia API${a}

「 *BOT WHATSAPP* 」`
				rmln.sendMessage(from, ginfo, image, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "mimetype": "image/jpeg",  "caption": cr,  "jpegThumbnail": fs.readFileSync(`./src/image/thumbnail.jpeg`) } } }, caption: inponya })
				break

				case 'simplemenu':
				case 'simpelmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const simpel = `「 *SIMPLE MENU* 」
${a}❏ ${prefix}sticker${a}
${a}❏ ${prefix}stickergif${a}
${a}❏ ${prefix}nuliskiri${a}
${a}❏ ${prefix}nuliskanan${a}
${a}❏ ${prefix}stalkig${a}
${a}❏ ${prefix}tts${a}
${a}❏ ${prefix}ttp${a}
${a}❏ ${prefix}attp${a}
${a}❏ ${prefix}simi${a}
${a}❏ ${prefix}quotes${a}
${a}❏ ${prefix}bikinquote${a}

「 *${botName}* 」`
					fakestatus(simpel)
					break
				case 'sticker':
				case 'stiker':
				case 'stickergif':
				case 'stikergif':
				case 'sgif':
				case 's':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						const media = await rmln.downloadAndSaveMediaMessage(encmedia)

						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								costum('[❗] SEDANG DIPROSES', text, tescuk, cr)
							})
							.on('end', function () {
								console.log('Finish')
								rmln.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: Lan})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && Lan.message.videoMessage.seconds < 11 || isQuotedVideo && Lan.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						const media = await rmln.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						costum('[❗] SEDANG DIPROSES', text, tescuk, cr)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')

								rmln.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: Lan})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
					}
					break

				case 'nuliskiri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teksnya mana kak? Contoh : ${prefix}nuliskiri Ramlan baik hati`)
					reply('「❗」WAIT BRO GUE NULIS DUMLU YAKAN')
					kir = await getBuffer(`https://api.xteam.xyz/magernulis2?text=${q}&APIKEY=${xteam}`)
					rmln.sendMessage(from, kir, image, { quoted: Lan, caption: 'Nihh kak' })
					break
				case 'nuliskanan':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teksnya mana kak? Contoh : ${prefix}nuliskanan Ramlan baik hati`)
					reply('「❗」WAIT BRO GUE NULIS DUMLU YAKAN')
					kan = await getBuffer(`https://api.xteam.xyz/magernulis3?text=${q}&APIKEY=${xteam}`)
					rmln.sendMessage(from, kan, image, { quoted: Lan, caption: 'Nihh kak' })
					break
				case 'stalkig':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Masukan username!\nContoh :\n${prefix}stalkig iamramlan_`)
					anu = await fetchJson(`https://api.xteam.xyz/dl/igstalk?nama=${q}&APIKEY=${xteam}`)
					reply('「❗」Sabar Lagi Stalking IG nya kak')
					stig = await getBuffer(anu.result.user.hd_profile_pic_url_info.url)
					abu = anu.result.user
					hasil = `YAHAHA TELAH DI STALK BOS KU UNTUK USERNAME ${q}
◯ Nama : ${abu.full_name}
◯ Followers : ${abu.follower_count}
◯ Following : ${abu.following_count}
◯ Jumlah Post : ${abu.media_count}
◯ Biografi : ${abu.biography}`
					rmln.sendMessage(from, stig, image, { quoted: Lan, caption: hasil })
					break

				case 'tts':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return rmln.sendMessage(from, `Kode bahasanya mana kak? contoh : ${prefix}tts id Halo Ramlan`, text, { quoted: Lan })
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return rmln.sendMessage(from, `Teksnya mana kak | contoh : ${prefix}tts id ah yamate kudasai`, text, { quoted: Lan })
					var bby = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					bby.length > 300
						? reply('Teks nya terlalu panjang kak')
						: gtts.save(ranm, bby, function () {
							exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
								fs.unlinkSync(ranm)
								buff = fs.readFileSync(rano)
								if (err) return reply(nad.stikga())
								rmln.sendMessage(from, buff, audio, { quoted: Lan, ptt: true })
								fs.unlinkSync(rano)
							})
						})
					break

				case 'ttp':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}ttp BOT`)
					pngttp = './temp/ttp.png'
					webpng = './temp/ttp.webp'
					fetch(`https://api.areltiyan.site/sticker_maker?text=${q}`, { method: 'GET' })
						.then(async res => {
							const ttptxt = await res.json()
							console.log("BERHASIL")
							base64Img.img(ttptxt.base64, 'temp', 'ttp', function (err, filepath) {
								if (err) return console.log(err);
								exec(`ffmpeg -i ${pngttp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${webpng}`, (err) => {
									buffer = fs.readFileSync(webpng)
									rmln.sendMessage(from, buffer, sticker)
									fs.unlinkSync(webpng)
									fs.unlinkSync(pngttp)
								})
							})
						});
					break
				case 'attp':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}attp BOT`)
					atetepe = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
					rmln.sendMessage(from, atetepe, sticker, { quoted: Lan })
					break

				case 'simi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return reply(`Mau Ngapain?\nContoh :\n${prefix}simi halo`)
					anu = await fetchJson(`https://api.xteam.xyz/simsimi?kata=halo&APIKEY=${xteam}`)
					reply(anu.jawaban)
					break

				case 'quotes':
					rmln.updatePresence(from, Presence.composing)
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					data = fs.readFileSync('./R4ML4N/quote.json');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					randQuote = '' + randKey.quote + '\n\n_By: ' + randKey.by + '_'
					fakestatus(randQuote)
					break

				case 'bikinquote':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var quote = gh.split("&")[0];
					var wm = gh.split("&")[1];
					const pref = `yang mau dijadiin quote apaan, titit?\ncontoh :\n${prefix}bikinquote aku bukan boneka & Kata Ramlan`
					if (args.length < 1) return reply(pref)
					reply(nad.wait())
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, { method: 'get' })
					biquote = await getBuffer(anu.result)
					rmln.sendMessage(from, biquote, image, { caption: 'Nih kak >_<', quoted: Lan })
					break
				case 'groupmenu':
				case 'grupmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const menugrup = `「 *GROUP MENU* 」
${a}❏ ${prefix}welcome${a}
${a}❏ ${prefix}leveling${a}
${a}❏ ${prefix}antilink${a}
${a}❏ ${prefix}antibadword${a}
${a}❏ ${prefix}group${a}
${a}❏ ${prefix}admin${a}
${a}❏ ${prefix}add${a}
${a}❏ ${prefix}kick${a}
${a}❏ ${prefix}hidetag${a}
${a}❏ ${prefix}hidetag20${a}
${a}❏ ${prefix}level${a}
${a}❏ ${prefix}linkgroup${a}
${a}❏ ${prefix}tagall${a}
${a}❏ ${prefix}setname${a}
${a}❏ ${prefix}setdesc${a}
${a}❏ ${prefix}demote${a}
${a}❏ ${prefix}promote${a}
${a}❏ ${prefix}hedsot${a}
${a}❏ ${prefix}fitnah${a}
${a}❏ ${prefix}jadian${a}
${a}❏ ${prefix}leave${a}
${a}❏ ${prefix}delete${a}
${a}❏ ${prefix}mining${a}

「 *${botName}* 」`
					fakestatus(menugrup)
					break
                    
				case 'antibadword':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
					if (Number(args[0]) === 1) {
						if (isBadWord) return reply('Sudah Aktif Kak')
						badword.push(from)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Diaktifkan')
						rmln.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti Badword\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isBadWord) return reply('Sudah Mati Kak')
						var ini = antilink.indexOf(from)
						badword.splice(ini, 1)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'welcome':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}welcome 1`)
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Sudah Aktif Kak')
						welkom.push(from)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('「 SUKSES 」Fitur Welcome Diaktifkan')
					} else if (Number(args[0]) === 0) {
						if (!isWelkom) return reply('Sudah Mati Kak')
						welkom.splice(from, 1)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('「 SUKSES 」Fitur Welcome Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'leveling':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}leveling 1`)
					if (Number(args[0]) === 1) {
						if (isLevelingOn) return reply('Sudah Aktif Kak')
						_leveling.push(from)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('「 SUKSES 」Fitur Level Diaktifkan')
					} else if (Number(args[0]) === 0) {
						_leveling.splice(from, 1)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('「 SUKSES 」Fitur Level Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'antilink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('Sudah Aktif Kak')
						antilink.push(from)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur Anti Link Diaktifkan')
						rmln.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti link\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isAntiLink) return reply('Sudah Mati Kak')
						var ini = antilink.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur Anti Link Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'grup':
				case 'group':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk membuka : ${prefix}group buka\nuntuk menutup : ${prefix}group tutup`)
					if (args[0] === 'buka') {
						reply(`Berhasil Membuka group`)
						rmln.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`Berhasil Menutup Group`)
						rmln.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break

				case 'admin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
					adm = `*ATASAN GROUP* _${groupMetadata.subject}_\n*TOTAL* : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						adm += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(adm, groupAdmins, true)
					break

				case 'add':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply('Yang mau di add siapa?')
					if (args[0].startsWith('08')) return reply('Gunakan kode bahasa kak')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						rmln.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Anjim yang mau di add di private, dahlah :)')
					}
					break

				case 'kick':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Reply Chat Target Nya Kak')
					kicknya = Lan.message.extendedTextMessage.contextInfo.participant
					await rmln.groupRemove(from, [kicknya])
					break
					
					case 'hidetag':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					var value = body.slice(9)
					var group = await rmln.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: Lan
					}
					rmln.sendMessage(from, options, text)
					break
				case 'hidetag20':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					var value = body.slice(11)
					var group = await rmln.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: Lan
					}
					rmln.sendMessage(from, options, text)
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                 .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
	                .then(() => {rmln.sendMessage(from, options, text)})
					break

				case 'level':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isLevelingOn) return reply(nad.lvlnoon())
					if (!isGroup) return reply(nad.groupo())
					const userLevel = getLevelingLevel(sender)
					const userXp = getLevelingXp(sender)
					if (userLevel === undefined && userXp === undefined) return reply(nad.lvlnul())
					const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
					resul = `┏━━━━━━♡ *LEVEL* ♡━━━━━━━┓\n┃╭───────────────────\n┃│➸ NAMA : ${pushname}\n┃│➸ NOMOR : wa.me/${sender.split("@")[0]}\n┃│➸ XP : ${userXp}/${requiredXp}\n┃│➸ LEVEL : ${userLevel}\n┃╰───────────────────\n┗━━━━━━━━━━━━━━━━━━━━┛`
					rmln.sendMessage(from, resul, text, { quoted: Lan })
						.catch(async (err) => {
							console.error(err)
							await reply(`Error!\n${err}`)
						})
					break

				case 'linkgrup':
				case 'linkgroup':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (!isGroup) return reply(nad.groupo())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					linkgc = await rmln.groupInviteCode(from)
					yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
					rmln.sendMessage(from, yeh, text, { quoted: Lan })
					break

				case 'tagall':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					members_id = []
					taga = (args.length > 1) ? body.slice(8).trim() : ''
					taga += '\n\n'
					for (let mem of groupMembers) {
						taga += `➸ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(taga, members_id, true)
					break

				case 'setname':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					rmln.groupUpdateSubject(from, `${body.slice(9)}`)
					rmln.sendMessage(from, '「 SUKSES 」Mengubah Nama Grup', text, { quoted: Lan })
					break

				case 'setdesc':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					rmln.groupUpdateDescription(from, `${body.slice(9)}`)
					rmln.sendMessage(from, '*「 SUKSES 」Mengubah Desk Grup', text, { quoted: Lan })
					break

				case 'demote':
				case 'demot':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						dem = ''
						for (let _ of mentioned) {
							dem += `*jabatan kamu di copot*🏃 :\n`
							dem += `@_.split('@')[0]`
						}
						mentions(dem, mentioned, true)
						rmln.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Yahh @${mentioned[0].split('@')[0]} Jabatan kamu sebagai leluhur di grup telah di copot🏃`, mentioned, true)
						rmln.groupDemoteAdmin(from, mentioned)
					}
					break

				case 'promote':
				case 'promot':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						prom = ''
						for (let _ of mentioned) {
							prom += `Yeee🥳 Kamu naik jabatan >_< :\n`
							prom += `@_.split('@')[0]`
						}
						mentions(prom, mentioned, true)
						rmln.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Selamat🥳 @${mentioned[0].split('@')[0]} *anda naik menjadi admin group* >_<`, mentioned, true)
						rmln.groupMakeAdmin(from, mentioned)
					}
					break

				case 'hedsot':
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						heds = 'Bismillah Hedsot >_< :\n'
						for (let _ of mentioned) {
							heds += `@${_.split('@')[0]}\n`
						}
						mentions(heds, mentioned, true)
						rmln.groupRemove(from, mentioned)
						mentions(heds, mentioned, true)
						rmln.groupAdd(from, [num])
					} else {
						mentions(`Berhasil Meng hedsot kepalanya  : @${mentioned[0].split('@')[0]}`, mentioned, true)
						rmln.groupRemove(from, mentioned)
					}
					break

				case 'fitnah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					if (args.length < 1) return reply(`Gini kak : ${prefix}fitnah [@tag&pesan&balasanbot]\n\nContoh : ${prefix}fitnah @tagmember&hai&hai juga`)
					var gh = body.slice(8)
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("&")[0];
					var target = gh.split("&")[1];
					var bot = gh.split("&")[2];
					rmln.sendMessage(from, `${bot}`, text, { quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` } } })
					break

				case 'jadian':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Ciee.. yang lagi jadian\n*@${aku.jid.split('@')[0]}* ♥️ *@${cintax.jid.split('@')[0]}*\nSemoga Langgeng Hii`
					jds.push(aku.jid)
					jds.push(cintax.jid)
					mentions(tejs, jds, true)
					break

				case 'leave':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					setTimeout(() => {
						rmln.groupLeave(from)
					}, 2000)
					setTimeout(() => {
						rmln.updatePresence(from, Presence.composing)
						if (!isRegistered) return reply(nad.noregis())
						if (isBanned) return reply(nad.baned())
						fakestatus('Aku pamit kak:)')
					}, 0)
					break

				case 'del':
				case 'delete':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					rmln.deleteMessage(from, { id: Lan.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break

				case 'mining':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isGroup) return reply(nad.groupo())
					if (!isEventon) return reply(`maaf ${pushname} event mining tidak di aktifkan sama owner ${ownerName}`)
					if (isOwner) {
						const one = 999999999
						addLevelingXp(sender, one)
						addLevelingLevel(sender, 99)
						reply(`karena ${ownerName} baik Bot memberikan ${one}Xp >_<`)
					} else {
						const mining = Math.ceil(Math.random() * 10000)
						addLevelingXp(sender, mining)
						await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
					}
					break

				case 'downloadmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const donlot = `「 *DOWNLOAD MENU* 」
${a}❏ ${prefix}play${a}
${a}❏ ${prefix}ytmp3${a}
${a}❏ ${prefix}ytmp4${a}
${a}❏ ${prefix}tiktod${a}
${a}❏ ${prefix}igphoto${a}
${a}❏ ${prefix}igvideo${a}
${a}❏ ${prefix}joox${a}

「 *${botName}* 」`
					fakestatus(donlot)
					break

				case 'play':
					if (!q) return reply(`Yang mau di download apaan?\nContoh : ${prefix}play DJ TUMANEDANG`)
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					fakestatus('Lagu Sedang Dicari...')
					anu = await fetchJson(`https://api.xteam.xyz/dl/play?lagu=${q}&APIKEY=${xteam}`)
					infomp3 = `*「❗」Lagu Ditemukan「❗」*
➸ Judul : ${anu.judul}
➸ Size : ${anu.size}
➸ Source : ${anu.source}

[WAIT] Proses Dumlu Yakan`
					pla = await getBuffer(anu.thumbnail)
					play = await getBuffer(anu.url)
					rmln.sendMessage(from, pla, image, { quoted: Lan, caption: infomp3 })
					rmln.sendMessage(from, play, audio, { mimetype: 'audio/mp4', quoted: Lan })
					break

				case 'ytmp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply('Link Nya Mana Kak')
					if (!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link Nya Tidak Valid Kak')
					reply(nad.wait())
					anu = await fetchJson(`https://api.xteam.xyz/dl/ytmp3?url=${q}&APIKEY=${xteam}`)
					ingfomp3 = `*「❗」Lagu Ditemukan「❗」*
➸ Judul : ${anu.judul}
➸ Size : ${anu.size}

[WAIT] Proses Dumlu Yakan`
					buff = await getBuffer(anu.thumbnail)
					lamgu = await getBuffer(anu.url)
					rmln.sendMessage(from, buff, image, { quoted: Lan, caption: ingfomp3 })
					rmln.sendMessage(from, lamgu, audio, { mimetype: 'audio/mp4', quoted: Lan })
					break

				case 'ytmp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args.length < 1) return reply('Link Nya Mana Kak')
					if (!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link Nya Tidak Valid Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/ytmp4?url=${q}&APIKEY=${xteam}`)
					reply(nad.wait())
					infomp4 = `*「❗」Video Ditemukan「❗」*
➸ Judul : ${anu.judul}
➸ Size : ${anu.size}

[WAIT] Proses Dumlu Yakan`
					buffe = await getBuffer(anu.thumbnail)
					rmln.sendMessage(from, buffe, image, { quoted: Lan, caption: infomp4 })
					vidio = await getBuffer(anu.url)
					rmln.sendMessage(from, vidio, video, { mimetype: 'video/mp4', quoted: Lan })
					break

				case 'tiktod':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply('Link Nya Mana Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/tiktok?url=${q}&APIKEY=${xteam}`)
					reply('[WAIT] Video akan segera dikirim...')
					tik = await getBuffer(anu.server_1)
					rmln.sendMessage(from, tik, video, { mimetype: 'video/mp4', quoted: Lan })
					break
				case 'igphoto':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply('Link Nya Mana Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/ig?url=${q}&APIKEY=${xteam}`)
					reply(nad.wait())
					buff = await getBuffer(anu.result.data[0].data)
					rmln.sendMessage(from, buff, image, { quoted: Lan })
					break

				case 'igvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args.length < 1) return reply('Link Nya Mana Kak')
					anu = await fetchJson(`https://api.xteam.xyz/dl/ig?url=${q}&APIKEY=${xteam}`)
					reply(nad.wait())
					buffe = await getBuffer(anu.result.data[0].data)
					rmln.sendMessage(from, buffe, video, { mimetype: 'video/mp4', quoted: Lan })
					break
				case 'joox':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Mau Nyari Apaan?\nContoh :\n${prefix}joox sayang`)
					reply(nad.wait())
					anu = await fetchJson(`https://api.xteam.xyz/dl/jooxdl?lagu=${q}&APIKEY=${xteam}`)
					asu = anu.result
					infojoox = `*「❗」Lagu Ditemukan「❗」*
➸ Judul : ${asu.songname}
➸ Size : ${asu.filesize}
➸ Artis : ${asu.singers}
➸ Album : ${asu.album}

[WAIT] Proses Dumlu Yakan`
					buft = await getBuffer(asu.album_url)
					lakgu = await getBuffer(asu.download_url)
					rmln.sendMessage(from, buft, image, { quoted: Lan, caption: infojoox })
					rmln.sendMessage(from, lakgu, audio, { mimetype: 'audio/mp4', quoted: Lan })
					break
				case 'makermenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const Laner = `「 *MAKER MENU* 」
${a}❏ ${prefix}comictext${a}
${a}❏ ${prefix}hekerlogo${a}
${a}❏ ${prefix}graffiti${a}
${a}❏ ${prefix}glowtext${a}
${a}❏ ${prefix}covertext${a}
${a}❏ ${prefix}narutotext${a}
${a}❏ ${prefix}erodedtext${a}
${a}❏ ${prefix}walltext${a}
${a}❏ ${prefix}vietteltext${a}
${a}❏ ${prefix}wingstext${a}
${a}❏ ${prefix}halloween${a}
${a}❏ ${prefix}graffiti2${a}
${a}❏ ${prefix}graffiti3${a}
${a}❏ ${prefix}foiltext${a}
${a}❏ ${prefix}bloodtext${a}
${a}❏ ${prefix}hekertext${a}
${a}❏ ${prefix}bokehtext${a}
${a}❏ ${prefix}carbontext${a}
${a}❏ ${prefix}avengerstext${a}
${a}❏ ${prefix}watertext${a}
${a}❏ ${prefix}firetext${a}
${a}❏ ${prefix}metaltext${a}
${a}❏ ${prefix}ballontext${a}
${a}❏ ${prefix}gemboktext${a}
${a}❏ ${prefix}bannerff${a}
${a}❏ ${prefix}aloklogo${a}
${a}❏ ${prefix}miyalogo${a}
${a}❏ ${prefix}gamelogo${a}
${a}❏ ${prefix}blackpink${a}
${a}❏ ${prefix}thundername${a}
${a}❏ ${prefix}silktext${a}
${a}❏ ${prefix}partytext${a}
${a}❏ ${prefix}romancetext${a}
${a}❏ ${prefix}googletext${a}
${a}❏ ${prefix}glowtext2${a}
${a}❏ ${prefix}lovemessage${a}
${a}❏ ${prefix}glitchtext${a}
${a}❏ ${prefix}galaxytext${a}
${a}❏ ${prefix}pornhub${a}
${a}❏ ${prefix}hartatahta${a}
${a}❏ ${prefix}wetglass${a}
${a}❏ ${prefix}stylelogo${a}
${a}❏ ${prefix}watercolor${a}

「 *${botName}* 」`
					fakestatus(Laner)
					break

				case 'comictext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}comictext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/comic_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'hekerlogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekerlogo Ramlan`)
					reply(`[🗿] Buset Hemker`)
					vhbuff = await getBuffer(`https://api.vhtear.com/hacker_avatar?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'graffiti':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(10)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/cool_wall_graffiti?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'glowtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glowtext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/glow_metallic?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'covertext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}covertext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/cover_banner?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'narutotext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}narutotext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/naruto_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'erodedtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}erodedtext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/eroded_metal?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'walltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}walltext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/the_wall?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'vietteltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}vietteltext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/viettel_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'wingstext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wingstext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/wings_galaxy?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'halloween':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}halloween Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/halloween_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'graffiti2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(11)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti2 Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/girl_graffiti?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'graffiti3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}graffiti3 Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/cartoon_graffiti?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'foiltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}foiltext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/foil_text?text=VHTEAR&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'bloodtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bloodtext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/blood_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'hekertext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekertext Ramlan`)
					reply(`[😎] Heker AbiZzz`)
					vhbuff = await getBuffer(`https://api.vhtear.com/matrix_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'bokehtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bokehtext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/bokeh_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'carbontext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}carbontext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/carbon_text?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'avengerstext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(14)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}avengerstext Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/avengers_text?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'watertext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}watertext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/water_maker?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'firetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}firetext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/fire_maker?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'metaltext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}metaltext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/metal_maker?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'ballontext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}ballontext Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/balloonmaker?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'gemboktext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}gemboktext 11 01 2021 & Ramlan dan Nadia`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/padlock?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'bannerff':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(10)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}bannerff Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/bannerff?title=${ve}&text=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'aloklogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}aloklogo Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/logoff?hero=alok&text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'miyalogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}miyalogo Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/logoml?hero=miya&text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'gamelogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}gamelogo Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/gamelogo?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'blackpink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}blackpink Ramlan`)
					reply(`[😱] Hah Blekping :v`)
					vhbuff = await getBuffer(`https://api.vhtear.com/blackpinkicon?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'thundername':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}thundername Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/thundertext?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'silktext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}silktext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/silktext?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'partytext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}partytext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/partytext?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'romancetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}romancetext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/romancetext?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'googletext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					var ga = gh.split("&")[2];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}googletext Ramlan & Ramlan Gans & Ramlan Baik`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/googletext?text1=${ve}&text2=${za}&text3=${ga}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'glowtext2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glowtext2 Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/glowtext?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'lovemessage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}lovemessage Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'glitchtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(12)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glitchtext Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/glitchtext?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'galaxytext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}galaxytext Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/galaxytext?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'pornhub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(9)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}pornhub Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'hartatahta':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hartatahta Ramlan`)
					reply(`[❗] Hirti Tihti Tai Anjg :v`)
					vhbuff = await getBuffer(`https://api.vhtear.com/hartatahta?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'wetglass':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wetglass Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/wetglass?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'stylelogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}stylelogo Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/stylelogo?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'watercolor':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}watercolor Ramlan`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/watercolor?text=${q}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
				case 'wolflogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					var gh = body.slice(10)
					var ve = gh.split("&")[0];
					var za = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wolflogo Ramlan & Gamteng`)
					reply(nad.wait())
					vhbuff = await getBuffer(`https://api.vhtear.com/avatarwolf?text1=${ve}&text2=${za}&apikey=${vhtear}`)
					rmln.sendMessage(from, vhbuff, image, { quoted: Lan })
					break
/*]====> BY RAMLAN ID <====[*/
				case 'sertifikatmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const serti = `「 *SERTIFIKAT MENU* 」
${a}❏ ${prefix}sertiharam${a}
${a}❏ ${prefix}sertibabu${a}
${a}❏ ${prefix}sertibucin${a}
${a}❏ ${prefix}sertibocilff${a}
${a}❏ ${prefix}sertigay${a}
${a}❏ ${prefix}sertipacar${a}
${a}❏ ${prefix}sertisadboy${a}
${a}❏ ${prefix}sertisurga${a}
${a}❏ ${prefix}sertipinter${a}
${a}❏ ${prefix}sertibadboy${a}
${a}❏ ${prefix}sertibadgirl${a}
${a}❏ ${prefix}sertigoodgirl${a}
${a}❏ ${prefix}sertigoodboy${a}
${a}❏ ${prefix}sertieditor${a}
${a}❏ ${prefix}sertigudluking${a}
${a}❏ ${prefix}sertipakboy${a}
${a}❏ ${prefix}sertijamet${a}
${a}❏ ${prefix}sertiyutub${a}
${a}❏ ${prefix}sertiheker${a}
${a}❏ ${prefix}sertiff1${a}
${a}❏ ${prefix}sertiff2${a}
${a}❏ ${prefix}sertiff3${a}
${a}❏ ${prefix}sertiff4${a}
${a}❏ ${prefix}sertiff5${a}
${a}❏ ${prefix}sertipubg1${a}
${a}❏ ${prefix}sertipubg2${a}
${a}❏ ${prefix}sertiml${a}

「 *${botName}* 」`
					fakestatus(serti)
					break
                    case 'sertiharam':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiharam botwea`)
                    reply(nad.wait())
                    menghayu = await getBuffer(`http://onlydevcity.xyz/AnakHaramSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, menghayu, image, { quoted: Lan })
                    break
                    case 'sertibabu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibabu botwea`)
                    reply(nad.wait())
                    sertibab = await getBuffer(`http://onlydevcity.xyz/BabuSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertibab, image, { quoted: Lan })
                    break
                    case 'sertibucin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibucin botwea`)
                    reply(nad.wait())
                    sertibuci = await getBuffer(`http://onlydevcity.xyz/BucinSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertibuci, image, { quoted: Lan })
                    break
                    case 'sertibocilff':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibocilff botwea`)
                    reply(nad.wait())
                    sertibocilf = await getBuffer(`http://onlydevcity.xyz/CilEpepSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertibocilf, image, { quoted: Lan })
                    break
                    case 'sertigay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigay botwea`)
                    reply(nad.wait())
                    sertiga = await getBuffer(`http://onlydevcity.xyz/GaySerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertiga, image, { quoted: Lan })
                    break
                    case 'sertipacar':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipacar botwea`)
                    reply(nad.wait())
                    sertipaca = await getBuffer(`http://onlydevcity.xyz/PacarSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertipaca, image, { quoted: Lan })
                    break
                    case 'sertisadboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertisadboy botwea`)
                    reply(nad.wait())
                    sertisadbo = await getBuffer(`http://onlydevcity.xyz/SadBoySerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertisadbo, image, { quoted: Lan })
                    break
                    case 'sertisurga':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertisurga botwea`)
                    reply(nad.wait())
                    sertisurg = await getBuffer(`http://onlydevcity.xyz/SurgaSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertisurg, image, { quoted: Lan })
                    break
                    case 'sertipinter':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipinter botwea`)
                    reply(nad.wait())
                    sertipinte = await getBuffer(`http://onlydevcity.xyz/PintarSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertipinte, image, { quoted: Lan })
                    break
                    case 'sertibadboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibadboy botwea`)
                    reply(nad.wait())
                    sertibadbo = await getBuffer(`http://onlydevcity.xyz/BadBoySerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertibadbo, image, { quoted: Lan })
                    break
                    case 'sertibadgirl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertibadgirl botwea`)
                    reply(nad.wait())
                    sertibadgir = await getBuffer(`http://onlydevcity.xyz/BadGirlSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertibadgir, image, { quoted: Lan })
                    break
                    case 'sertigoodgirl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigoodgirl botwea`)
                    reply(nad.wait())
                    sertigoodgir = await getBuffer(`http://onlydevcity.xyz/GoodGirlSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertigoodgir, image, { quoted: Lan })
                    break
                    case 'sertigoodboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigoodboy botwea`)
                    reply(nad.wait())
                    sertigoodbo = await getBuffer(`http://onlydevcity.xyz/GoodBoySerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertigoodbo, image, { quoted: Lan })
                    break
                    case 'sertieditor':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertieditor botwea`)
                    reply(nad.wait())
                    sertiedito = await getBuffer(`http://onlydevcity.xyz/EditorBerkelasSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertiedito, image, { quoted: Lan })
                    break
                    case 'sertigudluking':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertigudluking botwea`)
                    reply(nad.wait())
                    sertigudlukin = await getBuffer(`http://onlydevcity.xyz/GoodLookingSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertigudlukin, image, { quoted: Lan })
                    break
                    case 'sertipakboy':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipakboy botwea`)
                    reply(nad.wait())
                    sertipakbo = await getBuffer(`http://onlydevcity.xyz/FucekBoySerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertipakbo, image, { quoted: Lan })
                    break
                    case 'sertijamet':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertijamet botwea`)
                    reply(nad.wait())
                    sertijame = await getBuffer(`http://onlydevcity.xyz/JametSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertijame, image, { quoted: Lan })
                    break
                    case 'sertiyutub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiyutub botwea`)
                    reply(nad.wait())
                    sertiyutu = await getBuffer(`http://onlydevcity.xyz/YoutuberSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertiyutu, image, { quoted: Lan })
                    break
                    case 'sertiheker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiheker botwea`)
                    reply(nad.wait())
                    sertiheke = await getBuffer(`http://onlydevcity.xyz/HekerSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertiheke, image, { quoted: Lan })
                    break
                    case 'sertiff1':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff1 botwea`)
                    reply(nad.wait())
                    sertiff = await getBuffer(`http://onlydevcity.xyz/FFSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertiff, image, { quoted: Lan })
                    break
                    case 'sertiff2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff2 botwea`)
                    reply(nad.wait())
                    sertif = await getBuffer(`http://onlydevcity.xyz/FFSerti2/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertif, image, { quoted: Lan })
                    break
                    case 'sertiff3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff3 botwea`)
                    reply(nad.wait())
                    sertifa = await getBuffer(`http://onlydevcity.xyz/FFSerti3/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertifa, image, { quoted: Lan })
                    break
                    case 'sertiff4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff4 botwea`)
                    reply(nad.wait())
                    sertifb = await getBuffer(`http://onlydevcity.xyz/FFSerti4/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertifb, image, { quoted: Lan })
                    break
                    case 'sertiff5':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiff5 botwea`)
                    reply(nad.wait())
                    sertifc = await getBuffer(`http://onlydevcity.xyz/FFSerti5/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertifc, image, { quoted: Lan })
                    break
                    case 'sertipubg1':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipubg1 botwea`)
                    reply(nad.wait())
                    sertipubg = await getBuffer(`http://onlydevcity.xyz/PubgTourSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertipubg, image, { quoted: Lan })
                    break
                    case 'sertipubg2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertipubg2 botwea`)
                    reply(nad.wait())
                    sertipub = await getBuffer(`http://onlydevcity.xyz/PubgTourSerti2/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertipub, image, { quoted: Lan })
                    break
                    case 'sertiml':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sertiml botwea`)
                    reply(nad.wait())
                    sertim = await getBuffer(`http://onlydevcity.xyz/MLTourSerti/img.php?nama=${q}`)
                    rmln.sendMessage(from, sertim, image, { quoted: Lan })
                    break
				case 'gabutmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const gabut = `「 *GABUT MENU* 」
${a}❏ ${prefix}tebakin${a}
${a}❏ ${prefix}caklontong${a}
${a}❏ ${prefix}bisakah${a}
${a}❏ ${prefix}kapankah${a}
${a}❏ ${prefix}apakah${a}
${a}❏ ${prefix}rate${a}
${a}❏ ${prefix}hobby${a}
${a}❏ ${prefix}truth${a}
${a}❏ ${prefix}dare${a}
${a}❏ ${prefix}cekbapak${a}
${a}❏ ${prefix}seberapagay${a}

「 *${botName}* 」`
					fakestatus(gabut)
					break
				case 'seberapagay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				anu = await fetchJson(`https://arugaz.herokuapp.com/api/howgay`, {method: 'get'})
				hasil = `Nih Liat Data Gay Si ${q}\n\n\nPersentase Gay : ${anu.persen}%\nAlert!!! : ${anu.desc}`
				reply(hasil)
				break
				case 'tebakin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`https://api.vhtear.com/tebakgambar&apikey=${vhtear}`)
					tebak = await getBuffer(anu.result.soalImg)
					setTimeout(() => {
						rmln.sendMessage(from, '*➸ Jawaban :* ' + anu.result.jawaban, text, { quoted: Lan })
					}, 30000) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, tebak, image, { caption: '_Jawab Ye, Gak Bisa Jawab\nHarus Donasi_', quoted: Lan })
					}, 0) // 1000 = 1s,
					break
				case 'caklontong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`https://api.vhtear.com/funkuis&apikey=${vhtear}`)
					setTimeout(() => {
						rmln.sendMessage(from, '*➸ Jawaban :* ' + anu.result.jawaban + '\n' + anu.result.desk, text, { quoted: Lan })
					}, 30000) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout(() => {
						rmln.sendMessage(from, anu.result.soal, text, { quoted: Lan })
					}, 0) // 1000 = 1s,
					break

				case 'bisakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					bisakah = body.slice(1)
					const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'Ulangi Tod Gua Ga Paham']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					rmln.sendMessage(from, 'Pertanyaan : *' + bisakah + '*\n\nJawaban : ' + keh, text, { quoted: Lan })
					break

					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					kapankah = body.slice(1)
					const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					rmln.sendMessage(from, 'Pertanyaan : *' + kapankah + '*\n\nJawaban : ' + koh, text, { quoted: Lan })
					break

				case 'apakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					apakah = body.slice(1)
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					rmln.sendMessage(from, 'Pertanyaan : *' + apakah + '*\n\nJawaban : ' + kah, text, { quoted: Lan })
					break

				case 'rate':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					rate = body.slice(1)
					const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					rmln.sendMessage(from, 'Pertanyaan : *' + rate + '*\n\nJawaban : ' + te + '%', text, { quoted: Lan })
					break

				case 'hobby':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					hobby = body.slice(1)
					const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					rmln.sendMessage(from, 'Pertanyaan : *' + hobby + '*\n\nJawaban : ' + by, text, { quoted: Lan })
					break

				case 'truth':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					rmln.sendMessage(from, truteh, image, { caption: '*Truth*\n\n' + ttrth, quoted: Lan })
					break

				case 'dare':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					rmln.sendMessage(from, tod, image, { quoted: Lan, caption: '*Dare*\n\n' + der })
					break

				case 'cekbapak': // By Ramlan ID
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Ramlan ID']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					rmln.sendMessage(from, cek, text, { quoted: Lan })
					break

				case 'randommenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const random = `「 *RANDOM MENU* 」
${a}❏ ${prefix}gachacewek${a}
${a}❏ ${prefix}gachacowok${a}
${a}❏ ${prefix}sagiri${a}
${a}❏ ${prefix}megumin${a}
${a}❏ ${prefix}waifu${a}
${a}❏ ${prefix}neko${a}
${a}❏ ${prefix}shinobu${a}
${a}❏ ${prefix}loli${a}
${a}❏ ${prefix}nekonime${a}
${a}❏ ${prefix}darkjokes${a}
${a}❏ ${prefix}meme${a}
${a}❏ ${prefix}estetik${a}

「 *${botName}* 」`
					fakestatus(random)
					break

				case 'gachacewek':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					data = fs.readFileSync('./R4ML4N/cewek.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, 'Jadi Gimana Bwang?:v')
					break

				case 'gachacowok':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					data = fs.readFileSync('./R4ML4N/cowok.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, 'Jadi Gimana Mba?:v')
					break
				case 'meme':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
					mimi = await getBuffer(`https://api.xteam.xyz/randomimage/meme?APIKEY=${xteam}`)
					rmln.sendMessage(from, mimi, image, { quoted: Lan })
					break

				case 'darkjokes':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					data = fs.readFileSync('./R4ML4N/darkjokes.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, '*GELAP BOS :V*')
					break
			case 'waifu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/waifu`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					rmln.sendMessage(from, ifu, image, {quoted: Lan, caption: "Wibu AbiZzz"})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
			case 'neko':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/neko`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					rmln.sendMessage(from, ifu, image, {quoted: Lan})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
			case 'megumin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/megumin`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					rmln.sendMessage(from, ifu, image, {quoted: Lan})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
			case 'shinobu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
				    try {
						axios.get(`https://waifu.pics/api/sfw/shinobu`).then((res)=>{
						imageToBase64(res.data.url)
						.then((response) => {
						var ifu = Buffer.from(response, 'base64');
					rmln.sendMessage(from, ifu, image, {quoted: Lan})
					})})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Error!')
					}
					break
				case 'loli':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
					lomli = await getBuffer(`https://docs-jojo.herokuapp.com/api/randomloli`)
					rmln.sendMessage(from, lomli, image, { quoted: Lan, caption: 'Cintai Loli Mu>_<' })
					break

				case 'nekonime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/random2/neko?apikey=pensiB`)
					reply(nad.wait())
					neko = await getBuffer(anu.result.url_gbr)
					rmln.sendMessage(from, neko, image, { quoted: Lan, caption: 'Nekonime >_<' })
					break

				case 'sagiri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					sagi = await getBuffer(`http://lolhuman.herokuapp.com/api/random/sagiri?apikey=pensiB`)
					reply(nad.wait())
					rmln.sendMessage(from, sagi, image, { quoted: Lan })
					break
				case 'estetik':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`https://api.zeks.xyz/api/estetikpic?apikey=apivinz`)
					reply(nad.wait())
					este = await getBuffer(anu.result.result)
					rmln.sendMessage(from, este, image, { quoted: Lan })
				break
					
				case 'dompetmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const dompet = `「 *DOMPET MENU* 」
${a}❏ ${prefix}limit${a}
${a}❏ ${prefix}transfer${a}
${a}❏ ${prefix}atm${a}
${a}❏ ${prefix}buylimit${a}
${a}❏ ${prefix}premiumlist${a}

「 *${botName}* 」`
					fakestatus(dompet)
					break

				case 'limit':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					checkLimit(sender)
					break

				case 'transfer':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q.includes('|')) return reply(nad.wrongf())
					const tujuan = q.substring(0, q.indexOf('|') - 1)
					const jumblah = q.substring(q.lastIndexOf('|') + 1)
					if (checkATMuser(sender) < jumblah) return reply(`uang mu tidak mencukupi untuk melakukan transfer`)
					const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
					fee = 0.005 * jumblah
					hasiltf = jumblah - fee
					addKoinUser(tujuantf, hasiltf)
					confirmATM(sender, jumblah)
					addKoinUser(`${ownerNumber}`, fee)
					reply(`*「 SUKSES 」*\n\npengiriman uang berhasil\n➸ dari : +${sender.split("@")[0]}\n➸ ke : +${tujuan}\n➸ jumlah transfer : ${jumblah}\n➸ pajak : ${fee}`)
					break

				case 'atm':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const kantong = checkATMuser(sender)
					reply(nad.uangkau(pushname, sender, kantong))
					break

				case 'buylimit':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					payout = body.slice(10)
					const koinPerlimit = 1000
					const total = koinPerlimit * payout
					if (checkATMuser(sender) <= total) return reply(`maaf kak uang nya gak cukup, kumpulin uang nya dumlu >_< jangan open bo kak:v`)
					if (checkATMuser(sender) >= total) {
						confirmATM(sender, total)
						bayarLimit(sender, payout)
						await reply(`*「 PEMBAYARAN BERHASIL 」*\n\n➸ pengirim : Ramlan ID\n➸ penerima : ${pushname}\n➸ nominal pembelian : ${payout} \n➸ harga limit : ${koinPerlimit}/limit\n➸ sisa uang : ${checkATMuser(sender)}\n\nproses berhasil dengan SN\n${createSerial(15)}`)
					}
					break
				case 'toolsmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const tools = `「 *TOOLS MENU* 」
${a}❏ ${prefix}tomp3${a}
${a}❏ ${prefix}tomp4${a}
${a}❏ ${prefix}toptt${a}
${a}❏ ${prefix}toimg${a}
${a}❏ ${prefix}imgtourl${a}
${a}❏ ${prefix}trigered${a}
${a}❏ ${prefix}komenyt${a}
${a}❏ ${prefix}nightcore${a}
${a}❏ ${prefix}slow${a}
${a}❏ ${prefix}tupai${a}
${a}❏ ${prefix}blub${a}
${a}❏ ${prefix}gemuk${a}
${a}❏ ${prefix}ghost${a}
${a}❏ ${prefix}bass${a}

「 *${botName}* 」`
					fakestatus(tools)
					break
				case 'tomp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					rmln.updatePresence(from, Presence.composing)
					if (!isQuotedVideo) return reply('Reply Video Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal Kak Coba Ulangi:)')
						mhee = fs.readFileSync(ran)
						rmln.sendMessage(from, mhee, audio, { mimetype: 'audio/mp4', quoted: Lan })
						fs.unlinkSync(ran)
					})
					break

				case 'toimg':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!isQuotedSticker) return reply('Reply Sticker Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(nad.stikga())
						buffer = fs.readFileSync(ran)
						rmln.sendMessage(from, buffer, image, { quoted: Lan, caption: 'nih kak [(^.^)]' })
						fs.unlinkSync(ran)
					})
					break

                case 'tomp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					reply(nad.wait())
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !Lan.message.videoMessage || isQuotedSticker) && args.length == 0) {
                        ger = isQuotedSticker ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
                        owgi = await rmln.downloadAndSaveMediaMessage(ger)
                        data = await imgbb("7f2cf4cd570b9a442d6fdec16b74dcfc", owgi)
                        axios.get(`https://ezgif.com/webp-to-mp4?url=${data.display_url}`)
                            .then(({ data }) => {
                                $ = cheerio.load(data)
                                bodyFormThen = new FormData()
                                file = $('input[name="file"]').attr('value')
                                token = $('input[name="token"]').attr('value')
                                convert = $('input[name="file"]').attr('value')
                                gotdata = {
                                    file: file,
                                    token: token,
                                    convert: convert
                                }
                                bodyFormThen.append('file', gotdata.file)
                                bodyFormThen.append('token', gotdata.token)
                                bodyFormThen.append('convert', gotdata.convert)
                                axios({
                                    method: 'post',
                                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                                    data: bodyFormThen,
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                                    }
                                }).then(({ data }) => {
                                    $ = cheerio.load(data)
                                    result = 'https:' + $('div#output > p.outfile > video > source').attr('R4ML4N')
                                    getBuffer(result).then(tog => {
                                        rmln.sendMessage(from, tog, video, { mimetype: 'video/mp4', quoted: Lan })
                                    })
                                })
                            })
                    } else {
                        reply('Reply StickerGif nya!')
                    }
                    break
                    
				case 'imgtourl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					costum('[WAIT] Sabar Kak', text, tescuk, cr)
					var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
					var media = await rmln.downloadAndSaveMediaMessage(encmedia)
					var imgbb = require('imgbb-uploader')
					imgbb('9ba3ffa6160a701a61ebafebca46f4cf', media)
						.then(data => {
							var caps = `「 *IMAGE TO URL* 」
➸ ID : ${data.id}
➸ MimeType : ${data.image.mime}
➸ Extension : ${data.image.extension}
➸ URL : ${data.display_url}`
							ibb = fs.readFileSync(media)
							rmln.sendMessage(from, ibb, image, { quoted: Lan, caption: caps })
						})
						.catch(err => {
							throw err
						})
					break

				case 'komenyt':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					gh = body.slice(9)
					usnm = gh.split("&")[0];
					cmn = gh.split("&")[1];
					var imgbb = require('imgbb-uploader')
					try {
						pp = await rmln.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
						pp = 'https://i.ibb.co/Tv6JR98/baby.jpg'
					}
					media = await getBuffer(pp)
					datae = await imageToBase64(JSON.stringify(pp).replace(/\"/gi, ''))
					fs.writeFileSync('getpp.jpeg', datae, 'base64')
					res = await imgbb("7f2cf4cd570b9a442d6fdec16b74dcfc", 'getpp.jpeg')
					buffer = await getBuffer(`https://some-random-api.ml/canvas/youtube-comment?avatar=${res.display_url}&comment=${cmn}&username=${usnm}`)
					rmln.sendMessage(from, buffer, image, { caption: 'Nih Cok', contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_YOUTUBE COMMENT_*' } } })
					break

				case 'trigered':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await rmln.downloadAndSaveMediaMessage(ger)
						anu = await imgbb("7f2cf4cd570b9a442d6fdec16b74dcfc", owgi)
						trig = `${anu.display_url}`
						ranp = getRandom('.gif')
						rano = getRandom('.webp')
						anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${trig}`
						exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							fs.unlinkSync(ranp)
							if (err) return reply('GAGAL UM')
							nobg = fs.readFileSync(rano)
							rmln.sendMessage(from, nobg, sticker, { quoted: Lan })
							fs.unlinkSync(rano)
						})
					} else {
						reply('Gunakan Foto Kakm')
					}
					break
			    case 'nightcore':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)			    
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					rmln.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'slow':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					rmln.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'tupai':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					rmln.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'blub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					rmln.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'gemuk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					rmln.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'ghost':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=3486" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						ghs = fs.readFileSync(ran)
					rmln.sendMessage(from, ghs, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
		       case 'bass':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)		   
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=64:width_type=o:width=2:g=56 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					rmln.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					   })
				       break
	             case 'toptt':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
					rmln.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						})
						await limitAdd(sender)
					    break
				case 'mutualmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const mtal = `「 *MUTUAL MENU* 」
${a}❏ ${prefix}mutual${a}
${a}❏ ${prefix}next${a}

「 *${botName}* 」`
					fakestatus(mtal)
					break
				case 'mutual':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break

				case 'next':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break
					
				case 'othermenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const other = `「 *OTHER MENU* 」
${a}❏ ${prefix}lacakip${a}
${a}❏ ${prefix}brainly${a}
${a}❏ ${prefix}wiki${a}
${a}❏ ${prefix}kbbi${a}
${a}❏ ${prefix}covid${a}
${a}❏ ${prefix}pinterest${a}
${a}❏ ${prefix}ytsearch${a}
${a}❏ ${prefix}jadwalsholat${a}
${a}❏ ${prefix}spamsms${a}

「 *${botName}* 」`
					fakestatus(other)
					break
					case 'spamsms':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args[0].startsWith('08')) return reply('Gunakan kode bahasa kak')
					await fetchJson(`https://api.xteam.xyz/spammer/pizzahut?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/olx?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/jagreward?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/danacita?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/akademi?no=${q}&APIKEY=${xteam}`)
					await fetchJson(`https://api.xteam.xyz/spammer/icq?no=${q}&APIKEY=${xteam}`)
					reply('Done')
                    break
              case 'ytsearch': 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				rmln.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari apaan bwang di yt?`) 
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/ytsearch?q=${body.slice(9)}&apikey=OnlyDevCity01`)
				njuk = '=================\n'
				for (let i of anu.results) {
					njuk += `*Channel :* ${i.channel}\n*Judul* : ${i.title}\n*Link* : ${i.urlyt}\n*Duration* : ${i.duration}\n*ID* : ${i.id}\n*Views* : ${i.views}\n=================\n`
				}
				fakestatus(njuk)
				break
				case 'lacakip':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length === 0) return reply(`Contoh :\n${prefix}lacakip 10.43.180.140`)
					iplu = `${body.slice(9)}`
					data = await fetchJson(`https://videfikri.com/api/iplookup/?ip=${iplu}`, { method: 'get' })
					lacaks = data.result
					lacak = `➸ Ip : ${lacaks.ip}
➸ Country : ${lacaks.country}
➸ Country code : ${lacaks.country_code}
➸ Region : ${lacaks.region}
➸ Region name : ${lacaks.region_name}
➸ City : ${lacaks.city}
➸ Latitude : ${lacaks.latitude}
➸ Longtitude : ${lacaks.longtitude}
➸ Timezone : ${lacaks.timezone}
➸ Isp : ${lacaks.isp}
➸ Org : ${lacaks.org}
➸ As : ${lacaks.as}`
					rmln.sendMessage(from, lacak, text, { quoted: Lan })
					break

				case 'brainly':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}brainly apa itu penis`)
					await limitAdd(sender)
					brien = body.slice(9)
					brainly(`${brien}`).then(res => {
						teks = '♡───────────♡\n'
						for (let Y of res.data) {
							teks += `\n*「 BRAINLY 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n♡───────────♡\n`
						}
						rmln.sendMessage(from, teks, text, { quoted: Lan, detectLinks: false })
						console.log(res)
					})
					break

				case 'wiki':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}wiki online`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://api.zeks.xyz/api/wiki?q=${bby}&apikey=apivinz`)
					reply('[WAIT] Sedang Searching...')
					wikiped = `「 WIKI PEDIA 」\n Jawaban : ${anu.result.result}`
					rmln.sendMessage(from, wikiped, text, { quoted: Lan })
					break

				case 'kbbi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}kbbi manusia`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://videfikri.com/api/kbbi/?query=${bby}`)
					reply('[WAIT] Sedang Searching...')
					kabebei = `「 *KBBI* 」\nJawaban : ${anu.result.hasil}`
					rmln.sendMessage(from, kabebei, text, { quoted: Lan })
					break
					
				case 'covid':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					anu = await fetchJson(`https://videfikri.com/api/covidindo/`)
					cvd = `「 *INGFO COVID* 」

Negara : ${anu.result.country}
Positif : ${anu.result.positif}
Sembuh : ${anu.result.sembuh}
Meninggal : ${anu.result.meninggal}`
					rmln.sendMessage(from, cvd, text, { quoted: Lan })
					break
					
				case 'pinterest':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					rmln.updatePresence(from, Presence.composing)
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, { method: 'get' })
					reply(nad.wait())
					n = JSON.parse(JSON.stringify(data));
					nimek = n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					rmln.sendMessage(from, pok, image, { quoted: Lan, caption: `*PINTEREST*` })
					break
					case 'jadwalsholat':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (!q) return reply(`Daerah Nya Mana?\nContoh :\n${prefix}jadwalsholat Tasikmalaya`)
					anu = await fetchJson(`https://api.zeks.xyz/api/jadwalsholat?apikey=apivinz&daerah=${q}`)
					jsholat `${anu.data.string}`
					rmln.sendMessage(from, jsholat, text, {quoted: Lan})
					break

				case 'storagemenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					const storage = `「 *STORAGE* 」
${a}❏ ${prefix}addstiker${a}
${a}❏ ${prefix}getstiker${a}
${a}❏ ${prefix}liststiker${a}
${a}❏ ${prefix}addvideo${a}
${a}❏ ${prefix}getvideo${a}
${a}❏ ${prefix}listvideo${a}
${a}❏ ${prefix}addvn${a}
${a}❏ ${prefix}getvn${a}
${a}❏ ${prefix}listvn${a}
${a}❏ ${prefix}addimage${a}
${a}❏ ${prefix}getimage${a}
${a}❏ ${prefix}listimage${a}
${a}❏ ${prefix}iri${a}
${a}❏ ${prefix}pale${a}
${a}❏ ${prefix}pota${a}
${a}❏ ${prefix}welot${a}
${a}❏ ${prefix}alay${a}
${a}❏ ${prefix}bernyanyi${a}
${a}❏ ${prefix}bwa${a}
${a}❏ ${prefix}ganteng${a}
${a}❏ ${prefix}gatal${a}
${a}❏ ${prefix}ladida${a}
${a}❏ ${prefix}rusher${a}
${a}❏ ${prefix}boong${a}
${a}❏ ${prefix}tengteng${a}
${a}❏ ${prefix}sound1${a}
${a}❏ ${prefix}sound2${a}
${a}❏ ${prefix}sound3${a}
${a}❏ ${prefix}sound4${a}
${a}❏ ${prefix}sound5${a}
${a}❏ ${prefix}sound6${a}
${a}❏ ${prefix}sound7${a}

「 *${botName}* 」`
					fakestatus(storage)
					break
				case 'addstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedSticker) return reply('Reply stickernya kak -_-')
					stiklan = body.slice(11)
					if (!stiklan) return reply('Namain Stickernya kak!')
					adds = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					lan = await rmln.downloadMediaMessage(adds)
					setimker.push(`${stiklan}`)
					fs.writeFileSync(`./media/sticker/${stiklan}.webp`, lan)
					fs.writeFileSync(`./media/stik.json`, JSON.stringify(setimker))
					await reply('Sticker Berhasil Ditambahkan Ke Database Bot')
					break

				case 'getstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Stiker Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}liststiker`)
					stikeram = body.slice(11)
					hasilya = fs.readFileSync(`./media/sticker/${stikeram}.webp`)
					rmln.sendMessage(from, hasilya, sticker, { quoted: Lan })
					break

				case 'liststiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					lis = '╭──「 *LIST STICKER* 」\n'
					for (let cieee of setimker) {
						lis += `◯ ${cieee}\n`
					}
					lis += `\n╰─────「 *${setimker.length}* 」`
					rmln.sendMessage(from, lis.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": setimker } })
					break

				case 'addvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedVideo) return reply('Reply Videonya Kak')
					adv = body.slice(10)
					if (!adv) return reply('Namain video nya kak')
					deo = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					dvi = await rmln.downloadMediaMessage(deo)
					vidioya.push(`${adv}`)
					fs.writeFileSync(`./media/video/${adv}.mp4`, dvi)
					fs.writeFileSync(`./media/video.json`, JSON.stringify(vidioya))
					rmln.sendMessage(from, `Video Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Video Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvideo`)
					getvi = body.slice(10)
					buffer = fs.readFileSync(`./media/video/${getvi}.mp4`)
					rmln.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: Lan })
					break

				case 'listvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					list = '╭──「 *LIST VIDEO* 」\n'
					for (let nihh of vidioya) {
						list += `◯ ${nihh}\n`
					}
					list += `\n╰─────「 *${vidioya.length}* 」`
					rmln.sendMessage(from, list.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": vidioya } })
					break

				case 'addvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedAudio) return reply('Reply Vn Nya Kak')
					advn = body.slice(7)
					if (!advn) return reply('Nama vn nya apa?')
					boij = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await rmln.downloadMediaMessage(boij)
					audioya.push(`${advn}`)
					fs.writeFileSync(`./media/audio/${advn}.mp3`, delb)
					fs.writeFileSync('./media/audio.json', JSON.stringify(audioya))
					rmln.sendMessage(from, `Vn Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Vn Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvn`)
					namastc = body.slice(7)
					buffer = fs.readFileSync(`./media/audio/${namastc}.mp3`)
					rmln.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
					break

				case 'listvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					lisv = '╭──「 *LIST VN* 」\n'
					for (let awokwkwk of audioya) {
						lisv += `◯ ${awokwkwk}\n`
					}
					lisv += `\n╰─────「 *${audioya.length}* 」`
					rmln.sendMessage(from, lisv.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": audioya } })
					break

				case 'addimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					sepimg = body.slice(10)
					if (!sepimg) return reply('Nama Gambar Nya Apa?')
					svimeg = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					imej = await rmln.downloadMediaMessage(svimeg)
					imegya.push(`${sepimg}`)
					fs.writeFileSync(`./media/image/${sepimg}.jpeg`, imej)
					fs.writeFileSync('./media/image.json', JSON.stringify(imegya))
					rmln.sendMessage(from, `Gambar Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					if (args.length < 1) return reply(`Nama Gambar Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listimage`)
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./media/image/${namastc}.jpeg`)
					rmln.sendMessage(from, buffer, image, { quoted: Lan })
					break

				case 'listimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					lisi = '╭──「 *LIST IMAGE* 」\n'
					for (let menghilih of imegya) {
						lisi += `◯ ${menghilih}\n`
					}
					lisi += `\n╰─────「 *${imegya.length}* 」`
					rmln.sendMessage(from, lisi.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": imegya } })
					break
				case 'iri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					irim = fs.readFileSync('./media/dj/iri.mp3');
					rmln.sendMessage(from, irim, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'pale':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					pal = fs.readFileSync('./media/dj/pale.mp3');
					rmln.sendMessage(from, pal, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'pota':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					pot = fs.readFileSync('./media/dj/pota.mp3');
					rmln.sendMessage(from, pot, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'welot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					wel = fs.readFileSync('./media/dj/welot.mp3');
					rmln.sendMessage(from, wel, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'alay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					ala = fs.readFileSync('./media/dj/alay.mp3');
					rmln.sendMessage(from, ala, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'bernyanyi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					ber = fs.readFileSync('./media/dj/bernyanyi.mp3');
					rmln.sendMessage(from, ber, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'bwa':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					bw = fs.readFileSync('./media/dj/bwa.mp3');
					rmln.sendMessage(from, bw, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'ganteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					gan = fs.readFileSync('./media/dj/ganteng.mp3');
					rmln.sendMessage(from, gan, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'gatal':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					ga = fs.readFileSync('./media/dj/gatal.mp3');
					rmln.sendMessage(from, ga, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'ladida':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					lada = fs.readFileSync('./media/dj/ladadida.mp3');
					rmln.sendMessage(from, lada, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'rusher':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					rus = fs.readFileSync('./media/dj/rusher.mp3');
					rmln.sendMessage(from, rus, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'boong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					boo = fs.readFileSync('./media/dj/tb.mp3');
					rmln.sendMessage(from, boo, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'tengteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					teng = fs.readFileSync('./media/dj/tengteng.mp3');
					rmln.sendMessage(from, teng, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound1':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					satu = fs.readFileSync('./media/music/sound1.mp3');
					rmln.sendMessage(from, satu, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					dua = fs.readFileSync('./media/music/sound2.mp3');
					rmln.sendMessage(from, dua, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					tiga = fs.readFileSync('./media/music/sound3.mp3');
					rmln.sendMessage(from, tiga, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					empat = fs.readFileSync('./media/music/sound4.mp3');
					rmln.sendMessage(from, empat, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound5':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					lima = fs.readFileSync('./media/music/sound5.mp3');
					rmln.sendMessage(from, lima, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound6':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					enam = fs.readFileSync('./media/music/sound6.mp3');
					rmln.sendMessage(from, enam, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound7':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
					tujuh = fs.readFileSync('./media/music/sound7.mp3');
					rmln.sendMessage(from, tujuh, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break
				case 'ownermenu':
					const bosnya = `「 *MENU BOSS* 」
${a}❏ ${prefix}addprem${a}
${a}❏ ${prefix}dellprem${a}
${a}❏ ${prefix}ban${a}
${a}❏ ${prefix}unban${a}
${a}❏ ${prefix}addbadword${a}
${a}❏ ${prefix}delbadword${a}
${a}❏ ${prefix}badwordlist${a}
${a}❏ ${prefix}bc${a}
${a}❏ ${prefix}setreply${a}
${a}❏ ${prefix}setprefix${a}
${a}❏ ${prefix}setbio${a}
${a}❏ ${prefix}setppbot${a}
${a}❏ ${prefix}setthumb${a}
${a}❏ ${prefix}clearall${a}
${a}❏ ${prefix}resetlimit${a}
${a}❏ ${prefix}event${a}
${a}❏ ${prefix}term${a}
${a}❏ ${prefix}return${a}
${a}❏ ${prefix}readall${a}

*ABOUT* 
${a}❏ ${prefix}runtime${a}
${a}❏ ${prefix}creator${a}
${a}❏ ${prefix}donasi${a}
${a}❏ ${prefix}iklan${a}
${a}❏ ${prefix}ping${a}
${a}❏ ${prefix}info${a}
${a}❏ cekprefix${a}

「 *${botName}* 」`
					fakestatus(bosnya)
					break				
                case 'setthumb':
                if (!isOwner) return reply(nad.ownerb())
                    if (!isQuotedImage) return reply('Reply imagenya blokk!')
                    const messimagethumb = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    const downiamgethumb = await rmln.downloadMediaMessage(messimagethumb)
                    fs.unlinkSync(`./src/image/thumbnail.jpeg`)
                    await sleep(2000)
                    fs.writeFileSync(`./src/image/thumbnail.jpeg`, downiamgethumb)
                    reply('Succes')
                    break
				case 'setppbot':
				rmln.updatePresence(from, Presence.composing)
				if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					if (!isOwner) return reply(nad.ownerb())
					enmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await rmln.downloadAndSaveMediaMessage(enmedia)
					await rmln.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya😗')
					break
                 case 'readall':
					if (!isOwner) return reply(nad.ownerb())
					var chats = await rmln.chats.all()
                    chats.map( async ({ jid }) => {
                          await rmln.chatRead(jid)
                    })
					rdl = `${a}Berhasil membaca ${chats.length} Chat !${a}`
					await rmln.sendMessage(from, rdl, MessageType.text, {quoted: Lan})
					console.log(chats.length)
					break
				case 'addprem':
					if (!isOwner) return reply(nad.ownerb())
					adprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					premium.push(adprem)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENAMBAHKAN USER PREMIUM`)
					break

				case 'dellprem':
					if (!isOwner) return reply(nad.ownerb())
					delprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					delp = ban.indexOf(delprem)
					premium.splice(delp, 1)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENGHAPUS USER PREMIUM`)
					break
					
                case 'premiumlist':
				rmln.updatePresence(from, Presence.composing) 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
				pemlist = '╭──「 *USER PREMIUM* 」\n'
				for (let premm of premium) {
					pemlist += `> @${premm.split('@')[0]}\n`
					}
					pemlist += `Total : ${premium.length}`
				rmln.sendMessage(from, pemlist.trim(), extendedText, {quoted: Lan, contextInfo: {"mentionedJid": premium}})
				break
				
				case 'ban':
					if (!isOwner) return reply(nad.ownerb())
					bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
					ban.push(bnnd)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${bnnd} telah dibanned!`)
					break

				case 'unban':
					if (!isOwner) return reply(nad.ownerb())
					ya = `${args[0].replace('@', '')}@s.whatsapp.net`
					unb = ban.indexOf(ya)
					ban.splice(unb, 1)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${ya} telah di unban!`)
					break
                   case 'addbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menambahkan Bad Word!')
                    break
                case 'delbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menghapus BAD WORD!')
                    break 
                case 'listbadword':
                case 'badwordlist':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➢ ${i.replace(bad)}\n`
                    }
                    await reply(lbw)
                    break
				case 'bc':
					rmln.updatePresence(from, Presence.composing)
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('.......')
					anu = await rmln.chats.all()
					if (isMedia && !Lan.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						buff = await rmln.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							rmln.sendMessage(_.jid, buff, image, { caption: `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}` })
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}`)
						}
						reply('*「 SUKSES BOSKU 」*')
					}
					break

				case 'setreply':
					if (!isOwner) return reply(nad.ownerb())
					rmln.updatePresence(from, Presence.composing)
					if (args.length < 1) return
					cr = body.slice(10)
					fakestatus(`reply berhasil di ubah menjadi : ${cr}`)
					await limitAdd(sender)
					break					
					
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(nad.ownerb())
					prefix = args[0]
					fakestatus(`*「 SUKSES 」* Prefix jadi ➸ : ${prefix}`)
					break

				case 'setbio':
					if (!isOwner) return reply(nad.ownerb())
					iyek = body.slice(8)
					rmln.setStatus(`${iyek}`)
					fakestatus(`Status BOT berhasil diperbarui menjadi :\n*[ ${iyek} ]*`)
					break
					
				case 'clearall':
					if (!isOwner) return reply(nad.ownerb())
					anu = await rmln.chats.all()
					rmln.setMaxListeners(25)
					for (let _ of anu) {
						rmln.deleteChat(_.jid)
					}
					fakestatus(nad.clears())
					break

				case 'resetlimit':
					if (!isOwner) return reply(nad.ownerb())
					var ngonsol = []
					rest = _limit.indexOf([])
					_limit.splice(rest)
					fs.writeFileSync('./database/limit.json', JSON.stringify(ngonsol))
					fakestatus(`LIMIT BERHASIL DI RESET BOS`)
					break

				case 'event':
					if (isBanned) return reply(nad.baned())
					if (!isGroup) return reply(nad.groupo())
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('Ekhemm >_<')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*FITUR EVENT SUDAH AKTIF BOS*')
						event.push(from)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MENGAKTIFKAN EVENT DI GROUP*')
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MEMATIKAN EVENT DI GROUP*')
					} else {
						reply('pilih 1/0')
					}
					break

				case 'term':
					if (!isOwner) return reply(nad.ownerB())
					const cmd = body.slice(6)
					var itsme = `0@s.whatsapp.net`
					var split = `EXECUTOR`
					const term = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					exec(cmd, (err, stdout) => {
						if (err) return rmln.sendMessage(from, `root@Ramlan:~ ${err}`, text, { quoted: Lan })
						if (stdout) {
							rmln.sendMessage(from, stdout, text, term)
						}
					})
					break

				case 'return':
					return rmln.sendMessage(from, JSON.stringify(eval(args.join(''))), text, { quoted: Lan })
					break
				default:
					if (budy == '@verify') {
						if (isBanned) return reply(nad.baned())
						if (isRegistered) return reply(nad.rediregis())
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppadd = await rmln.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppadd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `╭──「 *VERIFIKASI BERHASIL* 」
${a}➸ Nama : ${pushname}${a}
${a}➸ Nomor : wa.me/${sender.split("@")[0]}${a}
${a}➸ Waktu Verify : ${time}${a}
${a}➸ SN : ${serialUser}${a}
${a}➸ User Verified : ${_registered.length}${a}
╰─────「 *${botName}* 」`
							let peripi = await getBuffer(ppadd)
							rmln.sendMessage(from, peripi, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppadd = await rmln.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppadd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `╭──「 *VERIFIKASI BERHASIL* 」
${a}➸ Nama : ${pushname}${a}
${a}➸ Nomor : wa.me/${sender.split("@")[0]}${a}
${a}➸ Waktu Verify : ${time}${a}
${a}➸ SN : ${serialUser}${a}
${a}➸ User Verified : ${_registered.length}${a}
╰─────「 *${botName}* 」`
							let peripi = await getBuffer(ppadd)
							rmln.sendMessage(from, peripi, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
			}
			if (budy == 'cekprefix') {
				fakestatus(`*${botName} MENGGUNAKAN PREFIX :「 ${prefix} 」*`)
			}
			if (budy == 'p') {
				reply(`Ya, Ada Yang Bisa Saya Bantu? Kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'P') {
				reply(`Ya, Ada Yang Bisa Saya Bantu? Kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'bot') {
				reply(`Ya, Emang Gue BOT🗿\nApa? Gak Seneng?\nBewan Pantek😡`)
			}
			if (budy == 'Bot') {
				reply(`Ya, Emang Gue BOT🗿\nApa? Gak Seneng?\nBewan Pantek😡`)
			}
			if (budy == 'assalamualaikum') {
				reply(`Waalaikumsalam, Ada Yang Bisa Saya Bantu? kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'Assalamualaikum') {
				reply(`Waalaikumsalam, Ada Yang Bisa Saya Bantu? kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'Terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'makasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}

			if (isGroup && !isCmd && budy != undefined) {
				console.log(budy)
				//		reply(rmln.cmdnf(prefix, command))
			} else {
				console.log(color('[404]', 'red'), 'Unregistered Command from', color(sender.split('@')[0]))
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
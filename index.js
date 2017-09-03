var exec = require('child_process').exec
  , ncr = require('nodecr')
  , fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  , Telegraf = require('telegraf')
  , yargs = require('yargs')

require('dotenv').config()

class DCMonitor {

  constructor(directory, bot = true) {
    this.findText = 'Desconectado'
    this.inputDirectory = directory
    bot > -1 ? this.run() : this.initBot()
  }

  run() {
    this.copyScreenshot()
    this.processSource(() => this.processImage())
  }

  warnDC() {
    this.message('Personagem tomou DC')
    clearInterval(this.interval)
    if(!this.ctx) return
    this.ctx.replyWithPhoto({ source: 'source.jpg' })
    this.ctx.reply('Parando monitoramento... digite /start para voltar a monitorar.')
  }

  processImage() {
    ncr.process(__dirname + '/input.jpg', (err, text) => {
      if(err) return console.error(err)
      if(text.indexOf(this.findText) > -1) this.warnDC()
    }, 'eng', 6)
  }

  copyScreenshot() {
    const sourceImg = _.last(this.walkSync(this.inputDirectory))
    fs.createReadStream(sourceImg).pipe(fs.createWriteStream('source.jpg'));
  }

  processSource(callback) {
    exec('magick convert source.jpg -resize 600% -type Grayscale -gravity center -extent 50% input.jpg', callback);
  }

  message(message) {
    console.log(message)
    if(this.ctx) ctx.reply(message)
  }

  startMonitor() {
    clearInterval(this.interval)
    this.interval = setInterval(this.run, 1 * 60 * 1000)
    this.message('Monitorando screenshots')
  }

  stopMonitor() {
    clearInterval(this.interval)
    this.message('Parando monitoramento')
  }

  initBot() {
    this.app = new Telegraf(process.env.TELEGRAM_TOKEN)
    this.app.command('/start', (ctx) => {
      this.ctx = ctx
      this.startMonitor()
    })

    app.command('/stop', (ctx) => {
      this.ctx = ctx
      this.stopMonitor()
    })

    app.command('/state', function(ctx) {
      ctx.reply('Buscando ultima screenshot...')
      ctx.replyWithPhoto({
        source: 'source.jpg'
      })
    })

    app.startPolling()
  }

  walkSync(dir, filelist) {
    let files = fs.readdirSync(dir)

    filelist = filelist || [];
    files.forEach((file) => {
      if (fs.statSync(path.join(dir, file)).isDirectory())
        filelist = this.walkSync(path.join(dir, file), filelist)
      else
        filelist.push(path.join(dir, file))
    })
    return filelist
  }

}

const options = (yargs) => {
  yargs.option('dir', {
    describe: 'pasta onde as screenshots estão armazenadas',
    default: 'screenshots'
  })
}

yargs.command('run', 'processa a última screenshot', options, (argv) => {
  new DCMonitor(path.resolve(...argv.dir.split('/')), false)
}).help().argv

yargs.command('bot', 'liga o bot do telegram', options, (argv) => {
  new DCMonitor(path.resolve(...argv.dir.split('/')))
}).help().argv

const webtorrent = require('webtorrent')
const client  = new webtorrent()
const rl = require('readline')
const prompts = rl.createInterface(process.stdin,process.stdout)
console.log("Welcome to Torrent CLI\n######################\n")
setTimeout(() => {

  prompts.question("Enter the torrent URL / Magnet URL / Filesystem path to a torrent file / Info hash : \n",(magnetURI) => {

    client.add(magnetURI, { path: process.env.HOME + '/Downloads/TorrentCli' }, (torrent) => {
      torrent.on('done',() => {
        console.log('\nCheck Your Downloads folder for the file')
        client.destroy(() => {
          process.exit()
        })
      })
    })
    client.on('torrent',(torrent) => {
      console.log("\nDownload has started\n");
      setInterval(() => process.stdout.write('Download Speed: '+(client.downloadSpeed/1024).toFixed(2)+'KB/s'+'\tProgress: ' + (client.progress*100).toFixed(2) + '%' +'\r'),500)
    })

  })

},1000)

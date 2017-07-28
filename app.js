const {spawn} = require('child_process')

let findConflicts = spawn('grep', ["-l", "-r", "<<<", '.'])
let CONFLICTED_FILE_MESSAGE = "You have conflicts in"

findConflicts.stdout.on('data', ((data) => {
	let conflictedFiles = data.toString('utf8')
	getFilesWithConflicts(conflictedFiles)
}))

findConflicts.stderr.on('data', (data) => console.log("failed ", data.toString('utf8')))
findConflicts.on('exit', (data) => console.log("exited", data))


function getFilesWithConflicts(data) {
	var arr = []
	data = data.split("\n").filter(f => !f.includes("./app.js") && f.length > 1)
	data.forEach(d => console.log(`${CONFLICTED_FILE_MESSAGE} ${d}`))
}

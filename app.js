const {spawn} = require('child_process')
const {render} = require('prettyjson')
const path = require('path')

let findConflicts = spawn('grep', ["-l", "-r", "<<<", '.'])
let CONFLICTED_FILE_MESSAGE = "You have conflicts in"
let currentFileNamePath = __filename
let nodeMods = "node_modules"

findConflicts.stdout.on('data', ((data) => {
	let res = data.toString('utf8')
	let stdOutAsArr = res.split('\n')
	let conflictedFiles = removeExtraneousData(stdOutAsArr)
	if(conflictedFiles.length) {
		getFilesWithConflicts(conflictedFiles)
	}
	else {
		console.log("Woo hoo! No files with conflicts!")
	}
}))

findConflicts.stderr.on('data', (data) => console.log("failed ", data.toString('utf8')))

function removeExtraneousData(data) {
	let currentFileName = currentFileNamePath.split('/').pop()
	return data.filter((d => !d.includes(currentFileName) && !d.includes(nodeMods) && d.length > 1))
}

function getFilesWithConflicts(data) {
	let arr = []
	data = data.map(d => `${d}`)
	let obj = {}
	obj['conflicted_files'] = data
	console.log(render(obj), "\n Would you like to fix them?")
}

Frontend cmds

	react-native start
	npm run android

Backend cmds

	`. Scripts/activate to activate virtualenv`
	`python server.py`

ReplicaSet cmds

	`mongod --dbpath C:/mongodb/data --port 27017 --replSet "<nameOfReplSet>"` 
	Make sure mongo lock file isnt used by other processes.
	Open new terminal and run `mongo` to open shell.
	Run `rs.initiate()` to initiate ReplicaSet

SocketIO shit

	"socket.io-client": "2.0.4"
	const socket = io(BASE_URL, {
    		secure: true,
    		transports: ['websocket'],
  		});

Troubleshooting

	Execution failed for task ':app:compileDebugJavaWithJavac' react native
		Delete node_modules and run `npm install`
		Go to android folder and run `./gradlew clean`
		run `npm i jetifier` and `npx jetify`
		
	Google places api onPress
		Put `keyboardShouldPersistTaps="handled"` as prop in Parent ScrollView and View
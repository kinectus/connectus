# Classroom
##this is a placeholder
## Development
- __Web App__
  - Fork the repo.
  - Clone from your fork
  - npm install
  - bower install
- __Database__
  - The schema is in /server/config/schema.sql
  - [Install mysql](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html) (or brew install mysql) and start the mysql service with ``mysql.server start``
  - Import the schema with the command ``mysql -u root -p < server/config/schema.sql``
  - By default, all users initialized with the schema file have password 'test'.
- __Running the app__
  - Rename start.sh.example to start.sh and edit it to use the username and password for your mysql database.
  - Run ``chmod +x start.sh`` to make the start.sh file executable.
  - Run ``npm start`` to start the server with nodemon.
- __Documentation__
  - Documentation is built with [YUIDoc](http://yui.github.io/yuidoc/)
  - Install yuidoc with ``npm install -g yuidocjs``
  - Generate the documentation with ``yuidoc .``
  - The documentation will reside in the './out' folder and can be served as static html files.

## Testing
- run bower install to get mocha and chai
- run tests/index.html in the browser to run front-end tests
- write tests in tests/tests.js


## Directory Layout and Description of Files

- client/
  - app/
    - attendance
    - auth/ -- Login and Signup views
    - grades/ 
    - landing_page
    - services
  - lib/
  - style/
  index.html
- node_modules/
- server/
  - config/
    - config.js -- Configuration for variables that aren't handled by Environment Variables. Environment variables should be used first. If they don't exist, the app falls back to config.js.
    - db.js -- Configuration for knex/mysql/bookshelf. Uses environment variables defined from the start.sh which is run with the ``npm start`` command.
    - express.js -- Required from server/server.js and sets up our express app and imports our routes.
    - schema.sql -- Seed the initial database with ``mysql -u username -p password < server/config/schema.sql``.
  - controllers/
    - ... -- Each controller has its own model and route in their respective folders.
  - models/
    - ... -- Each model has its own controller and route in their respective folders.
  - routes/
    - ... -- Each route has its own controller and model in their respective folders.
  - views/
  server.js
- tests/
  - server
    - controllers
      - ... -- Each controller has its own test file.
    - models
      - ... -- Each model has its own test file.
    - routes
      - .. -- Each route has its own test file.
- .bowerrc -- Configure ``bower install`` to install to the client/lib directory.
- .dockerignore -- Ignore the node_modules folder when a docker file runs the ADD or COPY command. The primary reason for this is that we need to do a fresh npm install when building docker images. Some modules install differently between Mac and Linux (bcrypt specifically). It can be the source of bugs causing great frustration and fury.
- .gitignore -- Ignore config, tmp, and lib files.
- bower.json -- Installs to client/lib due to .bowerrc config.
- CONTRIBUTING.md
- docker_build.sh -- Builds docker images from scratch. This should be run the first time you start using docker to deploy/develop the app and again each time you want to push your local changes to the docker containers. Develop locally. Run docker_build.sh when you are ready to test your changes on docker and push to deployment.
- docker_start.sh -- Restarts the containers. Use this to start the containers again after a reboot or any time they stop/crash. No changes you make to your local filesystem will be reflected by running this command. To reflect changes, run docker_build.sh.
- mysql_build.sh -- docker_build.sh calls mysql_build.sh to build the MySQL image. You can build the MySQL image in isolation by running ``./mysql_build.sh``.
- mysql_Dockerfile -- Copies the schema file from server/config/schema.sql.
- msyql_start.sh -- This runs the mysql container as a background process with the -d flag. It maps port 3306 on the container to 3306 on the host machine. It gives the container a name of classroom-db. It uses the classroom/mysql:v1 image which was created with the docker_build.sh command.
- node_build.sh -- docker_build.sh calls node_build.sh to build the Node image. You can run ./node_build.sh to build the Node image in isolation by running ``./node_build.sh``.
- node_Dockerfile -- Copies the entire app directory to the /greenfield folder in the docker image. It also sets environment variables, the working directory, and installs nodemon, bower, and the required packages.
- node_start. - Runs the node container as a background process, forwards necessary ports, and links to the database container. No changes made to the local filesystem will show when you run this command. To reflect changes, re-run docker_build.sh.
- package.json
- PRESS-RELEASE.md
- README.md
- start.sh -- This is the script run by ``npm start``. It sources from config.js to import environment variables, then it runs ``nodemon server/server.js``.
- STYLE-GUIDE.md

## Deployment

### Docker

- If you're using Mac, you'll have to install boot2docker and docker: https://docs.docker.com/installation/mac/
- Download the [Boot2Docker-x.x.x.pkg](https://github.com/boot2docker/osx-installer/releases/tag/v1.7.0) file.
- Install Boot2Docker by double-clicking the package.
  - The installer places Boot2Docker and VirtualBox in your "Applications" folder.
  - The ``docker`` and ``boot2docker`` binaries will be in your ``/usr/local/bin`` directory.
- __To run docker from the command line__
  1. Create a new Boot2Docker virtual machine
    - ``boot2docker init``
  2. Start the ``boot2docker`` VM.
    - ``boot2docker start``
  3. Display the environment variables for the Docker client.
    - ``boot2docker shellinit``
  4. Set the environment variables in your shell with the following:
    - ``$(boot2docker shellinit)``
  5. Run the hello-world container to verify your setup.
    - ``docker run hello-world``

- Every time you open a new terminal window, you will need to set the environment variables of the new window by running the ``$(boot2docker shellinit)`` command.
- Scripts have been created to handle docker instance setup.
  - docker_build.sh (Necessary on the first build and every time you want to push changes you make locally to the docker containers).
  - docker_start.sh (Necessary every time you want to spin up a container of the image you made with docker_build).
  - node_build.sh (Used by docker_build.sh. Creates a new node docker image).
  - node_start.sh (Only necessary if you want to spin up the node container by itself for testing purposes or if it crashed).
  - mysql_build.sh (Used by docker_build.sh. Creates a new mysql docker image).
  - mysql_start.sh (Only necessary if you want to spin up the mysql container by itself for testing purposes or if it crashed).
- Once the containers are up and running, you should be able to access them at 192.168.59.103:3000 on your local machine.

## Problems you might run into during deployment/development
- [ERROR] InnoDB: Cannot allocate memory for the buffer pool
  - You might receive this error while trying to start the MySQL server on a VPS with limited resourcs (such as a $5 DigitalOcean droplet.
  - This is caused by not having enough memory. The solution https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-12-04
- MySQL ERROR! The server quit without updating PID file...
  - Seems to be fixed with a reboot.
  - This could be because of an edit to your my.cnf file that MySQL is unhappy with.
  - It could also be for some other reason I haven't been able to narrow down.
- ...dial unix /var/run/docker.sock: no such file or directory. Are you trying to connect to a TLS-enabled daemon without TLS?...
  - Started getting this after a boot2docker upgrade.
  - After running $(boot2docker shellinit) I got a different error: An error occurred trying to connect: Get https://192.168.59.103:2376/v1.19/containers/json: x509: certificate is valid for 127.0.0.1, 10.0.2.15, not 192.168.59.103
  - __*Fixed with*__ restarting the docker service inside boot2docker -- ``boot2docker ssh 'sudo /etc/init.d/docker restart'


## Team

Product Owners: Sean Connor, Dianna Faulk
Scrum Lords: Valerie Liang, Jammie Mountz
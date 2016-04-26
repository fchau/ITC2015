bits, please. 
===================
“bits, please” is a web application that provides automation which pulls and analyzes the latest images from Flickr and allows you to sort them by color.

Installation Instructions for application testing:

Install node.js
To install node.js on Windows, just go to https://nodejs.org/ official site and download Windows installer, then execute the installer.
Install MongoDB
Go to mongoDB official site https://www.mongodb.org/downloads to download zip file for Windows, and unzip the contents to a specific location. MongoDB will read data at \data\db by default, but mongoDB won’t create this folder for us, so we must create it individually, you can create this folder in Windows Explorer, or type the following command in terminal:
  C:\> mkdir \data
  C:\> mkdir \data\db
After creating \data\db, double click mongod.exe in your_mongodb_path\bin or type the following command in terminal to turn on mongoDB:
  C:\> cd your_mongodb_path\bin
  C:\> mongod
Then you can double click mongo.exe or type the following command in terminal to get into administrative shell：
  C:\> cd your_mongodb_path\bin
  C:\> mongo
Complete. You’ve successfully installed node.js and mongoDB on Windows!!!




Installing Github via GUI & Bash: 
Download and install the latest version of GitHub for Windows. This will automatically install Git and keep it up-to-date for you.
On your computer, open the Git Shell application.
Tell Git your name so your commits will be properly labeled. Type everything after the $ here:
$ git config --global user.name "YOUR NAME"
Tell Git the email address that will be associated with your Git commits. The email you specify should be the same one found in your email settings. To keep your email address hidden, see "Keeping your email address private".
$ git config --global user.email "YOUR EMAIL ADDRESS"
To run Git and be able to clone the repository. Navigate to the directory you wish to clone the repository. 
$ git init 
$ git clone https://github.com/jbirds/ITC2015.git
Complete!	

How to setup a node.js & MongoDB development environment on Mac OSX Lion
Please follow this link for Mac OSX installation procedures. 
http://dreamerslab.com/blog/how-to-setup-a-node-js-development-environment-on-mac-osx-lion/

How to setup a node.js development environment on Ubuntu 11.04
Please follow this link for Ubuntu installation procedures
http://dreamerslab.com/blog/how-to-setup-a-node-js-development-environment-on-ubuntu-11-04/




Running the Application Methods: 
Method 1 – Bin/StartMongo.sh
MongoDB runs as a standard program. You can start MongoDB from a command line by issuing the “mongod” command and specifying options. The following assume the directory containing the mongod process is in your system paths. The mongod process is the primary database process that runs on an individual server.
Method 2 – You may run mongod/sudo & node app.js after.
Issue the following command to start mongod:
Sudo service mongod start
Now verify that MongoDB has started successfully. Verify that the mongod process has started successfully by checking the contents of the log file at 
/var/log/mongod/mongod.log for a line reading
[initandlisten| waiting for connections on port <port>
Where <port> is the port configured in /etc/mongod.conf, for our project port 3000 is used.
Method 3 – Accessing the Web Application on the hosted website provided. (Preferred Method)
Please use the link described or click on this link to access the site: 
http://www.bitzplz.com:3000/

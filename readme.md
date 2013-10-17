Watchless
============================

Watch for a entire directory and only compile a specific file

Arguments:

  - '-o' the output folder
  - '-d' the directory to watch
  - '-f' the file to compile when there is a change in the directory
  - '-h' show the help

All the arguments are required (for now) later i will make some error checking

Example

    watchless -o cssfolder -d lessfolder -f lessfolder/file.less

Installation

    npm install watchless -g
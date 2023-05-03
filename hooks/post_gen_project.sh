#! /bin/bash

git init
git checkout -b main
git submodule add git@github.com:Skedulo/mex-custom-function-lib.git mex-custom-function-lib
git submodule init

cd mex-custom-function-lib; git checkout main; git pull --recurse-submodules; cd ..
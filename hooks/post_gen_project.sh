#! /bin/bash

# Initialize and update the submodule
git init
git checkout -b main

git submodule add git@github.com:Skedulo/mex-custom-function-lib.git mex-custom-function-lib
git submodule init
git submodule update

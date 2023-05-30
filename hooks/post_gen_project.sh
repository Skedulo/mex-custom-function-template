#! /bin/bash

# Change to the generated project directory
cd "{{ cookiecutter.project_name }}"

# Initialize and update the submodule
git init
git checkout -b main

git submodule add git@github.com:Skedulo/mex-custom-function-lib.git mex-custom-function-lib
git submodule init
git submodule update

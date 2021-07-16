#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

cp CNAME build

# 进入生成的文件夹
cd build

git init
git add -A
git commit -m 'Deploy HondryTravis/HondryTravis.github.io to github.com/HondryTravis/HondryTravis.github.io.git:master'


git push -f git@github.com:HondryTravis/HondryTravis.github.io master

cd -

#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

task :default => ["build:all"]

namespace :build do

  directory "build/styles"
  directory "build/js"

  desc "Clean the build directory"
  task :clean do
    sh "rm -rf build/*"
  end

  desc "Compile HAML and move to the build directory"
  task :haml => 'build' do
    sh "haml app/index.haml build/index.html"
  end

  desc "Compile SASS and move to build directory"
  task :sass => "build/styles" do
    sh "sass --update app/styles"
    sh "cp -r app/styles/*.css build/styles"
  end

  desc "Move js to build directory"
  task :js => "build/js" do
    sh "cp -r app/js/*.js build/js"
  end

  task :all => ["clean", "haml", "sass", "js"]

end
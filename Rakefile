#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require './lib/tasks/haml'


task :default => ["build:all"]

namespace :build do

  directory "build/styles"
  directory "build/fonts"
  directory "build/images"
  directory "build/js"

  desc "Clean the temporary artifacts"
  task :clean do
    sh "rm -rf build/*"
    sh "rm -rf src/**/*.css"
  end

  desc "Compile HAML and move to the build directory"
  task :haml => 'build' do
    HamlSupport::compile "src/index.haml", 'build'
  end

  desc "Compile SASS and move to build directory"
  task :sass => "build/styles" do
    sh "sass --update src/styles/sass:src/styles"
    sh "cp -r src/styles/*.css build/styles"
  end

  desc "Copy the fonts to the build directory"
  task :fonts => "build/fonts" do
    sh "cp -r src/fonts/* build/fonts"
  end

  desc "Copy the images to the build directory"
  task :images => "build/images" do
    sh "cp -r src/images/* build/images"
  end

  desc "Move js to build directory"
  task :js => "build/js" do
    sh "cp -r src/js/* build/js"
  end

  task :all => ["clean", "haml", "sass", "fonts", "images", "js"]

end

namespace :droid do

  desc "Clean assets for Android"
  task :clean do
    sh "rm -rf droid/assets/www/*"
  end

  desc "Builds and copies the assets"
  task :assets => ["clean", "build:all"] do
    sh "cp -r build/* droid/assets/www"
  end

  desc "Builds the complete Android application"
  task :build => ["assets"] do
    cd "droid" do
      sh "ant clean debug"
    end
  end

  desc "Deploy to a running device/emulator"
  task :deploy => ["build"] do
    sh "adb install -r droid/bin/*.apk"
  end
end
#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require './lib/tasks/haml'
# require 'xcodebuild'

# XcodeBuild::Tasks::BuildTask.new

task :default => ["build:all"]

namespace :build do

  directory "build/styles"
  directory "build/fonts"
  directory "build/images"
  directory "build/js"

  desc "Clean the temporary artifacts"
  task :clean do
    sh "rm -rf build/*"
  end

  desc "Compile HAML and move to the build directory"
  task :haml => 'build' do
    HamlSupport::compile "src/index.haml", 'build'
  end

  desc "Compile SASS and move to build directory"
  task :sass => "build/styles" do
    sh "sass --update src/styles:build/styles"
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

  task :all => ["clean", "haml", "sass", "fonts", "images", "js", "cordova"]

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

  desc "Move Cordova shim in place"
  task :cordova => ["assets"] do
    sh "cp -r cordova/android.js droid/assets/www/js/lib/cordova.js"
  end

  desc "Builds the complete Android application"
  task :build => ["cordova"] do
    cd "droid" do
      sh "ant clean debug"
    end
  end

  desc "Deploy to a running device/emulator"
  task :deploy => ["build"] do
    sh "adb install -r droid/bin/*.apk"
  end
end

namespace :ios do

  desc "Clean assets for iOS"
  task :clean do
    sh "rm -rf ios/www/*"
  end

  desc "Builds and copies the assets"
  task :assets => ["clean", "build:all"] do
    sh "cp -r build/* ios/www"
  end

  desc "Move Cordova shim in place"
  task :cordova => ["assets"] do
    sh "cp -r cordova/ios.js ios/www/js/lib/cordova.js"
  end

  desc "Builds the complete iOS application"
  task :build => ["cordova"] do
    cd "ios" do
      sh "echo 'build something'"
    end
  end

  desc "Deploy to a running device/emulator"
  task :deploy => ["build"] do
    sh "echo 'deploy something'"
  end
end
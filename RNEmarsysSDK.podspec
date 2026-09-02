require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'RNEmarsysSDK'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.swift_version  = '5.4'
  s.source         = { git: 'https://github.com/emartech/react-native-emarsys-sdk' }
  s.static_framework = true

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  install_modules_dependencies(s)
  
  s.dependency 'EmarsysSDK', '~> 3.10.0'

  s.source_files = 'ios/**/*.{h,m,mm,swift,hpp,cpp}'
  s.exclude_files = 'ios/test/**/*', 'ios/expo/**/*'
end

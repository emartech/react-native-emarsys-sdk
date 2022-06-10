require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
	s.name          = "RNEmarsysWrapper"
	s.version       = package['version']
	s.summary       = "RNEmarsysWrapper"
	s.description   = <<-DESC
						RNEmarsysWrapper
						DESC
	s.homepage      = "https://git@github.com/emartech/react-native-emarsys-sdk"
	s.license       = "MIT"
	# s.license     = { :type => "MIT", :file => "FILE_LICENSE" }
	s.author        = { "author" => "author@domain.cn" }
	s.platform      = :ios, "11.0"
	s.source = { :git => "https://git@github.com/emartech/react-native-emarsys-sdk.git",  :tag => "#{s.version}" }
	s.source_files  = "ios/*.{h,m}"
	s.requires_arc  = true
	s.dependency "React", ">= 0.67.3"
	s.dependency "EmarsysSDK", "~> 3.2.2"

end

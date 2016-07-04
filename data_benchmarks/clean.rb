require 'json'
require 'fileutils'
Dir.entries("./").each do |res|
  next if res.start_with? '.'
  next if not File.directory?(res)
  results = JSON.parse(File.read("#{res}/results.json"))
  results["results"].each do |_,data|
    data.each do |x|
       x["log_output"] = ""
    end
  end
  File.write("#{res}/results.json",  JSON.pretty_generate(results))
end
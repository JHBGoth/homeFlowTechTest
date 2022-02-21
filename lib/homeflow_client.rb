require 'httparty'

class HomeflowClient
  #def example_request(location)
    #p "#{base_url}/properties?api_key=#{api_key}&search[address]=#{location}"
    #HTTParty.get("#{base_url}/properties?api_key=#{api_key}&search[address]=#{location}")
  #end

  def example_request(location,channel)
    p "#{base_url}/properties?api_key=#{api_key}&search[address]=#{location}&search[channel]=#{channel}"
    HTTParty.get("#{base_url}/properties?api_key=#{api_key}&search[address]=#{location}&search[channel]=#{channel}")
  end

#Marcd
  #def propertySearch_request(channel)
    #p "#{base_url}/properties?api_key=#{api_key}&search[channel]=#{channel}"
    #HTTParty.get("#{base_url}/properties?api_key=#{api_key}&search[channel]=#{channel}")
  #end

  private

  def api_key
    config.fetch('api_key')
  end

  def base_url
    config.fetch('url')
  end

  def config
    @config ||= YAML.safe_load(
      File.read(File.expand_path(File.join(__dir__, '..', 'homeflow.yml')))
    )
  end
end

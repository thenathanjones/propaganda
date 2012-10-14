require 'haml'

module HamlSupport

  class Helper
    def content_for(named_chunk)
      chunk = @chunks[named_chunk]
      (chunk && chunk.call) || ""
    end

    def render_partial(partial_name, locals = {})
      partial_template = IO.read("src/templates/_#{partial_name}.haml")
      Haml::Engine.new(partial_template).render(self, locals)
    end
  end

  class << self
    def compile(haml_path, html_dir, options = {})
      puts "haml: #{haml_path} -> #{html_dir}"

      options[:helper] ||= Helper.new
      options[:template] = haml_path
      options[:out] = File.join(html_dir, File.basename(haml_path, '.*') + '.html')

      render_haml(options)
    end

    def render_haml(options)
      html_path = options[:out]
      template = IO.read(options[:template])

      html = Haml::Engine.new(template).render(options[:helper])

      html.gsub!("file:///android_asset/hybrid", "../assets") if options[:platform] == 'ios'
      IO.write(html_path, html)
    end
  end

end

